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
exports.HttpChannelNavUI = void 0;
class HttpChannelNavUI {
    constructor(web) {
        this.web = web;
    }
    startWait() {
        this.web.startWait();
    }
    endWait() {
        this.web.endWait();
    }
    showError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            this.web.endWait();
            /*
            if (error.name === 'SyntaxError') {
                error = {
                    name: error.name,
                    message: error.message,
                }
            }*/
            yield this.web.onError(error);
        });
    }
}
exports.HttpChannelNavUI = HttpChannelNavUI;
//# sourceMappingURL=httpChannelUI.js.map