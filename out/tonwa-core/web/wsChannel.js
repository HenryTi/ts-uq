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
exports.WSChannel = exports.WsBridge = exports.WsBase = exports.postWsToTop = exports.setSubAppWindow = void 0;
const tool_1 = require("../tool");
let subAppWindow; // Window;
function postWsToSubApp(msg) {
    if (subAppWindow === undefined)
        return;
    subAppWindow.postMessage({
        type: 'ws',
        msg: msg
    }, '*');
}
function setSubAppWindow(win) {
    subAppWindow = win;
}
exports.setSubAppWindow = setSubAppWindow;
function postWsToTop(msg) {
    tool_1.env.window.top.postMessage({
        type: 'ws',
        msg: msg
    }, '*');
}
exports.postWsToTop = postWsToTop;
class WsBase {
    //private messageHub = messageHub;
    constructor(web) {
        this.web = web;
    }
    /*
    wsBaseId:string;
    private handlerSeed = 1;
    private anyHandlers:{[id:number]:(msg:any)=>Promise<void>} = {};
    private msgHandlers:{[id:number]:{type:string, handler:(msg:any)=>Promise<void>}} = {};
    */
    /*
    onWsReceiveAny(handler:(msg:any)=>Promise<void>):number {
        let seed = this.handlerSeed++;
        this.anyHandlers[seed] = handler;
        return seed;
    }
    onWsReceive(type:string, handler:(msg:any)=>Promise<void>):number {
        let seed = this.handlerSeed++;
        this.msgHandlers[seed] = {type:type, handler: handler};
        return seed;
    }
    endWsReceive(handlerId:number) {
        delete this.anyHandlers[handlerId];
        delete this.msgHandlers[handlerId];
    }
    */
    receive(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            this.web.messageHub.dispatch(msg);
            /*
            let {$type} = msg;
            for (let i in this.anyHandlers) {
                await this.anyHandlers[i](msg);
            }
            for (let i in this.msgHandlers) {
                let {type, handler} = this.msgHandlers[i];
                if (type !== $type) continue;
                await handler(msg);
            }
            */
        });
    }
}
exports.WsBase = WsBase;
let wsBaseSeed = 1;
class WsBridge extends WsBase {
    constructor() {
        super(...arguments);
        this.wsBaseId = 'WsBridge seed ' + wsBaseSeed++;
    }
}
exports.WsBridge = WsBridge;
class WSChannel extends WsBase {
    constructor(web, wsHost, token) {
        super(web);
        this.wsBaseId = 'WSChannel seed ' + wsBaseSeed++;
        this.wsHost = wsHost;
        this.token = token;
    }
    static setCenterToken(token) {
        WSChannel.centerToken = token;
    }
    connect() {
        //this.wsHost = wsHost;
        //this.token = token || WSChannel.centerToken;
        if (this.ws !== undefined)
            return;
        let that = this;
        return new Promise((resolve, reject) => {
            let ws = new WebSocket(this.wsHost, this.token || WSChannel.centerToken);
            console.log('connect webSocket %s', this.wsHost);
            ws.onopen = (ev) => {
                console.log('webSocket connected %s', this.wsHost);
                that.ws = ws;
                resolve();
            };
            ws.onerror = (ev) => {
                reject('webSocket can\'t open!');
            };
            ws.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () { return yield that.wsMessage(msg); });
            ws.onclose = (ev) => {
                that.ws = undefined;
                console.log('webSocket closed!');
            };
        });
    }
    close() {
        if (this.ws !== undefined) {
            this.ws.close();
            this.ws = undefined;
        }
    }
    wsMessage(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('websocket message: %s', event.data);
                let msg = JSON.parse(event.data);
                postWsToSubApp(msg);
                yield this.receive(msg);
            }
            catch (err) {
                console.log('ws msg error: ', err);
            }
        });
    }
    sendWs(msg) {
        let netThis = this;
        this.connect().then(() => {
            netThis.ws.send(msg);
        });
    }
}
exports.WSChannel = WSChannel;
//# sourceMappingURL=wsChannel.js.map