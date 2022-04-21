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
exports.CUqApp = exports.CUqSub = exports.CUqBase = void 0;
//=== UqApp builder created on Sat Feb 26 2022 13:25:10 GMT-0500 (北美东部标准时间) ===//
const tonwa_react_1 = require("tonwa-react");
class CUqBase extends tonwa_react_1.CBase {
    internalStart(param, ...params) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.CUqBase = CUqBase;
class CUqSub extends tonwa_react_1.CSub {
}
exports.CUqSub = CUqSub;
class CUqApp extends tonwa_react_1.CAppBase {
    newC(type, ...param) {
        let c = new type(this);
        c.internalInit(...param);
        return c;
    }
}
exports.CUqApp = CUqApp;
//# sourceMappingURL=CBase.js.map