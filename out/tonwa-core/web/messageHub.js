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
exports.MessageHub = void 0;
class MessageHub {
    constructor(web) {
        this.handlerSeed = 1;
        this.anyHandlers = {};
        this.msgHandlers = {};
        this.web = web;
    }
    registerReceiveHandler(...args) {
        let seed = this.handlerSeed++;
        let args0 = args[0];
        let handler;
        switch (typeof args0) {
            case 'string':
                handler = args[1];
                this.msgHandlers[seed] = { type: args0, handler };
                break;
            case 'function':
                this.anyHandlers[seed] = args0;
                break;
        }
        return seed;
    }
    unregisterReceiveHandler(handlerId) {
        delete this.anyHandlers[handlerId];
        delete this.msgHandlers[handlerId];
    }
    dispatch(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            let { $type } = msg;
            for (let i in this.anyHandlers) {
                yield this.anyHandlers[i](msg);
            }
            for (let i in this.msgHandlers) {
                let { type, handler } = this.msgHandlers[i];
                if (type !== $type)
                    continue;
                yield handler(msg);
            }
        });
    }
}
exports.MessageHub = MessageHub;
//# sourceMappingURL=messageHub.js.map