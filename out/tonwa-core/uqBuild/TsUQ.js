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
    constructor(buildContext, uqSchema, uqAlias) {
        this.buildContext = buildContext;
        this.uqSchema = uqSchema;
        this.uqAlias = uqAlias;
    }
    build() {
        let tsImport = `
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq`;
        let ts = `\n\n`;
        ts += '\n//===============================';
        ts += `\n//======= UQ ${this.uqAlias} ========`;
        ts += '\n//===============================';
        ts += '\n';
        let entityArr = [];
        for (let i in this.uqSchema) {
            let schema = this.uqSchema[i];
            let { name, type } = schema;
            if (name.indexOf('$') > 0)
                continue;
            let EntityType = typeEntities[type];
            if (!EntityType)
                continue;
            let entity = new EntityType(schema, this.buildContext);
            entityArr.push(entity);
        }
        for (let entity of entityArr) {
            let intf = entity.interface();
            if (intf === undefined)
                continue;
            ts += '\n' + intf + '\n';
        }
        ts += `\nexport interface ParamActs {`;
        for (let entity of entityArr) {
            let ai = entity.actsInterface();
            if (ai === undefined)
                continue;
            ts += `\n\t${entity.actsInterface()}[];`;
            //ts += this.buildActsInterface(this.uqSchema);
        }
        ts += '\n}\n';
        ts += `

export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;
	SQL: Uq;
	IDRender(id:number):${this.buildContext.element};
	IDLocalRender(id:number):${this.buildContext.element};
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
        /*
                ts += `
        export function assign(uq: any, to:string, from:any): void {
            let hasEntity = uq.hasEntity(to);
            if (hasEntity === false) {
                return;
            }
            Object.assign((uq as any)[to], from);
        }
        `;
        */
        for (let i in typeCaptions) {
            tsImport += ', ' + i;
        }
        tsImport += ` } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Render, IDXEntity } from "tonwa-${this.buildContext.uiPlatform}";`;
        let schema = JSON.stringify(this.uqSchema, undefined, 4);
        schema = schema.replace(/\"\: \[\]/g, '": [] as any');
        return tsImport + ts + '\n\nexport const uqSchema=' + schema;
    }
}
exports.TsUQ = TsUQ;
class Entity {
    constructor(schema, buildContext) {
        this.schema = schema;
        this.buildContext = buildContext;
        this.entityName = schema.name;
    }
    interface() { return ''; }
    code() { return undefined; }
    actsInterface() { return undefined; }
    typeCaption() { return undefined; }
    buildFields(fields, isInID = false, indent = 1) {
        if (!fields)
            return '';
        let ts = '';
        for (let f of fields) {
            ts += this.buildField(f, isInID, indent);
        }
        return ts;
    }
    buildField(field, isInID, indent = 1) {
        let { name, type } = field;
        let s = fieldTypeMap[type];
        if (!s)
            s = 'any';
        let q = (isInID === true && sysFields.indexOf(name) >= 0) ? '?' : '';
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
            ts += this.buildFields(ret.fields);
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
}
class IDBase extends Entity {
}
class ID extends IDBase {
    typeCaption() { return 'ID'; }
    interface() {
        let { fields, keys: schemaKeys } = this.schema;
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
        let ts = `export interface ${(0, tool_1.capitalCase)(this.entityName)} {`;
        ts += `\n\tid?: number;`;
        ts += this.buildFields(keys, true);
        ts += this.buildFields(others, true);
        ts += '\n}';
        return ts;
    }
    code() {
        return `\t${(0, tools_1.entityName)(this.entityName)}: UqID<any>;`;
    }
    actsInterface() {
        return `${(0, tool_1.camelCase)(this.entityName)}?: ${(0, tool_1.capitalCase)(this.entityName)}`;
    }
}
class IDX extends IDBase {
    typeCaption() { return 'IDX'; }
    interface() {
        let { fields, exFields } = this.schema;
        let ts = `export interface ${(0, tool_1.capitalCase)(this.entityName)} {`;
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
}
class IX extends IDBase {
    typeCaption() { return 'IX'; }
    interface() {
        let { fields } = this.schema;
        let ts = `export interface ${(0, tool_1.capitalCase)(this.entityName)} {`;
        ts += this.buildFields(fields);
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
}
class Act extends Entity {
    typeCaption() { return 'Action'; }
    interface() {
        let { fields, arrFields, returns } = this.schema;
        let ts = `export interface Param${(0, tool_1.capitalCase)(this.entityName)} {`;
        ts += this.buildFields(fields);
        ts += this.buildArrs(arrFields);
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
        ts += this.buildFields(fields);
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
        ts += this.buildFields(fields);
        ts += '\n}';
        return ts;
    }
    code() {
        return `\t${(0, tools_1.entityName)(this.entityName)}: UqTuid<Tuid${(0, tool_1.capitalCase)(this.entityName)}>&{tv:(id:number, render?:Render<any>)=>${this.buildContext.element}};`;
    }
}
class Book extends Entity {
    typeCaption() { return 'Book'; }
    interface() {
        let { fields, returns } = this.schema;
        let ts = `export interface Param${(0, tool_1.capitalCase)(this.entityName)} {`;
        ts += this.buildFields(fields);
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
        ts += this.buildFields(fields);
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
class Enum extends Entity {
    typeCaption() { return undefined; }
    interface() {
        let { values } = this.schema;
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
}
class Sheet extends Entity {
    typeCaption() { return 'Sheet'; }
    interface() {
        let { fields, arrFields, verify } = this.schema;
        let ts = `export interface Sheet${(0, tool_1.capitalCase)(this.entityName)} {`;
        ts += this.buildFields(fields);
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
    "enum": Enum,
    'tuid': Tuid,
    'action': Act,
    'act': Act,
    'sheet': Sheet,
    'query': Query,
    'book': Book,
    'map': Map,
    'history': History,
    'pending': Pending,
    'id': ID,
    'idx': IDX,
    'ix': IX,
};
//# sourceMappingURL=TsUQ.js.map