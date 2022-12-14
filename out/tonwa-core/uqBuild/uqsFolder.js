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
exports.buildUqsFolder = void 0;
const fs = require("fs");
const tools_1 = require("./tools");
const UqConfig_1 = require("./UqConfig");
const TsUQ_1 = require("./TsUQ");
function buildUqsFolder(buildContext, uqSchemas) {
    return __awaiter(this, void 0, void 0, function* () {
        let { uqTsSrcPath } = buildContext;
        let uqsFolder = uqTsSrcPath + '/uqs';
        let tsUqsIndexHeader = '';
        let tsUqsIndexContent;
        let tsUqsIndexSchema = `\n\nexport const uqsSchema = {`;
        let uqsIndexFile = `${uqTsSrcPath}/uqs/index.ts`;
        if (fs.existsSync(uqsIndexFile) === true) {
            let indexText = fs.readFileSync(uqsIndexFile, 'utf8');
            let p1 = indexText.indexOf('///###import AppUQs###///');
            if (p1 >= 0) {
                let pe = indexText.indexOf('\n', p1);
                tsUqsIndexHeader = indexText.substring(0, pe + 1);
                tsUqsIndexContent = `\n\nexport interface UQs extends AppUQs {`;
            }
            else {
                tsUqsIndexContent = `\n\nexport interface UQs {`;
            }
        }
        else {
            tsUqsIndexContent = `\n\nexport interface UQs {`;
        }
        tsUqsIndexHeader += UqConfig_1.tsHeader; // tsTemplate.tsHeader;
        let tsUqsIndexReExport = '\n';
        let len = uqSchemas.length;
        for (let i = 0; i < len; i++) {
            let { config, schema } = uqSchemas[i];
            let { fullName, devName: o1, uqName: n1 } = (0, tools_1.getNameFromConfig)(config);
            let uqAlias = o1 + n1;
            // let tsUqFolder = new TsUqFolder(buildContext, schema, fullName, uqsFolder, uqAlias, idOnly);
            // tsUqFolder.build();
            // let uqFolder = this.uqsFolder;
            // let tsUq = tsHeader + buildTsUq(schema, fullName);
            let { "id-only": idOnly } = config;
            if (i === 0) {
                // 第一个uq默认全interface
                if (idOnly === undefined)
                    idOnly = false;
            }
            else {
                // 之后的uq默认仅ID interface
                if (idOnly === undefined)
                    idOnly = true;
            }
            let tsUqBuilder = new TsUQ_1.TsUQ(buildContext, schema, fullName, idOnly);
            let tsUq = UqConfig_1.tsHeader + tsUqBuilder.build();
            // let tsUqBuilder = new TsUQ(this.buildContext, this.uqSchema, this.uqName);
            // tsUq += tsUqBuilder.build();
            (0, tools_1.overrideTsFile)(`${uqsFolder}/${uqAlias}.ts`, tsUq);
            tsUqsIndexHeader += `\nimport * as ${uqAlias} from './${uqAlias}';`;
            tsUqsIndexContent += `\n\t${uqAlias}: ${uqAlias}.UqExt;`;
            tsUqsIndexSchema += `\n\t"${fullName}": ${uqAlias}.uqSchema,`;
            tsUqsIndexReExport += `\nexport * as ${uqAlias} from './${uqAlias}';`;
        }
        if (!fs.existsSync(uqsFolder)) {
            fs.mkdirSync(uqsFolder);
        }
        (0, tools_1.overrideTsFile)(uqsIndexFile, tsUqsIndexHeader
            + tsUqsIndexContent + '\n}'
            + tsUqsIndexSchema + '\n}'
            + tsUqsIndexReExport + '\n');
        /*
            function buildTsUq(uqSchema: any, uqName: string): string {
                // let uqFolder = this.uqsFolder;
                let tsUqBuilder = new TsUQ(buildContext, uqSchema, uqName);
                return tsHeader + tsUqBuilder.build();
                // overrideTsFile(`${uqFolder}/${this.uqAlias}.ts`, tsUq);
            }
        */
    });
}
exports.buildUqsFolder = buildUqsFolder;
//# sourceMappingURL=uqsFolder.js.map