"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeGuestToken = exports.decodeUserToken = void 0;
const jwt_decode_1 = require("jwt-decode");
function decodeUserToken(token) {
    let ret = (0, jwt_decode_1.default)(token);
    let user = {
        id: ret.id,
        name: ret.name,
        guest: ret.guest,
        token: token,
    };
    return user;
}
exports.decodeUserToken = decodeUserToken;
function decodeGuestToken(token) {
    let ret = (0, jwt_decode_1.default)(token);
    let guest = {
        id: 0,
        guest: ret.guest,
        token: token,
    };
    return guest;
}
exports.decodeGuestToken = decodeGuestToken;
//# sourceMappingURL=user.js.map