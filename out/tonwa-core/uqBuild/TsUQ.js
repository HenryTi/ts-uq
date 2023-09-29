"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsUQ = void 0;
const tool_1 = require("../tool");
const tools_1 = require("./tools");
const fieldTypeMap = {
    "char": "string",
    "text": "string",
    "id": "number",
    "textid": "string",
    "int": "number",
    "bigint": "number",
    "smallint": "number",
    "tinyint": "number",
    "dec": "number",
    "float": "number",
    "double": "number",
};
const sysFields = ['id', 'main', 'row', 'no', '$create', '$update', '$owner'];
class TsUQ {
    constructor(buildContext, uqSchema, uqAlias, idOnly) {
        this.buildContext = buildContext;
        this.uqSchema = uqSchema;
        this.uqAlias = uqAlias;
        this.idOnly = idOnly;
    }
    build() {
        let tsImport = `
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq`;
        let ts = `


//===============================;
//======= UQ ${this.uqAlias} ========;
//===============================';

export interface ID {
    id?: number;
}

export interface IDX {
    id: number;
}

export interface IX {
    ix: number;
    xi: number;
}
`;
        let entityArr = [];
        let newUqSchema = {};
        let biz;
        for (let i in this.uqSchema) {
            let schema = this.uqSchema[i];
            if (i === 'role')
                continue;
            let { name, type } = schema;
            let entity;
            if (name !== undefined) {
                if (name.indexOf('$') > 0)
                    continue;
                if (this.idOnly === true) {
                    // 仅留下idOnly表
                    if (idOnlyEntities[type] !== true)
                        continue;
                }
                let EntityType = typeEntities[type];
                if (!EntityType)
                    continue;
                entity = new EntityType(this.uqSchema, schema, this.buildContext);
            }
            else {
                entity = biz = new Biz(this.uqSchema, schema, this.buildContext);
            }
            entityArr.push(entity);
            newUqSchema[i] = schema;
        }
        ts += '\nexport enum EnumID {\n';
        for (let entity of entityArr) {
            let enm = entity.buildEnum();
            if (enm === undefined)
                continue;
            ts += '\t' + enm + ',\n';
        }
        ts += '}\n';
        for (let entity of entityArr) {
            let intf = entity.interface();
            if (intf === undefined)
                continue;
            ts += '\n' + intf + '\n';
            let enumConsts = entity.buildConsts();
            if (enumConsts !== undefined) {
                ts += '\n' + enumConsts + '\n';
            }
            let intfInActs = entity.interfaceInActs();
            if (intfInActs === undefined)
                continue;
            ts += '\n' + intfInActs + '\n';
        }
        ts += `\nexport interface ParamActs {`;
        for (let entity of entityArr) {
            let ai = entity.actsInterface();
            if (ai === undefined)
                continue;
            ts += `\n\t${ai}[];`;
        }
        ts += '\n}\n';
        ts += `

export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;
	SQL: Uq;
    Role: { [key: string]: string[] };
`;
        let typeCaptions = {};
        for (let entity of entityArr) {
            let code = entity.code();
            if (code === undefined)
                continue;
            ts += '\n' + code;
            let typeCaption = entity.typeCaption();
            if (typeCaption !== undefined) {
                typeCaptions['Uq' + typeCaption] = true;
            }
        }
        ts += '\n}\n';
        for (let i in typeCaptions) {
            tsImport += ', ' + i;
        }
        tsImport += ` } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars`;
        let schema = JSON.stringify(newUqSchema, undefined, 4);
        schema = schema.replace(/\"\: \[\]/g, '": [] as any');
        let ret = tsImport + ts + '\n\nexport const uqSchema=' + schema;
        let bizSchema = biz.schema;
        let atoms = [];
        let sheets = [];
        let details = [];
        let titles = [];
        for (let i in bizSchema) {
            let schema = bizSchema[i];
            let { name, type } = schema;
            switch (type) {
                case 'atom':
                    atoms.push(schema);
                    break;
                case 'sheet':
                    sheets.push(schema);
                    break;
                case 'detail':
                    details.push(schema);
                    break;
                case 'title':
                    titles.push(schema);
                    break;
            }
        }
        function buildEnum(type, arr) {
            if (arr.length === 0)
                return;
            ret += `\n\nexport enum Enum${type} {`;
            for (let item of arr) {
                let { name, jName } = item;
                ret += `\n\t${jName !== null && jName !== void 0 ? jName : name} = '${name}',`;
            }
            ret += '\n}';
        }
        buildEnum('Atom', atoms);
        buildEnum('Sheet', sheets);
        buildEnum('Detail', details);
        buildEnum('Title', titles);
        return ret;
    }
}
exports.TsUQ = TsUQ;
class Entity {
    constructor(uqSchema, schema, buildContext) {
        this.uqSchema = uqSchema;
        this.schema = schema;
        this.buildContext = buildContext;
        this.entityName = schema.name;
    }
    interface() { return ''; }
    buildConsts() { return undefined; }
    interfaceInActs() { return undefined; }
    code() { return undefined; }
    actsInterface() { return undefined; }
    typeCaption() { return undefined; }
    buildFields(fields, isKey, indent = 1) {
        if (!fields)
            return '';
        let ts = '';
        for (let f of fields) {
            ts += this.buildField(f, isKey, indent);
        }
        return ts;
    }
    isOptionalField(field) {
        return false;
    }
    isOmitted(field) {
        return false;
    }
    buildField(field, isKey, indent = 1) {
        if (this.isOmitted(field) === true)
            return '';
        let { name, type } = field;
        let s = fieldTypeMap[type];
        if (!s)
            s = 'any';
        let q = isKey === false && this.isOptionalField(field) === true ? '?' : '';
        return `\n${'\t'.repeat(indent)}${name}${q}: ${s};`;
    }
    buildArrs(arrFields) {
        if (!arrFields)
            return '';
        let ts = '\n';
        for (let af of arrFields) {
            ts += `\t${(0, tool_1.camelCase)(af.name)}: {`;
            ts += this.buildFields(af.fields, false, 2);
            ts += '\n\t}[];\n';
        }
        return ts;
    }
    buildReturns(returns) {
        if (!returns)
            return;
        let { name } = this.schema;
        name = (0, tool_1.capitalCase)(name);
        let ts = '';
        for (let ret of returns) {
            let { name: retName, fields } = ret;
            retName = (0, tool_1.capitalCase)(retName);
            ts += `export interface Return${name}${retName} {`;
            ts += this.buildFields(ret.fields, false);
            ts += '\n}\n';
        }
        ts += `export interface Result${name} {\n`;
        for (let ret of returns) {
            let retName = (0, tool_1.capitalCase)(ret.name);
            ts += `\t${ret.name}: Return${name}${retName}[];\n`;
        }
        ts += '}';
        return ts;
    }
    buildEnum() {
        return undefined;
    }
    buildInternalEnum() {
        let { values } = this.schema;
        if (values === undefined)
            return undefined;
        let ts = `export enum ${(0, tool_1.capitalCase)(this.entityName)} {`;
        let first = true;
        for (let i in values) {
            if (first === false) {
                ts += ',';
            }
            else {
                first = false;
            }
            let v = values[i];
            ts += '\n\t' + i + ' = ';
            if (typeof v === 'string') {
                ts += '"' + v + '"';
            }
            else {
                ts += v;
            }
        }
        return ts += '\n}';
    }
    buildInternalConst() {
        let { values } = this.schema;
        if (values === undefined)
            return undefined;
        let $ = values['$'];
        if ($) {
            let v;
            switch (typeof $) {
                case 'number':
                    v = `${$}`;
                    break;
                case 'string':
                    v = `'${$}'`;
                    break;
            }
            return `export const ${(0, tool_1.capitalCase)(this.entityName)} = ${v}`;
        }
        let ts = `export const ${(0, tool_1.capitalCase)(this.entityName)} = {`;
        let first = true;
        for (let i in values) {
            if (first === false) {
                ts += ',';
            }
            else {
                first = false;
            }
            let v = values[i];
            ts += '\n\t' + i + ': ';
            if (typeof v === 'string') {
                ts += '"' + v + '"';
            }
            else {
                ts += v;
            }
        }
        return ts += '\n}';
    }
}
class Biz extends Entity {
}
class IDBase extends Entity {
}
class ID extends IDBase {
    typeCaption() { return 'ID'; }
    interfaceInternal() {
        let { fields, keys: schemaKeys, values } = this.schema;
        let keys = [], others = [];
        for (let f of fields) {
            let { name } = f;
            if (name === 'id')
                continue;
            if (schemaKeys.find(v => v.name === name))
                keys.push(f);
            else
                others.push(f);
        }
        let inActs = this.isInActs === true ? 'InActs' : '';
        // if (this.entityName.toLowerCase() === 'ExportItemHistory'.toLowerCase()) debugger;
        let ts = `export interface ${(0, tool_1.capitalCase)(this.entityName)}${inActs} extends ID {`;
        if (this.isInActs === true) {
            ts += '\n\tID?: UqID<any>;';
        }
        ts += this.buildFields(keys, true);
        ts += this.buildFields(others, false);
        ts += '\n}';
        return ts;
    }
    buildField(field, isKey, indent = 1) {
        var _a;
        if (this.isOmitted(field) === true)
            return '';
        let { name, type } = field;
        let s = fieldTypeMap[type];
        if (this.isInActs === true && type === 'id') {
            let { ID } = field;
            if (ID) {
                let entityName = (_a = this.uqSchema[ID]) === null || _a === void 0 ? void 0 : _a.name;
                if (entityName) {
                    //s = `number | ${entityName}InActs`;
                    s = `number | ID`;
                }
                else {
                    s = 'number | ID';
                }
            }
            else {
                s = 'number | ID';
            }
        }
        if (!s)
            s = 'any';
        let q = isKey === false && this.isOptionalField(field) === true ? '?' : '';
        return `\n${'\t'.repeat(indent)}${name}${q}: ${s};`;
    }
    interface() {
        this.isInActs = false;
        return this.interfaceInternal();
    }
    buildConsts() {
        return this.buildInternalConst();
    }
    interfaceInActs() {
        this.isInActs = true;
        return this.interfaceInternal();
    }
    code() {
        return `\t${(0, tools_1.entityName)(this.entityName)}: UqID<any>;`;
    }
    actsInterface() {
        return `${(0, tool_1.camelCase)(this.entityName)}?: ${(0, tool_1.capitalCase)(this.entityName)}InActs`;
    }
    buildEnum() {
        return `${this.entityName} = '${this.entityName.toLowerCase()}'`;
    }
    isOptionalField(field) {
        return sysFields.indexOf(field.name) >= 0;
    }
    isOmitted(field) {
        switch (field.name) {
            default: return false;
            case 'id': return true;
        }
    }
}
class IDX extends IDBase {
    typeCaption() { return 'IDX'; }
    interface() {
        let { fields, exFields } = this.schema;
        let ts = `export interface ${(0, tool_1.capitalCase)(this.entityName)} extends IDX {`;
        let indent = 1;
        for (let field of fields) {
            let { name, type } = field;
            let s = fieldTypeMap[type];
            if (!s)
                s = 'any';
            ts += `\n${'\t'.repeat(indent)}${name}`;
            if (name !== 'id')
                ts += '?';
            ts += `: ${s};`;
        }
        ts += `\n\t$act?: number;`;
        let hasTrack = false;
        let hasMemo = false;
        if (exFields) {
            for (let exField of exFields) {
                let { track, memo } = exField;
                if (track === true)
                    hasTrack = true;
                if (memo === true)
                    hasMemo = true;
            }
        }
        if (hasTrack === true) {
            ts += `\n\t$track?: number;`;
        }
        if (hasMemo === true) {
            ts += `\n\t$memo?: string;`;
        }
        ts += '\n}';
        ts += `export interface ActParam${(0, tool_1.capitalCase)(this.entityName)} {`;
        indent = 1;
        for (let field of fields) {
            let { name, type } = field;
            let s = fieldTypeMap[type];
            if (!s)
                s = 'any';
            ts += `\n${'\t'.repeat(indent)}${name}`;
            if (name !== 'id')
                ts += '?';
            ts += `: ${s}|IDXValue;`;
        }
        ts += `\n\t$act?: number;`;
        if (hasTrack === true) {
            ts += `\n\t$track?: number;`;
        }
        if (hasMemo === true) {
            ts += `\n\t$memo?: string;`;
        }
        ts += '\n}';
        return ts;
    }
    code() {
        return `\t${(0, tools_1.entityName)(this.entityName)}: UqIDX<any>;`;
    }
    actsInterface() {
        return `${(0, tool_1.camelCase)(this.entityName)}?: ActParam${(0, tool_1.capitalCase)(this.entityName)}`;
    }
    isOmitted(field) {
        switch (field.name) {
            default: return false;
            case 'id': return true;
        }
    }
}
class IX extends IDBase {
    typeCaption() { return 'IX'; }
    interface() {
        let { fields } = this.schema;
        let ts = `export interface ${(0, tool_1.capitalCase)(this.entityName)} extends IX {`;
        ts += this.buildFields(fields, false);
        ts += '\n}';
        return ts;
    }
    code() {
        let ts = `\t${(0, tools_1.entityName)(this.entityName)}: UqIX<any>;`;
        return ts;
    }
    actsInterface() {
        return `${(0, tool_1.camelCase)(this.entityName)}?: ${(0, tool_1.capitalCase)(this.entityName)}`;
    }
    isOmitted(field) {
        switch (field.name) {
            default: return false;
            case 'ix':
            case 'xi': return true;
        }
    }
}
class Act extends Entity {
    typeCaption() { return 'Action'; }
    interface() {
        let { fields, arrs, returns } = this.schema;
        let ts = `export interface Param${(0, tool_1.capitalCase)(this.entityName)} {`;
        ts += this.buildFields(fields, false);
        ts += this.buildArrs(arrs);
        ts += '\n}\n';
        ts += this.buildReturns(returns);
        return ts;
    }
    code() {
        return `\t${(0, tools_1.entityName)(this.entityName)}: UqAction<Param${(0, tool_1.capitalCase)(this.entityName)}, Result${(0, tool_1.capitalCase)(this.entityName)}>;`;
    }
}
class Query extends Entity {
    typeCaption() { return 'Query'; }
    interface() {
        let { fields, returns } = this.schema;
        let ts = `export interface Param${(0, tool_1.capitalCase)(this.entityName)} {`;
        ts += this.buildFields(fields, false);
        ts += '\n}\n';
        ts += this.buildReturns(returns);
        return ts;
    }
    code() {
        return `\t${(0, tools_1.entityName)(this.entityName)}: UqQuery<Param${(0, tool_1.capitalCase)(this.entityName)}, Result${(0, tool_1.capitalCase)(this.entityName)}>;`;
    }
}
class Tuid extends Entity {
    typeCaption() { return 'Tuid'; }
    interface() {
        let { fields } = this.schema;
        let ts = `export interface Tuid${(0, tool_1.capitalCase)(this.entityName)} {`;
        ts += `\n\tid?: number;`;
        ts += this.buildFields(fields, false);
        ts += '\n}';
        return ts;
    }
    code() {
        return `\t${(0, tools_1.entityName)(this.entityName)}: UqTuid<Tuid${(0, tool_1.capitalCase)(this.entityName)}>;`;
    }
}
class Book extends Entity {
    typeCaption() { return 'Book'; }
    interface() {
        let { fields, returns } = this.schema;
        let ts = `export interface Param${(0, tool_1.capitalCase)(this.entityName)} {`;
        ts += this.buildFields(fields, false);
        ts += '\n}\n';
        ts += this.buildReturns(returns);
        return ts;
    }
    code() {
        return `\t${(0, tools_1.entityName)(this.entityName)}: UqBook<Param${(0, tool_1.capitalCase)(this.entityName)}, Result${(0, tool_1.capitalCase)(this.entityName)}>;`;
    }
}
class Map extends Entity {
    typeCaption() { return 'Map'; }
    code() {
        return `\t${(0, tools_1.entityName)(this.entityName)}: UqMap;`;
    }
}
class History extends Entity {
    typeCaption() { return 'History'; }
    interface() {
        let { fields, returns } = this.schema;
        let ts = `export interface Param${(0, tool_1.capitalCase)(this.entityName)} {`;
        ts += this.buildFields(fields, false);
        ts += '\n}\n';
        ts += this.buildReturns(returns);
        return ts;
    }
    code() {
        let cName = (0, tool_1.capitalCase)(this.entityName);
        return `\t${(0, tools_1.entityName)(this.entityName)}: UqHistory<Param${cName}, Result${cName}>;`;
    }
}
class Pending extends Entity {
    typeCaption() { return 'Pending'; }
    code() {
        return `\t${(0, tools_1.entityName)(this.entityName)}: UqPending<any, any>;`;
    }
}
class Role extends Entity {
    typeCaption() { return undefined; }
    interface() {
        let names = this.schema.names;
        let enms = '';
        let str = '';
        for (let i in names) {
            str += `\t${i}:[\n\t\t`;
            if (i === '$') {
                enms += 'export enum EnumRole {\n';
                for (let n of names[i]) {
                    enms += `\t${n} = '${n}',\n`;
                    str += `EnumRole.${n}, `;
                }
            }
            else {
                enms += `export enum EnumRole${(0, tool_1.capitalCase)(i)} {\n`;
                for (let n of names[i]) {
                    enms += `\t${n} = '${i}.${n}',\n`;
                    str += `EnumRole${(0, tool_1.capitalCase)(i)}.${n}, `;
                }
            }
            enms += '};\n\n';
            str += '\n\t],\n';
        }
        return `${enms}export const Role = {
${str}};`;
    }
}
class Enum extends Entity {
    typeCaption() { return undefined; }
    interface() {
        return this.buildInternalEnum();
    }
}
class Const extends Entity {
    typeCaption() { return undefined; }
    interface() {
        return this.buildInternalConst();
    }
}
class Sheet extends Entity {
    typeCaption() { return 'Sheet'; }
    interface() {
        let { fields, arrFields, verify } = this.schema;
        let ts = `export interface Sheet${(0, tool_1.capitalCase)(this.entityName)} {`;
        ts += this.buildFields(fields, false);
        ts += this.buildArrs(arrFields);
        ts += '}';
        if (verify) {
            let { returns } = verify;
            ts += `\nexport interface Verify${(0, tool_1.capitalCase)(this.entityName)} {`;
            for (let item of returns) {
                let { name: arrName, fields } = item;
                ts += '\n\t' + arrName + ': {';
                ts += this.buildFields(fields, false, 2);
                ts += '\n\t}[];';
            }
            ts += '\n}';
        }
        return ts;
    }
    code() {
        let { verify } = this.schema;
        let cName = (0, tool_1.capitalCase)(this.entityName);
        let v = verify ? `Verify${cName}` : 'any';
        let ts = `\t${(0, tools_1.entityName)(this.entityName)}: UqSheet<Sheet${cName}, ${v}>;`;
        return ts;
    }
}
const typeEntities = {
    "$role": Role,
    "enum": Enum,
    'tuid': Tuid,
    'action': Act,
    'act': Act,
    'const': Const,
    'sheet': Sheet,
    'query': Query,
    'book': Book,
    'map': Map,
    'history': History,
    'pending': Pending,
    'id': ID,
    'idx': IDX,
    'ix': IX,
    'biz': Biz,
};
const idOnlyEntities = {
    "enum": true,
    'const': true,
    'id': true,
    'ix': true,
    'idx': true,
    'action': true,
    'query': true,
};
//# sourceMappingURL=TsUQ.js.map