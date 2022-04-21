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
exports.IX = exports.UqIX = exports.IDX = exports.UqIDX = exports.ID = exports.UqID = void 0;
const entity_1 = require("./entity");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class UqID extends entity_1.Entity {
    get typeName() { return 'id'; }
    NO() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.uqApi.post('id-no', { ID: this.name });
            return ret;
        });
    }
    ;
    setKeys() {
        this.keys = this.schema.keys;
    }
    get isGlobal() {
        return this.schema.global;
    }
    getIdFromObj(value) { return value['id']; }
    valueFromString(str) {
        if (!str)
            return undefined;
        let ret = {};
        this.unpackRow(ret, this.fields, str, 0, 12);
        return ret;
    }
    cacheTuids(defer) { }
    loadValuesFromIds(divName, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.uq.QueryID({
                IDX: [this],
                id: ids
            });
            return ret;
        });
    }
    cacheTuidFieldValues(value) { }
    unpackTuidIds(values) { return; }
}
exports.UqID = UqID;
class ID extends UqID {
}
exports.ID = ID;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class UqIDX extends entity_1.Entity {
    get typeName() { return 'idx'; }
}
exports.UqIDX = UqIDX;
class IDX extends UqIDX {
}
exports.IDX = IDX;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class UqIX extends entity_1.Entity {
    get typeName() { return 'ix'; }
}
exports.UqIX = UqIX;
class IX extends UqIX {
}
exports.IX = IX;
/* eslint-enable no-unused-vars */
//# sourceMappingURL=ID.js.map