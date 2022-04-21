"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalData = void 0;
const env_1 = require("./env");
class LocalData {
    constructor() {
        this.user = env_1.env.localDb.child('user');
        this.guest = env_1.env.localDb.child('guest');
        this.unit = env_1.env.localDb.child('unit');
    }
    readToMemory() {
        this._user = this.user.get();
        this._guest = this.guest.get();
        this._unit = this.unit.get();
    }
    saveToLocalStorage() {
        this.user.set(this._user);
        this.guest.set(this._guest);
        this.unit.set(this._unit);
    }
    logoutClear() {
        [
            this.user,
            this.unit,
        ].forEach(d => d.remove());
    }
}
exports.LocalData = LocalData;
//# sourceMappingURL=local.js.map