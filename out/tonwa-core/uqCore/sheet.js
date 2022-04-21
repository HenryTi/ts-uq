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
exports.Sheet = exports.UqSheet = void 0;
const entity_1 = require("./entity");
const caller_1 = require("./caller");
class UqSheet extends entity_1.Entity {
    get typeName() { return 'sheet'; }
    /*
    setStates(states: SheetState[]) {
        for (let state of states) {
            this.setStateAccess(this.states.find(s=>s.name==state.name), state);
        }
    }*/
    setSchema(schema) {
        super.setSchema(schema);
        this.states = schema.states;
        this.verify = schema.verify;
    }
    build(obj) {
        this.states = [];
        for (let op of obj.ops) {
            this.states.push({ name: op, actions: undefined });
        }
        /*
        for (let p in obj) {
            switch(p) {
                case '#':
                case '$': continue;
                default: this.states.push(this.createSheetState(p, obj[p])); break;
            }
        }*/
    }
    createSheetState(name, obj) {
        let ret = { name: name, actions: [] };
        let actions = ret.actions;
        for (let p in obj) {
            let action = { name: p };
            actions.push(action);
        }
        return ret;
    }
    save(discription, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = this.uq;
            let params = { app: id, discription: discription, data: data };
            return yield new SaveCaller(this, params).request();
        });
    }
    saveDebugDirect(discription, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = this.uq;
            let params = { app: id, discription: discription, data: data };
            return yield new SaveDirectCaller(this, params).request();
        });
    }
    action(id, flow, state, action) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new ActionCaller(this, { id: id, flow: flow, state: state, action: action }).request();
        });
    }
    actionDebugDirect(id, flow, state, action) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new ActionDirectCaller(this, { id: id, flow: flow, state: state, action: action }).request();
        });
    }
    unpack(data) {
        //if (this.schema === undefined) await this.loadSchema();
        let ret = data[0];
        let brief = ret[0];
        let sheetData = this.unpackSheet(brief.data);
        let flows = data[1];
        return {
            brief: brief,
            data: sheetData,
            flows: flows,
        };
    }
    getSheet(id) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            await this.loadSchema();
            let ret = await this.uqApi.getSheet(this.name, id);
            */
            let ret = yield new GetSheetCaller(this, id).request();
            if (ret[0].length === 0)
                return yield this.getArchive(id);
            return this.unpack(ret);
        });
    }
    getArchive(id) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            await this.loadSchema();
            let ret = await this.uqApi.sheetArchive(this.name, id)
            return this.unpack(ret);
            */
            let ret = yield new SheetArchiveCaller(this, id).request();
            return this.unpack(ret);
        });
    }
    getArchives(pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            await this.loadSchema();
            let ret = await this.uqApi.sheetArchives(this.name, {pageStart:pageStart, pageSize:pageSize});
            return ret;
            */
            let params = { pageStart: pageStart, pageSize: pageSize };
            return yield new SheetArchivesCaller(this, params).request();
        });
    }
    getStateSheets(state, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            await this.loadSchema();
            let ret = await this.uqApi.stateSheets(this.name, {state:state, pageStart:pageStart, pageSize:pageSize});
            return ret;
            */
            let params = { state: state, pageStart: pageStart, pageSize: pageSize };
            return yield new StateSheetsCaller(this, params).request();
        });
    }
    //createPageStateItems<T>(): PageStateItems<T> {return new PageStateItems<T>(this);}
    stateSheetCount() {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            await this.loadSchema();
            let ret:StateCount[] = await this.uqApi.stateSheetCount(this.name);
            return this.states.map(s => {
                let n = s.name, count = 0;
                let r = ret.find(v => v.state === n);
                if (r !== undefined) count = r.count;
                return {state: n, count: count}
            });
            */
            return yield new StateSheetCountCaller(this, undefined).request();
        });
    }
    userSheets(state, user, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            let params = { state: state, user: user, pageStart: pageStart, pageSize: pageSize };
            return yield new UserSheetsCaller(this, params).request();
        });
    }
    mySheets(state, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            await this.loadSchema();
            let ret = await this.uqApi.mySheets(this.name, {state:state, pageStart:pageStart, pageSize:pageSize});
            return ret;
            */
            let params = { state: state, pageStart: pageStart, pageSize: pageSize };
            return yield new MySheetsCaller(this, params).request();
        });
    }
}
exports.UqSheet = UqSheet;
class Sheet extends UqSheet {
}
exports.Sheet = Sheet;
class SheetCaller extends caller_1.EntityCaller {
    get entity() { return this._entity; }
    get path() { return `sheet/${this.entity.name}/${this.suffix}`; }
}
class SaveCaller extends SheetCaller {
    get path() { return `sheet/${this.entity.name}`; }
    buildParams() {
        let { app, discription, data } = this.params;
        return {
            app: app,
            discription: discription,
            data: this.entity.pack(data)
        };
    }
    xresult(res) {
        let { verify } = this.entity;
        if (verify === undefined)
            return res;
        let resVerify = res.verify;
        if (resVerify === undefined || resVerify.length === 0) {
            res.verify = undefined;
            return res;
        }
        let { returns } = verify;
        res.verify = this.entity.unpackReturns(resVerify, returns);
        return res;
    }
}
class SaveDirectCaller extends SaveCaller {
    get path() { return `sheet/${this.entity.name}/direct`; }
}
class ActionCaller extends SheetCaller {
    constructor() {
        super(...arguments);
        this.method = 'PUT';
    }
    get path() { return `sheet/${this.entity.name}`; }
}
class ActionDirectCaller extends ActionCaller {
    get path() { return `sheet/${this.entity.name}/direct`; }
}
class GetSheetCaller extends SheetCaller {
    constructor() {
        super(...arguments);
        //protected readonly params: number;  // id
        this.method = 'GET';
    }
    //private id:number;
    //protected readonly suffix = 'archive';
    buildParams() { }
    get path() { return `sheet/${this.entity.name}/get/${this.params}`; }
}
class SheetArchiveCaller extends SheetCaller {
    constructor() {
        super(...arguments);
        //protected readonly params: number;  // id
        this.method = 'GET';
    }
    //protected readonly suffix = 'archive';
    buildParams() { }
    get path() { return `sheet/${this.entity.name}/archive/${this.params}`; }
}
class SheetArchivesCaller extends SheetCaller {
    constructor() {
        super(...arguments);
        this.suffix = 'archives';
    }
}
class StateSheetsCaller extends SheetCaller {
    constructor() {
        super(...arguments);
        this.suffix = 'states';
    }
}
class StateSheetCountCaller extends SheetCaller {
    constructor() {
        super(...arguments);
        this.method = 'GET';
        this.suffix = 'statecount';
    }
    xresult(res) {
        let { states } = this.entity;
        return states.map(s => {
            let n = s.name, count = 0;
            let r = res.find(v => v.state === n);
            if (r !== undefined)
                count = r.count;
            return { state: n, count: count };
        });
    }
}
class UserSheetsCaller extends SheetCaller {
    constructor() {
        super(...arguments);
        this.suffix = 'user-sheets';
    }
    xresult(res) {
        return res;
    }
}
class MySheetsCaller extends SheetCaller {
    constructor() {
        super(...arguments);
        this.suffix = 'my-sheets';
    }
    xresult(res) {
        return res;
    }
}
/*
export class PageStateItems<T> extends PageItems<T> {
    private sheet: Sheet;
    constructor(sheet: Sheet) {
        super(true);
        this.sheet = sheet;
        this.pageSize = 10;
    }
    protected async loadResults(param:any, pageStart:any, pageSize:number):Promise<{[name:string]:any[]}> {
        let ret = await this.sheet.getStateSheets(param, pageStart, pageSize);
        return {$page: ret};
    }
    protected getPageId(item:T) {
        return item === undefined? 0 : (item as any).id;
    }
}
*/
//# sourceMappingURL=sheet.js.map