"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UqBuildContext = void 0;
const TsTemplate_1 = require("./TsTemplate");
class UqBuildContext {
    constructor(web, uqTsSrcPath) {
        this.web = web;
        this.uqTsSrcPath = uqTsSrcPath;
        this.tsTemplate = new TsTemplate_1.TsTemplate(this);
    }
}
exports.UqBuildContext = UqBuildContext;
//# sourceMappingURL=UqBuildContext.js.map