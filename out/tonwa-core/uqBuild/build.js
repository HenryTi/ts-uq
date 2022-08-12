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
exports.build = void 0;
const fs = require("fs");
const tool_1 = require("../tool");
const tools_1 = require("./tools");
const uqsFolder_1 = require("./uqsFolder");
const httpChannel_1 = require("../web/httpChannel");
function build(uqConfigs, buildContext) {
    return __awaiter(this, void 0, void 0, function* () {
        //let buildContext = new BuildContext(uqSrcPath);
        // 只从test 数据库构建uq ts
        tool_1.env.testing = true;
        tool_1.env.buildingUq = true;
        if (tools_1.lastBuildTime > 0) {
            console.log(tools_1.red, 'quit !');
            return;
        }
        let { tsTemplate } = buildContext;
        let { uqTsSrcPath } = buildContext;
        if (!fs.existsSync(uqTsSrcPath)) {
            fs.mkdirSync(uqTsSrcPath);
        }
        //let tsIndex = tsTemplate.tsIndex;
        //overrideTsFile(`${buildContext.uqTsSrcPath}/index.ts`, tsIndex);
        /*
        let tsCApp = tsTemplate.tsCApp;
        saveSrcTsFileIfNotExists(buildContext, 'CApp', 'ts', tsCApp);
        let tsCBase = tsTemplate.tsCBase;
        saveTsFile(buildContext, 'CBase', tsCBase);
        let tsVMain = tsTemplate.tsVMain;
        saveSrcTsFileIfNotExists(buildContext, 'VMain', 'tsx', tsVMain);
        let tsApp = tsTemplate.tsApp;
        saveSrcTsFileIfNotExists(buildContext, 'App', 'tsx', tsApp);
        */
        //saveTsFile(buildContext, 'uqs', '');
        //fs.unlinkSync(uqTsSrcPath + '/uqs.ts');
        //let centerHost = 'https://dev.tonwa.ca';
        let centerHost = 'https://tv.jkchemical.com';
        let centerToken = undefined;
        let centerChannel = new httpChannel_1.CenterHttpChannel(buildContext.web, centerHost, centerToken);
        let promises = uqConfigs.map(v => centerChannel.get('/tonwa/open/uq-schema', { uqOwner: v.dev.name, uqName: v.name }));
        let retUqSchemas = yield Promise.all(promises);
        let uqSchemas = [];
        for (let i = 0; i < retUqSchemas.length; i++) {
            uqSchemas.push({
                config: uqConfigs[i],
                schema: JSON.parse(retUqSchemas[i]),
            });
        }
        yield (0, uqsFolder_1.buildUqsFolder)(buildContext, uqSchemas);
    });
}
exports.build = build;
;
//# sourceMappingURL=build.js.map