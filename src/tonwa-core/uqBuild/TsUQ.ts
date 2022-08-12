import { UqBuildContext } from "./UqBuildContext";
import { camelCase, capitalCase } from "../tool";
import { entityName } from "./tools";
import { ArrFields, Field } from "./field";

const fieldTypeMap: { [type: string]: string } = {
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

export class TsUQ {
    private buildContext: UqBuildContext;
    private readonly uqSchema: { [entity: string]: any };
    private readonly uqAlias: string;

    constructor(buildContext: UqBuildContext, uqSchema: { [entity: string]: any }, uqAlias: string) {
        this.buildContext = buildContext;
        this.uqSchema = uqSchema;
        this.uqAlias = uqAlias;
    }

    build() {
        let tsImport = `
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq`;
        let ts: string = `


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
        let entityArr: Entity[] = [];
        for (let i in this.uqSchema) {
            let schema = this.uqSchema[i];
            let { name, type } = schema;
            if (name.indexOf('$') > 0) continue;
            let EntityType: (new (uqSchema: any, schema: any, buildContext: UqBuildContext) => Entity) = typeEntities[type];
            if (!EntityType) continue;
            let entity = new EntityType(this.uqSchema, schema, this.buildContext);
            entityArr.push(entity);
        }

        for (let entity of entityArr) {
            let intf = entity.interface();
            if (intf === undefined) continue;
            ts += '\n' + intf + '\n';
            let intfInActs = entity.interfaceInActs();
            if (intfInActs === undefined) continue;
            ts += '\n' + intfInActs + '\n';
        }

        ts += `\nexport interface ParamActs {`;
        for (let entity of entityArr) {
            let ai = entity.actsInterface();
            if (ai === undefined) continue;
            ts += `\n\t${ai}[];`;
        }
        ts += '\n}\n';

        ts += `

export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;
	SQL: Uq;
	IDRender(id:number):${this.buildContext.element};
	IDLocalRender(id:number):${this.buildContext.element};
`;

        let typeCaptions: { [type: string]: boolean } = {};
        for (let entity of entityArr) {
            let code = entity.code();
            if (code === undefined) continue;
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

abstract class Entity {
    protected readonly uqSchema: any;
    protected readonly schema: any;
    protected readonly buildContext: UqBuildContext;
    protected readonly entityName: string;
    constructor(uqSchema: any, schema: any, buildContext: UqBuildContext) {
        this.uqSchema = uqSchema;
        this.schema = schema;
        this.buildContext = buildContext;
        this.entityName = schema.name;
    }
    interface(): string { return ''; }
    interfaceInActs(): string { return undefined; }
    code(): string { return undefined; }
    actsInterface(): string { return undefined; }
    typeCaption(): string { return undefined; }

    protected buildFields(fields: Field[], indent: number = 1) {
        if (!fields) return '';
        let ts = '';
        for (let f of fields) {
            ts += this.buildField(f, indent);
        }
        return ts;
    }

    protected isOptionalField(field: Field): boolean {
        return false;
    }

    protected isOmitted(field: Field): boolean {
        return false;
    }

    protected buildField(field: Field, indent: number = 1) {
        if (this.isOmitted(field) === true) return '';
        let { name, type } = field;
        let s = fieldTypeMap[type];
        if (!s) s = 'any';
        let q: string = this.isOptionalField(field) === true ? '?' : '';
        return `\n${'\t'.repeat(indent)}${name}${q}: ${s};`;
    }

    protected buildArrs(arrFields: ArrFields[]): string {
        if (!arrFields) return '';
        let ts = '\n';
        for (let af of arrFields) {
            ts += `\t${camelCase(af.name)}: {`;
            ts += this.buildFields(af.fields, 2);
            ts += '\n\t}[];\n';
        }
        return ts;
    }

    protected buildReturns(returns: { name: string; fields: Field[] }[]): string {
        if (!returns) return;
        let { name } = this.schema;
        name = capitalCase(name);
        let ts = '';
        for (let ret of returns) {
            let { name: retName, fields } = ret;
            retName = capitalCase(retName);
            ts += `export interface Return${name}${retName} {`;
            ts += this.buildFields(ret.fields);
            ts += '\n}\n';
        }

        ts += `export interface Result${name} {\n`;
        for (let ret of returns) {
            let retName = capitalCase(ret.name);
            ts += `\t${ret.name}: Return${name}${retName}[];\n`;
        }
        ts += '}';
        return ts;
    }
}

abstract class IDBase extends Entity {
}

class ID extends IDBase {
    private isInActs: boolean;
    typeCaption(): string { return 'ID'; }
    private interfaceInternal(): string {
        let { fields, keys: schemaKeys } = this.schema;
        let keys: Field[] = [], others: Field[] = [];
        for (let f of fields) {
            let { name } = f;
            if (name === 'id') continue;
            if ((schemaKeys as any[]).find(v => v.name === name)) keys.push(f);
            else others.push(f);
        }
        let inActs: string = this.isInActs === true ? 'InActs' : '';
        let ts = `export interface ${capitalCase(this.entityName)}${inActs} extends ID {`;
        if (this.isInActs === true) {
            ts += '\n\tID?: UqID<any>;';
        }
        ts += this.buildFields(keys);
        ts += this.buildFields(others);
        ts += '\n}';
        return ts;
    }
    protected buildField(field: Field, indent: number = 1) {
        if (this.isOmitted(field) === true) return '';
        let { name, type } = field;
        let s = fieldTypeMap[type];
        if (this.isInActs === true && type === 'id') {
            let { ID } = field as any;
            if (ID) {
                s = `number | ${this.uqSchema[ID]?.name}InActs`;
            }
            else {
                s = 'number | ID';
            }
        }
        if (!s) s = 'any';
        let q: string = this.isOptionalField(field) === true ? '?' : '';
        return `\n${'\t'.repeat(indent)}${name}${q}: ${s};`;
    }
    interface(): string {
        this.isInActs = false;
        return this.interfaceInternal();
    }
    interfaceInActs(): string {
        this.isInActs = true;
        return this.interfaceInternal();
    }
    code(): string {
        return `\t${entityName(this.entityName)}: UqID<any>;`;
    }
    actsInterface(): string {
        return `${camelCase(this.entityName)}?: ${capitalCase(this.entityName)}InActs`;
    }
    protected isOptionalField(field: Field): boolean {
        return sysFields.indexOf(field.name) >= 0;
    }
    protected isOmitted(field: Field): boolean {
        switch (field.name) {
            default: return false;
            case 'id': return true;
        }
    }
}

class IDX extends IDBase {
    typeCaption(): string { return 'IDX'; }
    interface(): string {
        let { fields, exFields } = this.schema;
        let ts = `export interface ${capitalCase(this.entityName)} extends IDX {`;
        let indent = 1;
        for (let field of fields) {
            let { name, type } = field;
            let s = fieldTypeMap[type];
            if (!s) s = 'any';
            ts += `\n${'\t'.repeat(indent)}${name}`;
            if (name !== 'id') ts += '?';
            ts += `: ${s};`;
        }

        ts += `\n\t$act?: number;`;

        let hasTrack: boolean = false;
        let hasMemo: boolean = false;
        if (exFields) {
            for (let exField of exFields) {
                let { track, memo } = exField;
                if (track === true) hasTrack = true;
                if (memo === true) hasMemo = true;
            }
        }
        if (hasTrack === true) {
            ts += `\n\t$track?: number;`;
        }
        if (hasMemo === true) {
            ts += `\n\t$memo?: string;`;
        }
        ts += '\n}';

        ts += `export interface ActParam${capitalCase(this.entityName)} {`;
        indent = 1;
        for (let field of fields) {
            let { name, type } = field;
            let s = fieldTypeMap[type];
            if (!s) s = 'any';
            ts += `\n${'\t'.repeat(indent)}${name}`;
            if (name !== 'id') ts += '?';
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
    code(): string {
        return `\t${entityName(this.entityName)}: UqIDX<any>;`;
    }
    actsInterface(): string {
        return `${camelCase(this.entityName)}?: ActParam${capitalCase(this.entityName)}`;
    }
    protected isOmitted(field: Field): boolean {
        switch (field.name) {
            default: return false;
            case 'id': return true;
        }
    }
}

class IX extends IDBase {
    typeCaption(): string { return 'IX'; }
    interface(): string {
        let { fields } = this.schema;
        let ts = `export interface ${capitalCase(this.entityName)} extends IX {`;
        ts += this.buildFields(fields);
        ts += '\n}';
        return ts;
    }
    code(): string {
        let ts = `\t${entityName(this.entityName)}: UqIX<any>;`;
        return ts;
    }
    actsInterface(): string {
        return `${camelCase(this.entityName)}?: ${capitalCase(this.entityName)}`;
    }
    protected isOmitted(field: Field): boolean {
        switch (field.name) {
            default: return false;
            case 'ix':
            case 'xi': return true;
        }
    }
}

class Act extends Entity {
    typeCaption(): string { return 'Action'; }
    interface(): string {
        let { fields, arrFields, returns } = this.schema;
        let ts = `export interface Param${capitalCase(this.entityName)} {`;
        ts += this.buildFields(fields);
        ts += this.buildArrs(arrFields);
        ts += '\n}\n';
        ts += this.buildReturns(returns);
        return ts;
    }
    code(): string {
        return `\t${entityName(this.entityName)}: UqAction<Param${capitalCase(this.entityName)}, Result${capitalCase(this.entityName)}>;`;
    }
}

class Query extends Entity {
    typeCaption(): string { return 'Query'; }
    interface(): string {
        let { fields, returns } = this.schema;
        let ts = `export interface Param${capitalCase(this.entityName)} {`;
        ts += this.buildFields(fields);
        ts += '\n}\n';
        ts += this.buildReturns(returns);
        return ts;
    }
    code(): string {
        return `\t${entityName(this.entityName)}: UqQuery<Param${capitalCase(this.entityName)}, Result${capitalCase(this.entityName)}>;`;
    }
}

class Tuid extends Entity {
    typeCaption(): string { return 'Tuid'; }
    interface(): string {
        let { fields } = this.schema;
        let ts = `export interface Tuid${capitalCase(this.entityName)} {`;
        ts += `\n\tid?: number;`;
        ts += this.buildFields(fields);
        ts += '\n}';
        return ts;
    }
    code(): string {
        return `\t${entityName(this.entityName)}: UqTuid<Tuid${capitalCase(this.entityName)}>&{tv:(id:number, render?:Render<any>)=>${this.buildContext.element}};`;
    }
}

class Book extends Entity {
    typeCaption(): string { return 'Book'; }
    interface(): string {
        let { fields, returns } = this.schema;
        let ts = `export interface Param${capitalCase(this.entityName)} {`;
        ts += this.buildFields(fields);
        ts += '\n}\n';
        ts += this.buildReturns(returns);
        return ts;
    }
    code(): string {
        return `\t${entityName(this.entityName)}: UqBook<Param${capitalCase(this.entityName)}, Result${capitalCase(this.entityName)}>;`;
    }
}

class Map extends Entity {
    typeCaption(): string { return 'Map'; }
    code(): string {
        return `\t${entityName(this.entityName)}: UqMap;`;
    }
}

class History extends Entity {
    typeCaption(): string { return 'History'; }
    interface(): string {
        let { fields, returns } = this.schema;
        let ts = `export interface Param${capitalCase(this.entityName)} {`;
        ts += this.buildFields(fields);
        ts += '\n}\n';
        ts += this.buildReturns(returns);
        return ts;
    }
    code(): string {
        let cName = capitalCase(this.entityName);
        return `\t${entityName(this.entityName)}: UqHistory<Param${cName}, Result${cName}>;`;
    }
}

class Pending extends Entity {
    typeCaption(): string { return 'Pending'; }
    code(): string {
        return `\t${entityName(this.entityName)}: UqPending<any, any>;`;
    }
}

class Role extends Entity {
    typeCaption(): string { return undefined; }
    interface(): string {
        let names: string[] = this.schema.names;
        let str = names.map(v => `\t'${v}'`).join(',\n');
        return `export const $Role = [\n${str}\n];`;

        /*
        let obj: any = {};
        for (let name of names) {
            let pos = name.indexOf('.');
            if (pos < 0) {
                obj[name] = name;
            }
            else {
                let p1 = name.substring(0, pos);
                let p2 = name.substring(pos + 1);
                let obj1 = obj[p1];
                if (obj1 === undefined) {
                    obj[p1] = obj1 = {};
                }
                obj1[p2] = name;
            }
        }
        */
        // let ret = 'export const $Role = ' + JSON.stringify(obj, undefined, '\t');
        // return ret + ';\n';
    }
}

class Enum extends Entity {
    typeCaption(): string { return undefined; }
    interface(): string {
        let { values } = this.schema;
        let ts = `export enum ${capitalCase(this.entityName)} {`;
        let first: boolean = true;
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
        return ts += '\n}'
    }
}

class Const extends Entity {
    typeCaption(): string { return undefined; }
    interface(): string {
        let { values } = this.schema;
        let $ = values['$'];
        if ($) {
            let v: string;
            switch (typeof $) {
                case 'number': v = `${$}`; break;
                case 'string': v = `'${$}'`; break;
            }
            return `export const ${capitalCase(this.entityName)} = ${v}`;
        }
        let ts = `export const ${capitalCase(this.entityName)} = {`;
        let first: boolean = true;
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
        return ts += '\n}'
    }
}

class Sheet extends Entity {
    typeCaption(): string { return 'Sheet'; }
    interface(): string {
        let { fields, arrFields, verify } = this.schema;
        let ts = `export interface Sheet${capitalCase(this.entityName)} {`;
        ts += this.buildFields(fields);
        ts += this.buildArrs(arrFields);
        ts += '}';

        if (verify) {
            let { returns } = verify;
            ts += `\nexport interface Verify${capitalCase(this.entityName)} {`;
            for (let item of returns) {
                let { name: arrName, fields } = item;
                ts += '\n\t' + arrName + ': {';
                ts += this.buildFields(fields, 2);
                ts += '\n\t}[];';
            }
            ts += '\n}';
        }
        return ts;
    }
    code(): string {
        let { verify } = this.schema;
        let cName = capitalCase(this.entityName);
        let v = verify ? `Verify${cName}` : 'any';
        let ts = `\t${entityName(this.entityName)}: UqSheet<Sheet${cName}, ${v}>;`;
        return ts;
    }
}

const typeEntities: { [type: string]: (new (uqSchema: any, schema: any, buildContext: UqBuildContext) => Entity) } = {
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
};
