"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsTicket = exports.JkProduct = exports.uqsSchema = void 0;
//=== UqApp builder created on Wed Mar 08 2023 19:43:53 GMT-0500 (Eastern Standard Time) ===//
const JkProduct = require("./JkProduct");
const JsTicket = require("./JsTicket");
exports.uqsSchema = {
    "百灵威系统工程部/product": JkProduct.uqSchema,
    "jksoft/jksoft-mini-jxc-trial": JsTicket.uqSchema,
};
exports.JkProduct = require("./JkProduct");
exports.JsTicket = require("./JsTicket");
//# sourceMappingURL=index.js.map