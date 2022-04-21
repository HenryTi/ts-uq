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
exports.UserApi = exports.CenterAppApi = exports.CallCenterApi = exports.UqTokenApi = exports.CenterApiBase = exports.UnitxApi = exports.UqApi = void 0;
const httpChannel_1 = require("./httpChannel");
const httpChannelUI_1 = require("./httpChannelUI");
//import {getUqToken, logoutUqTokens, buildAppUq} from './appBridge';
const apiBase_1 = require("./apiBase");
//import { host } from './host';
const tool_1 = require("../tool");
class UqApi extends apiBase_1.ApiBase {
    constructor(web, basePath, uqOwner, uqName, showWaiting) {
        super(web, basePath, showWaiting);
        if (uqName) {
            this.uqOwner = uqOwner;
            this.uqName = uqName;
            this.uq = uqOwner + '/' + uqName;
        }
        this.showWaiting = showWaiting;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.web.appBridge.buildAppUq(this.uq, this.uqOwner, this.uqName);
        });
    }
    getHttpChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            let channels;
            let channelUI;
            if (this.showWaiting === true || this.showWaiting === undefined) {
                channels = this.web.channelUIs;
                channelUI = new httpChannelUI_1.HttpChannelNavUI(this.web);
            }
            else {
                channels = this.web.channelNoUIs;
            }
            let channel = channels[this.uq];
            if (channel !== undefined) {
                if (Array.isArray(channel) === false)
                    return channel;
            }
            else {
                channel = channels[this.uq] = [];
            }
            let arr = channel;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                arr.push({ resolve, reject });
                if (arr.length !== 1)
                    return;
                let uqToken = this.web.appBridge.getUqToken(this.uq); //, this.uqOwner, this.uqName);
                if (!uqToken) {
                    //debugger;
                    yield this.init();
                    uqToken = this.web.appBridge.getUqToken(this.uq);
                }
                let { url, token } = uqToken;
                this.token = token;
                channel = new httpChannel_1.UqHttpChannel(this.web, url, token, channelUI);
                channels[this.uq] = channel;
                for (let pv of arr) {
                    pv.resolve(channel);
                }
            }));
        });
    }
    /*async update():Promise<string> {
        return await this.get('update');
    }*/
    /*
    async __loadAccess():Promise<any> {
        let acc = this.access === undefined?
            '' :
            this.access.join('|');
        let ret = await this.get('access', {acc:acc});
        return ret;
    }
    */
    loadEntities() {
        return __awaiter(this, void 0, void 0, function* () {
            //return await localUqs.loadAccess(this);
            //let acc = this.access === undefined?
            //    '' :
            //    this.access.join('|');
            //let ret = await this.get('access', {acc:acc});
            let ret = yield this.get('entities');
            return ret;
        });
    }
    getAdmins() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.get('get-admins');
            return ret;
        });
    }
    setMeAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.get('set-me-admin');
        });
    }
    setAdmin(user, role, name, nick, icon, assigned) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('set-admin', { user, role, name, nick, icon, assigned });
        });
    }
    isAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.get('is-admin');
            return ret;
        });
    }
    getRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.get('get-roles');
            if (!ret)
                return null;
            let parts = ret.split('|');
            let s = [];
            for (let p of parts) {
                p = p.trim();
                if (!p)
                    continue;
                s.push(p);
            }
            if (s.length === 0)
                return null;
            return s;
        });
    }
    getAllRoleUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.get('get-all-role-users');
            return ret;
        });
    }
    setUserRoles(theUser, roles) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('set-user-roles', { theUser, roles });
        });
    }
    deleteUserRoles(theUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.get('delete-user-roles', { theUser });
        });
    }
    allSchemas() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('all-schemas');
        });
    }
    schema(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('schema/' + name);
        });
    }
    queueModify(start, page, entities) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('queue-modify', { start: start, page: page, entities: entities });
        });
    }
}
exports.UqApi = UqApi;
/*
let channels:{[unitId:number]: HttpChannel} = {};

export function logoutUnitxApis() {
    channels = {};
}
*/
class UnitxApi extends UqApi {
    constructor(web, unitId) {
        super(web, 'tv/', undefined, undefined, true);
        this.unitId = unitId;
    }
    getHttpChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            let channel = this.web.channels[this.unitId];
            if (channel !== undefined)
                return channel;
            return this.web.channels[this.unitId] = yield this.buildChannel();
        });
    }
    buildChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            let channelUI = new httpChannelUI_1.HttpChannelNavUI(this.web);
            let centerAppApi = new CenterAppApi(this.web, 'tv/', undefined);
            let ret = yield centerAppApi.unitxUq(this.unitId);
            let { token, db, url, urlTest } = ret;
            let realUrl = this.web.host.getUrlOrTest(db, url, urlTest);
            this.token = token;
            return new httpChannel_1.UqHttpChannel(this.web, realUrl, token, channelUI);
        });
    }
}
exports.UnitxApi = UnitxApi;
class CenterApiBase extends apiBase_1.ApiBase {
    getHttpChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret;
            if (this.showWaiting === true || this.showWaiting === undefined) {
                ret = this.web.getCenterChannelUI();
            }
            else {
                ret = this.web.getCenterChannel();
            }
            return ret;
        });
    }
}
exports.CenterApiBase = CenterApiBase;
const uqTokensName = 'uqTokens';
class UqTokenApi extends CenterApiBase {
    constructor() {
        super(...arguments);
        this.localMap = tool_1.env.localDb.map(uqTokensName);
    }
    static clearLocal() {
        tool_1.env.localDb.removeItem(uqTokensName);
    }
    uq(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let { uqOwner, uqName } = params;
            let un = uqOwner + '/' + uqName;
            let localCache = this.localMap.child(un);
            try {
                let uqToken = localCache.get();
                if (uqToken !== undefined) {
                    let { unit, user } = uqToken;
                    if (unit !== params.unit || user !== this.web.loginedUserId) {
                        localCache.remove();
                        uqToken = undefined;
                    }
                }
                let nowTick = Math.floor(Date.now() / 1000);
                if (uqToken !== undefined) {
                    let { tick, value } = uqToken;
                    if (value !== undefined && (nowTick - tick) < 24 * 3600) {
                        return Object.assign({}, value);
                    }
                }
                let uqParams = Object.assign({}, params);
                uqParams.testing = this.web.host.testing;
                let ret = yield this.get('uq-token', uqParams);
                if (ret === undefined) {
                    let { unit, uqOwner, uqName } = params;
                    let err = `center get app-uq(unit=${unit}, '${uqOwner}/${uqName}') - not exists or no unit-service`;
                    throw err;
                }
                uqToken = {
                    unit: params.unit,
                    user: this.web.loginedUserId,
                    tick: nowTick,
                    value: ret,
                };
                localCache.set(uqToken);
                return Object.assign({}, ret);
            }
            catch (err) {
                localCache.remove();
                throw err;
            }
        });
    }
}
exports.UqTokenApi = UqTokenApi;
class CallCenterApi extends CenterApiBase {
    directCall(url, method, body) {
        return this.call(url, method, body);
    }
}
exports.CallCenterApi = CallCenterApi;
//const appUqsName = 'appUqs';
class CenterAppApi extends CenterApiBase {
    appUqs(appOwner, appName) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.get('tie/app-uqs', { appOwner, appName });
            return ret;
        });
    }
    uqs(uqs) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('tie/pure-uqs', uqs);
        });
    }
    unitxUq(unit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('tie/unitx-uq', { unit: unit });
        });
    }
    changePassword(param) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('tie/change-password', param);
        });
    }
    userQuit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.get('tie/user-ask-quit', {});
        });
    }
}
exports.CenterAppApi = CenterAppApi;
;
class UserApi extends CenterApiBase {
    login(params) {
        return __awaiter(this, void 0, void 0, function* () {
            //(params as any).device = nav.local.device.get();
            let ret = yield this.post('user/login', params);
            switch (typeof ret) {
                default: return;
                case 'string': return (0, tool_1.decodeUserToken)(ret);
                case 'object':
                    let token = ret.token;
                    let user = (0, tool_1.decodeUserToken)(token);
                    let { nick, icon } = ret;
                    if (nick)
                        user.nick = nick;
                    if (icon)
                        user.icon = icon;
                    return user;
            }
            // !== undefined) return decodeToken(token);
        });
    }
    register(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('user/register', params);
        });
    }
    sendVerify(account, type, oem) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('user/set-verify', { account: account, type: type, oem: oem });
        });
    }
    checkVerify(account, verify) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('user/check-verify', { account: account, verify: verify });
        });
    }
    isExists(account) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('user/is-exists', { account: account });
        });
    }
    resetPassword(account, password, verify, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('user/reset-password', { account: account, password, verify, type });
        });
    }
    userSetProp(prop, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('tie/user-set-prop', { prop: prop, value: value });
        });
    }
    me() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('tie/me');
        });
    }
    user(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('tie/user', { id: id });
        });
    }
    fromKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('tie/user-from-key', { key });
        });
    }
}
exports.UserApi = UserApi;
//# sourceMappingURL=uqApi.js.map