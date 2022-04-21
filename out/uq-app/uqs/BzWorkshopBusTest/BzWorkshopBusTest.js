"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assign = void 0;
function assign(uq, to, from) {
    let hasEntity = uq.hasEntity(to);
    if (hasEntity === false) {
        return;
    }
    Object.assign(uq[to], from);
}
exports.assign = assign;
//# sourceMappingURL=BzWorkshopBusTest.js.map