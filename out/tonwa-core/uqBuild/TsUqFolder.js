"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsUqFolder = void 0;
const fs = require("fs");
const tool_1 = require("../tool");
const TsUQ_1 = require("./TsUQ");
const buildFieldItem_1 = require("./buildFieldItem");
const tools_1 = require("./tools");
;
;
const fieldItemReplaceProps = ['label', 'placeholder', 'widget', 'type'];
class TsUqFolder {
    constructor(buildContext, uqSchema, uqName, uqsFolder, uqAlias) {
        this.buildContext = buildContext;
        this.uqSchema = uqSchema;
        this.uqName = uqName;
        this.uqsFolder = uqsFolder;
        this.uqAlias = uqAlias;
    }
    build() {
        let uqFolder = this.uqsFolder; // + '/' + this.uqAlias;
        //if (fs.existsSync(uqFolder) === false) {
        //	fs.mkdirSync(uqFolder);
        //}
        let tsUq = this.buildContext.tsTemplate.tsHeader;
        let tsUqBuilder = new TsUQ_1.TsUQ(this.buildContext, this.uqSchema, this.uqName);
        tsUq += tsUqBuilder.build();
        //overrideTsFile(`${uqFolder}/${this.uqAlias}.ts`, tsUq);
        (0, tools_1.overrideTsFile)(`${uqFolder}/${this.uqAlias}.ts`, tsUq);
        //this.saveTuidAndIDTsIndexAndRender(uqFolder);
    }
    saveTuidTsIndexAndRender(uqFolder, schema, builder) {
        let { name } = schema;
        let cName = (0, tool_1.capitalCase)(name);
        if (cName[0] === '$')
            return;
        builder.imports += `\nimport * as ${cName} from './${name}.ui';`;
        builder.sets += `\n	assign(uq, '${cName}', ${cName});`;
        let tsUI = `/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { uqStringify } from 'tonwa-uq';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemNumber, FieldItemString, FieldItemId, FieldItemInt, UI, TFunc } from 'tonwa-${this.buildContext.uiPlatform}';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
//import { Res, setRes } from "tonwa-core";
import { Tuid${cName} } from "./${this.uqAlias}";

/*
const resRaw: Res<any> = {
$zh: {
},
$en: {
}
};
const res: any = {};
setRes(res, resRaw);

export const t:TFunc = (str:string|${this.buildContext.element}): string|${this.buildContext.element} => {
return res[str as string] ?? str;
}

export function render(item: Tuid${cName}):${this.buildContext.element} {
return <>{uqStringify(item)}</>;
};
*/
`;
        let path = `${uqFolder}/${name}.ui.tsx`;
        (0, tools_1.saveTsFileIfNotExists)(path, tsUI);
    }
    saveIDTsIndexAndRender(uqFolder, schema, builder) {
        let { name } = schema;
        let cName = (0, tool_1.capitalCase)(name);
        if (cName[0] === '$')
            return;
        builder.imports += `\nimport * as ${cName} from './${name}.ui';`;
        builder.sets += `\n	assign(uq, '${cName}', ${cName});`;
        let tsUI = `// eslint-disable-next-line @typescript-eslint/no-unused-vars
//import { uqStringify } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Field } from 'tonwa-uq';
//import { FieldItem, FieldItemNumber, FieldItemString, FieldItemId, FieldItemInt, UI, TFunc } from 'tonwa-${this.buildContext.uiPlatform}';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Res, setRes } from "tonwa-core";
// import { ${cName} } from "./${this.uqAlias}";

const fieldArr: Field[] = [
];
/*
export const ui: UI = {
label: "${cName}",
fieldArr,
fields,
};

const resRaw: Res<any> = {
$zh: {
},
$en: {
}
};
const res: any = {};
setRes(res, resRaw);

export const t:TFunc = (str:string|${this.buildContext.element}): string|${this.buildContext.element} => {
return res[str as string] ?? str;
}

export function render(item: ${cName}):${this.buildContext.element} {
return <>{uqStringify(item)}</>;
};
*/
`;
        let path = `${uqFolder}/${name}.ui.tsx`;
        (0, tools_1.saveTsFileIfNotExists)(path, tsUI);
        let fields = this.buildFields(schema);
        let tsFieldArr = this.buildFieldArr(schema);
        this.replaceTsFileFields(path, fields);
        let tsImportFieldItemsBegin = 'import { FieldItem, ';
        let tsImportFieldItemsEnd = ` } from "tonwa-${this.buildContext.uiPlatform}";`;
        let tsImportFieldItems = 'FieldItemInt, FieldItemNumber, FieldItemString, FieldItemId';
        this.replaceTsFileString(path, {
            begin: tsImportFieldItemsBegin,
            end: tsImportFieldItemsEnd,
            content: tsImportFieldItemsBegin + tsImportFieldItems + tsImportFieldItemsEnd,
        });
        this.replaceTsFileString(path, { begin: '\nconst fieldArr: FieldItem[] = [\n', end: '\n];\n', content: tsFieldArr });
    }
    saveTuidAndIDTsIndexAndRender(uqFolder) {
        let builder = {
            imports: '',
            sets: '',
        };
        // let imports = '', sets = '';
        // let { idArr, idxArr, tuidArr } = this.uq;  // ixArr, 
        let coll = {};
        for (let i in this.uqSchema) {
            let schema = this.uqSchema[i];
            let { name, type } = schema;
            coll[name] = true;
            switch (type) {
                case 'id':
                case 'idx':
                    this.saveIDTsIndexAndRender(uqFolder, schema, builder);
                    break;
                case 'tuid':
                    this.saveTuidTsIndexAndRender(uqFolder, schema, builder);
                    break;
            }
        }
        let tsIndex = `import { UqExt as Uq, assign } from './${this.uqAlias}';${builder.imports}
	
export function setUI(uq: Uq) {${builder.sets}
}
export * from './${this.uqAlias}';
`;
        (0, tools_1.overrideTsFile)(`${uqFolder}/index.ts`, tsIndex);
        let files = fs.readdirSync(uqFolder);
        const suffix = '.ui.tsx';
        for (let file of files) {
            if (file.endsWith(suffix) === false)
                continue;
            let from = file.length - suffix.length;
            let fileEntityName = file.substring(0, from);
            let ok = coll[fileEntityName];
            if (ok === undefined || fileEntityName[0] === '$') {
                let unFile = `${uqFolder}/${file}`;
                fs.unlinkSync(unFile);
            }
        }
    }
    buildFields(schema) {
        switch (schema.type) {
            case 'id': return this.buildIDFields(schema);
            case 'idx': return this.buildIDXFields(schema);
            case 'ix': return this.buildIXFields(schema);
        }
    }
    ;
    buildIDFields(schema) {
        var _a;
        let ret = {};
        let { keys, fields } = schema;
        for (let f of fields) {
            let { name } = f;
            let isKey = ((_a = keys) === null || _a === void 0 ? void 0 : _a.findIndex(v => v.name === name)) >= 0;
            ret[name] = (0, buildFieldItem_1.buildFieldItem)(f, isKey);
        }
        return ret;
    }
    buildIDXFields(schema) {
        var _a;
        let ret = {};
        let { keys, fields } = schema;
        for (let f of fields) {
            let { name } = f;
            let isKey = ((_a = keys) === null || _a === void 0 ? void 0 : _a.findIndex(v => v.name === name)) >= 0;
            ret[name] = (0, buildFieldItem_1.buildFieldItem)(f, isKey);
        }
        return ret;
    }
    ;
    buildIXFields(schema) {
        var _a;
        let ret = {};
        let { keys, fields } = schema;
        for (let f of fields) {
            let { name } = f;
            let isKey = ((_a = keys) === null || _a === void 0 ? void 0 : _a.findIndex(v => v.name === name)) >= 0;
            ret[name] = (0, buildFieldItem_1.buildFieldItem)(f, isKey);
        }
        return ret;
    }
    ;
    buildFieldArr(schema) {
        let ts = '\nconst fieldArr: FieldItem[] = [\n\t';
        switch (schema.type) {
            case 'id':
                ts += this.buildIDFieldArr(schema);
                break;
            case 'idx':
                ts += this.buildIDXFieldArr(schema);
                break;
            case 'ix':
                ts += this.buildIXFieldArr(schema);
                break;
        }
        return ts += '\n];\n';
    }
    buildIDFieldArr(schema) {
        let ts = '';
        for (let f of schema.fields) {
            let { name } = f;
            if (name === 'id')
                continue;
            ts += `fields.${name}, `;
        }
        return ts;
    }
    buildIDXFieldArr(schema) {
        let ts = '';
        for (let f of schema.fields) {
            let { name } = f;
            if (name === 'id')
                continue;
            ts += `fields.${name}, `;
        }
        return ts;
    }
    buildIXFieldArr(schema) {
        let ts = '';
        for (let f of schema.fields) {
            let { name } = f;
            if (name === 'ix')
                continue;
            if (name === 'id')
                continue;
            ts += `fields.${name}, `;
        }
        return ts;
    }
    replaceTsFileFields(path, fields) {
        let text = fs.readFileSync(path).toString();
        let startStr = '\n/*--fields--*/';
        let endStr = '\n/*==fields==*/\n';
        let start = text.indexOf(startStr);
        if (start > 0) {
            let end = text.indexOf(endStr, start + startStr.length);
            if (end > 0) {
                let lBrace = text.indexOf('{', start + startStr.length);
                let rBrace = text.lastIndexOf('}', end);
                let oldText = text.substring(lBrace, rBrace + 1);
                let fieldsText = this.buildFieldsFromOldText(fields, oldText);
                text = text.substring(0, start)
                    + startStr + '\nconst fields = {'
                    + fieldsText
                    + '\n};'
                    + text.substring(end);
                fs.writeFileSync(path, text);
            }
        }
    }
    buildFieldsFromOldText(fields, oldText) {
        let ret = '';
        for (let i in fields) {
            let field = fields[i];
            this.setFieldOldProp(field, oldText);
            ret += this.buildFieldText(field);
        }
        return ret;
    }
    setFieldOldProp(field, text) {
        let fieldStart = field.name + ':';
        let start = text.indexOf('\t' + fieldStart);
        if (start < 0)
            start = text.indexOf('\n' + fieldStart);
        if (start < 0)
            start = text.indexOf(' ' + fieldStart);
        if (start < 0)
            return;
        ++start;
        let end = text.indexOf('}', start + fieldStart.length);
        if (end < 0)
            return;
        let fieldText = text.substring(start + fieldStart.length, end + 1);
        /* eslint no-eval: 0 */
        let obj = eval('(' + fieldText + ')');
        fieldItemReplaceProps.forEach(v => {
            let prop = obj[v];
            if (!prop)
                return;
            if (v === 'type')
                return; // 这个是由新的schema决定的
            field[v] = prop;
        });
    }
    buildFieldText(field) {
        let { $FieldItemType } = field;
        delete field.$FieldItemType;
        let ret = '\n\t' + field.name + ': ';
        let json = JSON.stringify(field, null, '\t\t');
        json = json.replace('}', '\t}');
        ret += json;
        return ret + ' as ' + $FieldItemType + ',';
    }
    replaceTsFileString(path, sec) {
        let text = fs.readFileSync(path).toString();
        let { begin, end, content } = sec;
        let b = text.indexOf(begin);
        if (b < 0)
            return;
        let e = text.indexOf(end, b + begin.length - 1);
        if (e < 0)
            return;
        text = text.substring(0, b) + content + text.substr(e + end.length);
        fs.writeFileSync(path, text);
    }
}
exports.TsUqFolder = TsUqFolder;
//# sourceMappingURL=TsUqFolder.js.map