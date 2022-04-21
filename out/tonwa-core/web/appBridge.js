"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppBridge = void 0;
//import {nav} from '../components';
const uqApi_1 = require("./uqApi");
const tool_1 = require("../tool");
const tool_2 = require("../tool");
class AppBridge {
    constructor(web) {
        this.uqTokens = {};
        this.uqTokenActions = {};
        this.brideCenterApis = {};
        this.web = web;
    }
    addMessageListener() {
        let { window } = tool_2.envGlobal;
        window.addEventListener('message', (evt) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            var message = evt.data;
            if (!message)
                return;
            //let {nav} = this.web.tonwa;
            switch (message.type) {
                case 'sub-frame-started':
                    this.subFrameStarted(evt);
                    break;
                case 'ws':
                    //wsBridge.receive(message.msg);
                    yield this.web.onWsReceive(message.msg);
                    break;
                case 'init-sub-win':
                    yield this.initSubWin(message);
                    break;
                case 'pop-app':
                    window.console.log('///\\\\\\ pop-app');
                    this.web.navBack();
                    break;
                case 'center-api':
                    yield this.callCenterApiFromMessage(evt.source, message);
                    break;
                case 'center-api-return':
                    this.bridgeCenterApiReturn(message);
                    break;
                case 'app-api':
                    let ret = yield this.onReceiveAppApiMessage(message.hash, message.apiName);
                    (evt.source).postMessage({
                        type: 'app-api-return',
                        apiName: message.apiName,
                        db: ret.db,
                        url: ret.url,
                        token: ret.token
                    }, "*");
                    break;
                case 'app-api-return':
                    console.log("app-api-return: %s", JSON.stringify(message));
                    console.log('await onAppApiReturn(message);');
                    yield this.onAppApiReturn(message);
                    break;
                default:
                    if (((_a = message.source) === null || _a === void 0 ? void 0 : _a.startsWith('react-devtools')) === true)
                        break;
                    window.console.log('message: %s', JSON.stringify(message));
                    break;
            }
        }));
    }
    logoutUqTokens() {
        for (let i in this.uqTokens) {
            this.uqTokens[i] = undefined;
        }
        uqApi_1.UqTokenApi.clearLocal();
    }
    isBridged() {
        let { window } = tool_2.envGlobal;
        if (!window)
            return false;
        return window.self !== window.parent;
    }
    subFrameStarted(evt) {
        var message = evt.data;
        let subWin = evt.source; // as Window;
        //setSubAppWindow(subWin);
        this.hideFrameBack(message.hash);
        let msg = Object.assign({}, this.web.user);
        msg.type = 'init-sub-win';
        subWin.postMessage(msg, '*');
    }
    hideFrameBack(hash) {
        let { document } = tool_2.envGlobal;
        let el = document.getElementById(hash);
        if (el !== undefined)
            el.hidden = true;
    }
    initSubWin(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('initSubWin: set nav.user', message);
            let user = this.web.user = message; // message.user;
            this.web.setCenterToken(user.id, user.token);
            yield this.web.showAppView();
        });
    }
    onReceiveAppApiMessage(hash, apiName) {
        return __awaiter(this, void 0, void 0, function* () {
            let { unit } = tool_1.env;
            if (!unit) {
                console.error('no unit defined in unit.json or in index.html, or not logined in', unit);
            }
            let parts = apiName.split('/');
            let param = { unit: unit, uqOwner: parts[0], uqName: parts[1], appOwner: parts[2], appName: parts[3] };
            console.log('uqTokenApi.uq onReceiveAppApiMessage', param);
            let ret = yield this.web.uqTokenApi.uq(param);
            let { db, url, token } = ret;
            return { name: apiName, db: db, url: url, token: token };
        });
    }
    onAppApiReturn(message) {
        return __awaiter(this, void 0, void 0, function* () {
            let { apiName, db, url, urlTest, token } = message;
            let action = this.uqTokenActions[apiName];
            if (action === undefined) {
                throw new Error('error app api return');
                //return;
            }
            let realUrl = this.web.host.getUrlOrTest(db, url, urlTest);
            console.log('onAppApiReturn(message:any): url=' + url + ', real=' + realUrl);
            //action.url = realUrl;
            //action.token = token;
            action.resolve({
                name: apiName,
                db: db,
                url: realUrl,
                token: token,
            });
        });
    }
    buildAppUq(uq, uqOwner, uqName) {
        return __awaiter(this, void 0, void 0, function* () {
            let { window } = tool_2.envGlobal;
            if (!this.isBridged()) {
                //let unit = getUnit();
                let { unit } = tool_1.env;
                let uqToken = yield this.web.uqTokenApi.uq({ unit, uqOwner, uqName });
                if (uqToken.token === undefined)
                    uqToken.token = this.web.centerToken;
                let { db, url, urlTest } = uqToken;
                let realUrl = this.web.host.getUrlOrTest(db, url, urlTest);
                console.log('realUrl: %s', realUrl);
                uqToken.url = realUrl;
                this.uqTokens[uq] = uqToken;
                return uqToken;
            }
            //console.log("**** before buildAppUq ****", appInFrame);
            let bp = this.uqTokenActions[uq];
            if (bp !== undefined)
                return;
            return new Promise((resolve, reject) => {
                this.uqTokenActions[uq] = {
                    resolve: (at) => __awaiter(this, void 0, void 0, function* () {
                        let { db, url, token } = yield at;
                        this.uqTokens[uq] = {
                            name: uq,
                            db: db,
                            url: url,
                            token: token,
                        };
                        this.uqTokenActions[uq] = undefined;
                        //console.log("**** after buildAppUq ****", appInFrame);
                        resolve();
                    }),
                    reject: reject,
                };
                (window.opener || window.parent).postMessage({
                    type: 'app-api',
                    apiName: uq,
                    //hash: appInFrame.hash,
                }, "*");
            });
        });
    }
    getUqToken(uq) {
        let uts = this.uqTokens;
        return uts[uq];
    }
    bridgeCenterApi(url, method, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let { window } = tool_2.envGlobal;
            console.log('bridgeCenterApi: url=%s, method=%s', url, method);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let callId;
                for (;;) {
                    callId = (0, tool_1.uid)();
                    let bca = this.brideCenterApis[callId];
                    if (bca === undefined) {
                        this.brideCenterApis[callId] = {
                            id: callId,
                            resolve: resolve,
                            reject: reject,
                        };
                        break;
                    }
                }
                (window.opener || window.parent).postMessage({
                    type: 'center-api',
                    callId: callId,
                    url: url,
                    method: method,
                    body: body
                }, '*');
            }));
        });
    }
    callCenterApiFromMessage(from /*Window*/, message) {
        return __awaiter(this, void 0, void 0, function* () {
            let { callId, url, method, body } = message;
            let result = yield this.web.callCenterapi.directCall(url, method, body);
            from.postMessage({
                type: 'center-api-return',
                callId: callId,
                result: result,
            }, '*');
        });
    }
    bridgeCenterApiReturn(message) {
        let { callId, result } = message;
        let bca = this.brideCenterApis[callId];
        if (bca === undefined)
            return;
        this.brideCenterApis[callId] = undefined;
        bca.resolve(result);
    }
}
exports.AppBridge = AppBridge;
//# sourceMappingURL=appBridge.js.map