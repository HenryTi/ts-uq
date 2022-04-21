"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUI = void 0;
const BzWorkshopBusTest_1 = require("./BzWorkshopBusTest");
const Id1 = require("./id1.ui");
const Id2 = require("./id2.ui");
const Id3 = require("./id3.ui");
const Id4 = require("./id4.ui");
function setUI(uq) {
    (0, BzWorkshopBusTest_1.assign)(uq, 'Id1', Id1);
    (0, BzWorkshopBusTest_1.assign)(uq, 'Id2', Id2);
    (0, BzWorkshopBusTest_1.assign)(uq, 'Id3', Id3);
    (0, BzWorkshopBusTest_1.assign)(uq, 'Id4', Id4);
}
exports.setUI = setUI;
__exportStar(require("./BzWorkshopBusTest"), exports);
//# sourceMappingURL=index.js.map