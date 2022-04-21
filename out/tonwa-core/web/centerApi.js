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
exports.CenterApi = void 0;
const uqApi_1 = require("./uqApi");
class CenterApi extends uqApi_1.CenterApiBase {
    userAppUnits(app) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('tie/user-app-units', { app: app });
        });
    }
    userFromKey(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('tie/user-from-key', { key: userName });
        });
    }
    userFromId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('user/user-name-nick-icon-from-id', { userId: userId });
        });
    }
    userFromName(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('tie/user-from-key', { key: userName });
        });
    }
    usersFromEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('tie/users-from-email', { email });
        });
    }
    userFromMobile(mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('tie/users-from-mobile', { mobile });
        });
    }
}
exports.CenterApi = CenterApi;
//# sourceMappingURL=centerApi.js.map