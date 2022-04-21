"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pending = exports.UqPending = void 0;
const query_1 = require("./query");
class UqPending extends query_1.UqQuery {
    constructor() {
        super(...arguments);
        this.queryApiName = 'pending';
    }
    get typeName() { return 'pending'; }
}
exports.UqPending = UqPending;
class Pending extends UqPending {
}
exports.Pending = Pending;
//# sourceMappingURL=pending.js.map