"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assign = exports.Role = exports.Gender = exports.EnumOpType = void 0;
var EnumOpType;
(function (EnumOpType) {
    EnumOpType[EnumOpType["a"] = 1] = "a";
    EnumOpType[EnumOpType["b"] = 2] = "b";
})(EnumOpType = exports.EnumOpType || (exports.EnumOpType = {}));
var Gender;
(function (Gender) {
    Gender[Gender["female"] = 0] = "female";
    Gender[Gender["male"] = 1] = "male";
})(Gender = exports.Gender || (exports.Gender = {}));
var Role;
(function (Role) {
    Role[Role["staff"] = 10] = "staff";
    Role[Role["counselor"] = 11] = "counselor";
    Role[Role["volunteer"] = 12] = "volunteer";
    Role[Role["board"] = 13] = "board";
    Role[Role["client"] = 20] = "client";
    Role[Role["donator"] = 30] = "donator";
})(Role = exports.Role || (exports.Role = {}));
function assign(uq, to, from) {
    let hasEntity = uq.hasEntity(to);
    if (hasEntity === false) {
        return;
    }
    Object.assign(uq[to], from);
}
exports.assign = assign;
//# sourceMappingURL=BzWorkshop.js.map