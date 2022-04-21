"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUI = exports.BzWorkshopBusTest = exports.BzWorkshop = void 0;
//=== UqApp builder created on Fri Feb 25 2022 23:50:26 GMT-0500 (北美东部标准时间) ===//
const BzWorkshop = require("./BzWorkshop");
const BzWorkshopBusTest = require("./BzWorkshopBusTest");
exports.BzWorkshop = require("./BzWorkshop");
exports.BzWorkshopBusTest = require("./BzWorkshopBusTest");
function setUI(uqs) {
    BzWorkshop.setUI(uqs.BzWorkshop);
    BzWorkshopBusTest.setUI(uqs.BzWorkshopBusTest);
}
exports.setUI = setUI;
//# sourceMappingURL=index.js.map