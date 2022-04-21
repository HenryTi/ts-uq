"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Caller = void 0;
class Caller {
    constructor(params, $$user = undefined, waiting) {
        this.method = 'POST';
        this._params = params;
        this.$$user = $$user;
        this.waiting = waiting;
    }
    get params() { return this._params; }
    buildParams() { return this.params; }
    get headers() { return undefined; }
}
exports.Caller = Caller;
//# sourceMappingURL=caller.js.map