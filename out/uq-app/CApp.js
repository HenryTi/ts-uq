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
exports.CApp = void 0;
//=== UqApp builder created on Sat Feb 26 2022 13:25:10 GMT-0500 (北美东部标准时间) ===//
const CBase_1 = require("./CBase");
const res_1 = require("./res");
const VMain_1 = require("./VMain");
const uqs_1 = require("./uqs");
const gaps = [10, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 15, 15, 15, 30, 30, 60];
class CApp extends CBase_1.CUqApp {
    constructor() {
        super(...arguments);
        this.tick = 0;
        this.gapIndex = 0;
        this.callTick = () => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.user)
                    return;
                ++this.tick;
                if (this.tick < gaps[this.gapIndex])
                    return;
                this.tick = 0;
                if (this.gapIndex < gaps.length - 1)
                    ++this.gapIndex;
                let ret = yield this.uqs.BzHelloTonwa.$poked.query(undefined, false);
                let v = ret.ret[0];
                if (v === undefined)
                    return;
                if (!v.poke)
                    return;
                this.gapIndex = 1;
                // 数据服务器提醒客户端刷新，下面代码重新调入的数据
                //this.cHome.refresh();
            }
            catch (_a) {
            }
        });
    }
    internalStart(isUserLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setRes(res_1.res);
            (0, uqs_1.setUI)(this.uqs);
            this.openVPage(VMain_1.VMain, undefined, this.dispose);
        });
    }
    onDispose() {
        clearInterval(this.timer);
        this.timer = undefined;
    }
}
exports.CApp = CApp;
//# sourceMappingURL=CApp.js.map