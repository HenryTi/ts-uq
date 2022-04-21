"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = exports.UqHistory = void 0;
const query_1 = require("./query");
class UqHistory extends query_1.UqQuery {
    constructor() {
        super(...arguments);
        this.queryApiName = 'history';
    }
    get typeName() { return 'history'; }
}
exports.UqHistory = UqHistory;
class History extends UqHistory {
}
exports.History = History;
//# sourceMappingURL=history.js.map