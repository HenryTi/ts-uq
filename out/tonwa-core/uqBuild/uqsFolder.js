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
const TsUqFolder_1 = require("./TsUqFolder");
function buildUqsFolder(buildContext, uqSchemas) {
    return __awaiter(this, void 0, void 0, function* () {
        let { uqTsSrcPath, tsTemplate } = buildContext;
        let uqsFolder = uqTsSrcPath + '/uqs';
        /*
        let uqErrors = await uqsLoader.build();
        if (uqErrors) {
            throw new Error('error in uqsLoader.build()');
        }
        let { uqsMan } = uqsLoader;
        let uqMans = uqsMan.getUqMans();
    
        let promiseArr: Promise<void>[] = [];
        if (uqErrors) {
            console.error(uqErrors.join('\n'));
        }
    
        for (let uq of uqMans) {
            promiseArr.push(loadUqEntities(uq));
        }
        await Promise.all(promiseArr);
        */
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
        tsUqsIndexHeader += tsTemplate.tsHeader;
        let tsUqsIndexReExport = '\n';
        //let tsUqsUI = `\n\nexport function setUI(uqs:UQs) {`;
        for (let uqSchema of uqSchemas) {
            let { config, schema } = uqSchema;
            let { fullName, devName: o1, uqName: n1 } = (0, tools_1.getNameFromConfig)(config);
            let uqAlias = o1 + n1;
            let tsUqFolder = new TsUqFolder_1.TsUqFolder(buildContext, schema, fullName, uqsFolder, uqAlias);
            // buildTsUqFolder(uq, uqsFolder, uqAlias);
            tsUqFolder.build();
            tsUqsIndexHeader += `\nimport * as ${uqAlias} from './${uqAlias}';`;
            tsUqsIndexContent += `\n\t${uqAlias}: ${uqAlias}.UqExt;`;
            tsUqsIndexSchema += `\n\t"${fullName}": ${uqAlias}.uqSchema,`;
            tsUqsIndexReExport += `\nexport * as ${uqAlias} from './${uqAlias}';`;
            //tsUqsUI += `\n\t${uqAlias}.setUI(uqs.${uqAlias});`;
        }
        if (!fs.existsSync(uqsFolder)) {
            fs.mkdirSync(uqsFolder);
        }
        /*
        else {
            try {
                let files = fs.readdirSync(uqsFolder);
                for (const file of files) {
                    let fullPath = path.join(uqsFolder, file);
                    if (fs.lstatSync(fullPath).isFile() === true) {
                        fs.unlinkSync(fullPath);
                    }
                }
            }
            catch (err) {
                throw err;
            }
        }
        */
        (0, tools_1.overrideTsFile)(uqsIndexFile, tsUqsIndexHeader
            + tsUqsIndexContent + '\n}'
            + tsUqsIndexSchema + '\n}'
            + tsUqsIndexReExport + '\n');
    });
}
exports.buildUqsFolder = buildUqsFolder;
//# sourceMappingURL=uqsFolder.js.map