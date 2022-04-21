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
exports.ActionSubmitCaller = exports.Action = exports.UqAction = void 0;
const entity_1 = require("./entity");
const caller_1 = require("./caller");
class UqAction extends entity_1.Entity {
    get typeName() { return 'action'; }
    submit(data, $$user = undefined, waiting = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let caller = new ActionSubmitCaller(this, data, $$user, waiting);
            let ret = yield caller.request();
            return ret;
        });
    }
    submitReturns(data, $$user = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new SubmitReturnsCaller(this, data, $$user).request();
        });
    }
    submitConvert(data, $$user = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new SubmitConvertCaller(this, data, $$user).request();
        });
    }
}
exports.UqAction = UqAction;
class Action extends UqAction {
}
exports.Action = Action;
class ActionSubmitCaller extends caller_1.ActionCaller {
    get path() { return 'action/' + this.entity.name; }
    buildParams() {
        return {
            $$user: this.$$user,
            data: this.entity.pack(this.params)
        };
    }
}
exports.ActionSubmitCaller = ActionSubmitCaller;
class SubmitReturnsCaller extends ActionSubmitCaller {
    get path() { return 'action/' + this.entity.name + '/returns'; }
    xresult(res) {
        let { returns } = this.entity;
        let len = returns.length;
        let ret = {};
        for (let i = 0; i < len; i++) {
            let retSchema = returns[i];
            ret[retSchema.name] = res[i];
        }
        return ret;
    }
}
class SubmitConvertCaller extends ActionSubmitCaller {
    get path() { return 'action-convert/' + this.entity.name; }
    buildParams() {
        return {
            $$user: this.$$user,
            data: this.params
        };
    }
}
//# sourceMappingURL=action.js.map