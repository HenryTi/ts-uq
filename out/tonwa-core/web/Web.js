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
exports.Web = void 0;
/* eslint-disable */
const appBridge_1 = require("./appBridge");
const centerApi_1 = require("./centerApi");
const uqApi_1 = require("./uqApi");
const httpChannel_1 = require("./httpChannel");
const guestApi_1 = require("./guestApi");
const messageHub_1 = require("./messageHub");
const httpChannelUI_1 = require("./httpChannelUI");
const host_1 = require("./host");
class Web {
    // -- end -------------------
    constructor() {
        this.centerToken = undefined;
        this.loginedUserId = 0;
        this.channelUIs = {};
        this.channelNoUIs = {};
        this.channels = {};
        this.centerApi = new centerApi_1.CenterApi(this, 'tv/', undefined);
        this.appBridge = new appBridge_1.AppBridge(this);
        this.userApi = new uqApi_1.UserApi(this, 'tv/', undefined);
        this.uqTokenApi = new uqApi_1.UqTokenApi(this, 'tv/tie/', undefined);
        this.callCenterapi = new uqApi_1.CallCenterApi(this, '', undefined);
        let unitId = 0;
        this.unitxApi = new uqApi_1.UnitxApi(this, unitId);
        this.guestApi = new guestApi_1.GuestApi(this, 'tv/guest/', undefined);
        this.messageHub = new messageHub_1.MessageHub(this);
        //this.wsBridge = new WsBridge(this);
        this.host = new host_1.Host();
    }
    // ----- 从nav搬移过来的内容
    // ===== nav搬移内容结束
    // abstract navInit(): Promise<void>
    start(testing) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.host.start(this, testing);
        });
    }
    reload() {
        throw new Error('Method not implemented.');
    }
    showReloadPage(msg) {
        throw new Error('Method not implemented.');
    }
    // 这个应该会去掉
    navBack() {
        throw new Error('Method not implemented.');
    }
    // 这个是收到websocket消息的处理
    onWsReceive(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
    showAppView() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
    logout() {
        throw new Error('Method not implemented.');
    }
    onError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            throw error;
        });
    }
    endWait() {
        //throw new Error('Method not implemented.');
    }
    startWait() {
        //throw new Error('Method not implemented.');
    }
    logoutApis() {
        this.channelUIs = {};
        this.channelNoUIs = {};
        this.channels = {};
        this.appBridge.logoutUqTokens();
    }
    setCenterUrl(url) {
        console.log('setCenterUrl %s', url);
        this.centerHost = url;
        this.centerChannel = undefined;
        this.centerChannelUI = undefined;
    }
    setCenterToken(userId, t) {
        this.loginedUserId = userId;
        this.centerToken = t;
        this.centerChannel = undefined;
        this.centerChannelUI = undefined;
    }
    getCenterChannelUI() {
        if (this.centerChannelUI !== undefined)
            return this.centerChannelUI;
        return this.centerChannelUI = new httpChannel_1.CenterHttpChannel(this, this.centerHost, this.centerToken, new httpChannelUI_1.HttpChannelNavUI(this));
    }
    getCenterChannel() {
        if (this.centerChannel !== undefined)
            return this.centerChannel;
        return this.centerChannel = new httpChannel_1.CenterHttpChannel(this, this.centerHost, this.centerToken);
    }
    setNetToken(userId, token) {
        this.setCenterToken(userId, token);
        //WSChannel.setCenterToken(token);
    }
    clearNetToken() {
        this.setCenterToken(0, undefined);
        //WSChannel.setCenterToken(undefined);
    }
    resUrlFromHost(host) {
        return (0, host_1.resUrlFromHost)(host);
    }
}
exports.Web = Web;
//# sourceMappingURL=Web.js.map