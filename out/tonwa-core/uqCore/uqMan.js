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
exports.UqMan = exports.fieldDefaultValue = void 0;
/* eslint-disable */
const web_1 = require("../web");
const tuid_1 = require("./tuid");
const action_1 = require("./action");
const sheet_1 = require("./sheet");
const query_1 = require("./query");
const book_1 = require("./book");
const history_1 = require("./history");
const map_1 = require("./map");
const pending_1 = require("./pending");
const tool_1 = require("../tool");
const enum_1 = require("./enum");
const ID_1 = require("./ID");
const IDCache_1 = require("./IDCache");
function fieldDefaultValue(type) {
    switch (type) {
        case 'tinyint':
        case 'smallint':
        case 'int':
        case 'bigint':
        case 'dec':
        case 'float':
        case 'double':
        case 'enum':
            return 0;
        case 'char':
        case 'text':
            return '';
        case 'datetime':
        case 'date':
            return '2000-1-1';
        case 'time':
            return '0:00';
    }
}
exports.fieldDefaultValue = fieldDefaultValue;
function IDPath(path) { return path; }
var EnumResultType;
(function (EnumResultType) {
    EnumResultType[EnumResultType["data"] = 0] = "data";
    EnumResultType[EnumResultType["sql"] = 1] = "sql";
})(EnumResultType || (EnumResultType = {}));
;
class UqMan {
    constructor(tonwa, uqData) {
        this.entities = {};
        this.entityTypes = {};
        this.enums = {};
        this.actions = {};
        this.queries = {};
        this.ids = {};
        this.idxs = {};
        this.ixs = {};
        this.sheets = {};
        this.books = {};
        this.maps = {};
        this.histories = {};
        this.pendings = {};
        this.tuids = {};
        this.tuidArr = [];
        this.actionArr = [];
        this.queryArr = [];
        this.idArr = [];
        this.idxArr = [];
        this.ixArr = [];
        this.enumArr = [];
        this.sheetArr = [];
        this.bookArr = [];
        this.mapArr = [];
        this.historyArr = [];
        this.pendingArr = [];
        this.Acts = (param) => __awaiter(this, void 0, void 0, function* () {
            //let apiParam = this.ActsApiParam(param);
            let ret = yield this.apiActs(param, EnumResultType.data); // await this.apiPost('acts', apiParam);
            let retArr = ret[0].ret.split('\n');
            let arr = [];
            for (let i in param)
                arr.push(i);
            let retActs = {};
            for (let i = 0; i < arr.length; i++) {
                retActs[arr[i]] = ids(retArr[i].split('\t'));
            }
            return retActs;
        });
        this.AdminGetList = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.uqApi.getAdmins();
        });
        this.AdminSetMe = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.uqApi.setMeAdmin();
        });
        this.AdminSet = (user, role, name, nick, icon, assigned) => __awaiter(this, void 0, void 0, function* () {
            return yield this.uqApi.setAdmin(user, role, name, nick, icon, assigned);
        });
        this.AdminIsMe = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.uqApi.isAdmin();
        });
        this.IDValue = (type, value) => {
            if (!type)
                return;
            let ID = this.ids[type.toLowerCase()];
            if (ID === undefined)
                return;
            /*
            if (ID.fields === undefined) {
                await ID.loadSchema();
            }
            */
            return ID.valueFromString(value);
        };
        this.$Acts = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiActs(param, EnumResultType.sql);
        });
        this.ActIX = (param) => __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.apiActIX(param, EnumResultType.data);
            return ret[0].ret.split('\t').map(v => Number(v));
        });
        this.$ActIX = (param) => __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.apiActIX(param, EnumResultType.sql);
            return ret;
        });
        this.ActIXSort = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiActIxSort(param, EnumResultType.data);
        });
        this.$ActIXSort = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiActIxSort(param, EnumResultType.sql);
        });
        this.ActIDProp = (ID, id, name, value) => __awaiter(this, void 0, void 0, function* () {
            yield this.uqApi.post('act-id-prop', { ID: ID.name, id, name, value });
        });
        this.ActDetail = (param) => __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.apiActDetail(param, EnumResultType.data);
            let val = ret[0].ret;
            let parts = val.split('\n');
            let items = parts.map(v => v.split('\t'));
            ret = {
                main: ids(items[0])[0],
                detail: ids(items[1]),
                detail2: ids(items[2]),
                detail3: ids(items[3]),
            };
            return ret;
        });
        this.$ActDetail = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiActDetail(param, EnumResultType.sql);
        });
        this.QueryID = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiQueryID(param, EnumResultType.data);
        });
        this.$QueryID = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiQueryID(param, EnumResultType.sql);
        });
        this.IDTv = (ids) => __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.apiIDTv(ids, EnumResultType.data);
            let retValues = [];
            for (let row of ret) {
                let { $type, $tv } = row;
                if (!$tv)
                    continue;
                let ID = this.ids[$type];
                if (!ID)
                    continue;
                let { schema } = ID;
                if (!schema) {
                    yield ID.loadSchema();
                    schema = ID.schema;
                }
                let { nameNoVice } = schema;
                if (!nameNoVice)
                    continue;
                let values = $tv.split('\n');
                let len = nameNoVice.length;
                for (let i = 0; i < len; i++) {
                    let p = nameNoVice[i];
                    row[p] = values[i];
                }
                delete row.$tv;
                retValues.push(row);
            }
            return retValues;
        });
        this.$IDTv = (ids) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIDTv(ids, EnumResultType.sql);
        });
        this.IDNO = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIDNO(param, EnumResultType.data);
        });
        this.IDEntity = (typeId) => {
            return this.entityTypes[typeId];
        };
        this.$IDNO = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIDNO(param, EnumResultType.sql);
        });
        this.IDDetailGet = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIDDetailGet(param, EnumResultType.data);
        });
        this.$IDDetailGet = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIDDetailGet(param, EnumResultType.sql);
        });
        this.ID = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiID(param, EnumResultType.data);
        });
        this.$ID = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiID(param, EnumResultType.sql);
        });
        this.KeyID = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiKeyID(param, EnumResultType.data);
        });
        this.$KeyID = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiKeyID(param, EnumResultType.sql);
        });
        this.IX = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIX(param, EnumResultType.data);
        });
        this.$IX = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIX(param, EnumResultType.sql);
        });
        this.IXValues = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIXValues(param, EnumResultType.data);
        });
        this.IXr = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIXr(param, EnumResultType.data);
        });
        this.$IXr = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIXr(param, EnumResultType.sql);
        });
        this.KeyIX = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiKeyIX(param, EnumResultType.data);
        });
        this.$KeyIX = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiKeyIX(param, EnumResultType.sql);
        });
        this.IDLog = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIDLog(param, EnumResultType.data);
        });
        this.$IDLog = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIDLog(param, EnumResultType.sql);
        });
        this.IDSum = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIDSum(param, EnumResultType.data);
        });
        this.$IDSum = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIDSum(param, EnumResultType.sql);
        });
        this.IDinIX = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIDinIX(param, EnumResultType.data);
        });
        this.$IDinIX = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIDinIX(param, EnumResultType.sql);
        });
        this.IDxID = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIDxID(param, EnumResultType.data);
        });
        this.$IDxID = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIDxID(param, EnumResultType.sql);
        });
        this.IDTree = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIDTree(param, EnumResultType.data);
        });
        this.$IDTree = (param) => __awaiter(this, void 0, void 0, function* () {
            return yield this.apiIDTree(param, EnumResultType.sql);
        });
        this.tonwa = tonwa;
        this.web = tonwa.web;
        let { id, uqOwner, uqName, newVersion } = uqData;
        this.newVersion = newVersion;
        this.uqOwner = uqOwner;
        this.uqName = uqName;
        this.id = id;
        this.name = uqOwner + '/' + uqName;
        this.uqVersion = 0;
        this.localMap = tool_1.env.localDb.map(this.name);
        this.localModifyMax = this.localMap.child('$modifyMax');
        this.localEntities = this.localMap.child('$access');
        let baseUrl = 'tv/';
        if (this.name === '$$$/$unitx') {
            // 这里假定，点击home link之后，已经设置unit了
            // 调用 UnitxApi会自动搜索绑定 unitx service
            this.uqApi = new web_1.UnitxApi(this.web, tool_1.env.unit);
        }
        else {
            this.uqApi = new web_1.UqApi(this.web, baseUrl, uqOwner, uqName, true);
        }
        this.tuidsCache = new tuid_1.TuidsCache(this);
    }
    getID(name) { return this.ids[name.toLowerCase()]; }
    ;
    getIDX(name) { return this.idxs[name.toLowerCase()]; }
    ;
    getIX(name) { return this.ixs[name.toLowerCase()]; }
    ;
    getRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.roles !== undefined)
                return this.roles;
            this.roles = yield this.uqApi.getRoles();
            return this.roles;
        });
    }
    tuid(name) { return this.tuids[name.toLowerCase()]; }
    tuidDiv(name, div) {
        let tuid = this.tuids[name.toLowerCase()];
        return tuid && tuid.div(div.toLowerCase());
    }
    action(name) { return this.actions[name.toLowerCase()]; }
    sheet(name) { return this.sheets[name.toLowerCase()]; }
    query(name) { return this.queries[name.toLowerCase()]; }
    book(name) { return this.books[name.toLowerCase()]; }
    map(name) { return this.maps[name.toLowerCase()]; }
    history(name) { return this.histories[name.toLowerCase()]; }
    pending(name) { return this.pendings[name.toLowerCase()]; }
    sheetFromTypeId(typeId) {
        for (let i in this.sheets) {
            let sheet = this.sheets[i];
            if (sheet.typeId === typeId)
                return sheet;
        }
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.uqApi.init();
        });
    }
    loadEntities() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let entities = this.localEntities.get();
                if (!entities) {
                    entities = yield this.uqApi.loadEntities();
                }
                if (!entities)
                    return;
                this.buildEntities(entities);
            }
            catch (err) {
                return err;
            }
        });
    }
    buildEntities(entities) {
        if (entities === undefined) {
            debugger;
        }
        this.localEntities.set(entities);
        let { access, tuids, role, version, ids } = entities;
        this.uqVersion = version;
        this.allRoles = role === null || role === void 0 ? void 0 : role.names;
        this.buildTuids(tuids);
        this.buildIds(ids);
        this.buildAccess(access);
    }
    buildTuids(tuids) {
        for (let i in tuids) {
            let schema = tuids[i];
            let { typeId, from } = schema;
            let tuid = this.newTuid(i, typeId, from);
            tuid.sys = true;
        }
        for (let i in tuids) {
            let schema = tuids[i];
            let tuid = this.getTuid(i);
            tuid.setSchema(schema);
        }
        for (let i in this.tuids) {
            let tuid = this.tuids[i];
            tuid.buildFieldsTuid();
        }
    }
    buildIds(ids) {
        for (let i in ids) {
            let schema = ids[i];
            let { typeId } = schema;
            let ID = this.newID(i, typeId);
            ID.setSchema(schema);
        }
    }
    loadEntitySchema(entityName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.uqApi.schema(entityName);
        });
    }
    loadAllSchemas() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.uqApi.allSchemas();
            let entities = [
                this.actionArr,
                this.enumArr,
                this.sheetArr,
                this.queryArr,
                this.bookArr,
                this.mapArr,
                this.historyArr,
                this.pendingArr,
                this.idArr,
                this.idxArr,
                this.ixArr,
            ];
            entities.forEach(arr => {
                arr.forEach(v => {
                    let entity = ret[v.name.toLowerCase()];
                    if (!entity)
                        return;
                    let schema = entity.call;
                    if (!schema)
                        return;
                    v.buildSchema(schema);
                });
            });
        });
    }
    getTuid(name) {
        return this.tuids[name];
    }
    buildAccess(access) {
        for (let a in access) {
            let v = access[a];
            switch (typeof v) {
                case 'string':
                    this.fromType(a, v);
                    break;
                case 'object':
                    this.fromObj(a, v);
                    break;
            }
        }
    }
    cacheTuids(defer) {
        this.tuidsCache.cacheTuids(defer);
    }
    setEntity(name, entity) {
        this.entities[name] = entity;
        this.entities[name.toLowerCase()] = entity;
        this.entityTypes[entity.typeId] = entity;
    }
    newEnum(name, id) {
        let enm = this.enums[name];
        if (enm !== undefined)
            return enm;
        enm = this.enums[name] = new enum_1.UqEnum(this, name, id);
        this.setEntity(name, enm);
        this.enumArr.push(enm);
        return enm;
    }
    newAction(name, id) {
        let action = this.actions[name];
        if (action !== undefined)
            return action;
        action = this.actions[name] = new action_1.Action(this, name, id);
        this.setEntity(name, action);
        this.actionArr.push(action);
        return action;
    }
    newTuid(name, id, from) {
        let tuid = this.tuids[name];
        if (tuid !== undefined)
            return tuid;
        if (from !== undefined)
            tuid = new tuid_1.TuidImport(this, name, id, from);
        else
            tuid = new tuid_1.TuidInner(this, name, id);
        this.tuids[name] = tuid;
        this.setEntity(name, tuid);
        this.tuidArr.push(tuid);
        return tuid;
    }
    newQuery(name, id) {
        let query = this.queries[name];
        if (query !== undefined)
            return query;
        query = this.queries[name] = new query_1.Query(this, name, id);
        this.setEntity(name, query);
        this.queryArr.push(query);
        return query;
    }
    newBook(name, id) {
        let book = this.books[name];
        if (book !== undefined)
            return book;
        book = this.books[name] = new book_1.Book(this, name, id);
        this.setEntity(name, book);
        this.bookArr.push(book);
        return book;
    }
    newMap(name, id) {
        let map = this.maps[name];
        if (map !== undefined)
            return map;
        map = this.maps[name] = new map_1.Map(this, name, id);
        this.setEntity(name, map);
        this.mapArr.push(map);
        return map;
    }
    newHistory(name, id) {
        let history = this.histories[name];
        if (history !== undefined)
            return;
        history = this.histories[name] = new history_1.History(this, name, id);
        this.setEntity(name, history);
        this.historyArr.push(history);
        return history;
    }
    newPending(name, id) {
        let pending = this.pendings[name];
        if (pending !== undefined)
            return;
        pending = this.pendings[name] = new pending_1.Pending(this, name, id);
        this.setEntity(name, pending);
        this.pendingArr.push(pending);
        return pending;
    }
    newSheet(name, id) {
        let sheet = this.sheets[name];
        if (sheet !== undefined)
            return sheet;
        sheet = this.sheets[name] = new sheet_1.Sheet(this, name, id);
        this.setEntity(name, sheet);
        this.sheetArr.push(sheet);
        return sheet;
    }
    newID(name, id) {
        let lName = name.toLowerCase();
        let idEntity = this.ids[lName];
        if (idEntity !== undefined)
            return idEntity;
        idEntity = this.ids[lName] = new ID_1.ID(this, name, id);
        this.setEntity(name, idEntity);
        this.idArr.push(idEntity);
        return idEntity;
    }
    newIDX(name, id) {
        let lName = name.toLowerCase();
        let idx = this.idxs[lName];
        if (idx !== undefined)
            return idx;
        idx = this.idxs[lName] = new ID_1.IDX(this, name, id);
        this.setEntity(name, idx);
        this.idxArr.push(idx);
        return idx;
    }
    newIX(name, id) {
        let lName = name.toLowerCase();
        let ix = this.ixs[lName];
        if (ix !== undefined)
            return ix;
        ix = this.ixs[lName] = new ID_1.IX(this, name, id);
        this.setEntity(name, ix);
        this.ixArr.push(ix);
        return ix;
    }
    fromType(name, type) {
        let parts = type.split('|');
        type = parts[0];
        let id = Number(parts[1]);
        switch (type) {
            //case 'uq': this.id = id; break;
            case 'tuid':
                // Tuid should not be created here!;
                //let tuid = this.newTuid(name, id);
                //tuid.sys = false;
                break;
            case 'id':
                this.newID(name, id);
                break;
            case 'idx':
                this.newIDX(name, id);
                break;
            case 'ix':
                this.newIX(name, id);
                break;
            case 'action':
                this.newAction(name, id);
                break;
            case 'query':
                this.newQuery(name, id);
                break;
            case 'book':
                this.newBook(name, id);
                break;
            case 'map':
                this.newMap(name, id);
                break;
            case 'history':
                this.newHistory(name, id);
                break;
            case 'sheet':
                this.newSheet(name, id);
                break;
            case 'pending':
                this.newPending(name, id);
                break;
            case 'enum':
                this.newEnum(name, id);
                break;
        }
    }
    fromObj(name, obj) {
        switch (obj['$']) {
            case 'sheet':
                this.buildSheet(name, obj);
                break;
        }
    }
    buildSheet(name, obj) {
        let sheet = this.sheets[name];
        if (sheet === undefined)
            sheet = this.newSheet(name, obj.id);
        sheet.build(obj);
    }
    buildFieldTuid(fields, mainFields) {
        if (fields === undefined)
            return;
        for (let f of fields) {
            let { tuid } = f;
            if (tuid === undefined)
                continue;
            let t = this.getTuid(tuid);
            if (t === undefined)
                continue;
            f._tuid = t.buildTuidBox();
        }
        for (let f of fields) {
            let { owner } = f;
            if (owner === undefined)
                continue;
            let ownerField = fields.find(v => v.name === owner);
            if (ownerField === undefined) {
                if (mainFields !== undefined) {
                    ownerField = mainFields.find(v => v.name === owner);
                }
                if (ownerField === undefined) {
                    debugger;
                    throw new Error(`owner field ${owner} is undefined`);
                }
            }
            let { arr, tuid } = f;
            let t = this.getTuid(ownerField._tuid.tuid.name);
            if (t === undefined)
                continue;
            let div = t.div(arr || tuid);
            f._tuid = div && div.buildTuidDivBox(ownerField);
            /*
            if (f._tuid === undefined) {
                debugger;
                throw new Error(`owner field ${owner} is not tuid`);
            }
            */
        }
    }
    buildArrFieldsTuid(arrFields, mainFields) {
        if (arrFields === undefined)
            return;
        for (let af of arrFields) {
            let { fields } = af;
            if (fields === undefined)
                continue;
            this.buildFieldTuid(fields, mainFields);
        }
    }
    pullModify(modifyMax) {
        this.tuidsCache.pullModify(modifyMax);
    }
    getUqKey() {
        let uqKey = this.uqName.split(/[-._]/).join('').toLowerCase();
        return uqKey;
    }
    getUqKeyWithConfig() {
        if (!this.config)
            return;
        let uqKey = this.uqName.split(/[-._]/).join('').toLowerCase();
        let { dev, alias } = this.config;
        uqKey = (0, tool_1.capitalCase)(dev.alias || dev.name) + (0, tool_1.capitalCase)(alias !== null && alias !== void 0 ? alias : uqKey);
        return uqKey;
    }
    hasEntity(name) {
        return this.entities[name] !== undefined
            || this.entities[name.toLowerCase()] !== undefined;
    }
    createProxy() {
        let ret = new Proxy(this.entities, {
            get: (target, key, receiver) => {
                let lk = key.toLowerCase();
                if (lk === '$') {
                    return this.$proxy;
                }
                let ret = target[lk];
                if (ret !== undefined)
                    return ret;
                let func = this[key];
                if (func !== undefined)
                    return func;
                let err = `entity ${this.name}.${String(key)} not defined`;
                console.error('UQ错误：' + err);
                this.showReload('服务器正在更新');
                return undefined;
            }
        });
        this.proxy = ret;
        this.$proxy = new Proxy(this.entities, {
            get: (target, key, receiver) => {
                let lk = key.toLowerCase();
                let ret = target[lk];
                if (ret !== undefined)
                    return ret;
                let func = this['$' + key];
                if (func !== undefined)
                    return func;
                let err = `entity ${this.name}.${String(key)} not defined`;
                console.error('UQ错误：' + err);
                this.showReload('服务器正在更新');
                return undefined;
            }
        });
        this.idCache = new IDCache_1.IDCache(this);
        return ret;
    }
    showReload(msg) {
        let cache = this.localMap.child('$reload-tick');
        let reloadTick = cache.get();
        if (!reloadTick)
            reloadTick = 0;
        console.error(msg);
        this.localMap.removeAll();
        let tick = Date.now();
        cache.set(tick);
        if (tick - reloadTick < 10 * 1000) {
            this.web.showReloadPage(msg);
        }
        else {
            this.web.reload();
        }
    }
    apiPost(api, resultType, apiParam) {
        return __awaiter(this, void 0, void 0, function* () {
            if (resultType === EnumResultType.sql)
                api = 'sql-' + api;
            let ret = yield this.uqApi.post(IDPath(api), apiParam);
            return ret;
        });
    }
    apiActs(param, resultType) {
        return __awaiter(this, void 0, void 0, function* () {
            // 这边的obj属性序列，也许会不一样
            let arr = [];
            let apiParam = {};
            for (let i in param) {
                arr.push(i);
                apiParam[i] = param[i].map(v => {
                    let obj = {};
                    for (let j in v) {
                        let val = v[j];
                        if (typeof val === 'object') {
                            let nv = {};
                            for (let n in val) {
                                let tv = val[n];
                                if (tv && typeof tv === 'object') {
                                    if (n === 'time') {
                                        if (Object.prototype.toString.call(tv) === '[object Date]') {
                                            tv = tv.getTime();
                                        }
                                    }
                                    else {
                                        let id = tv['id'];
                                        tv = id;
                                    }
                                }
                                nv[n] = tv;
                            }
                            obj[j] = nv;
                        }
                        else {
                            obj[j] = val;
                        }
                    }
                    return obj;
                });
            }
            apiParam['$'] = arr;
            let ret = yield this.apiPost('acts', resultType, apiParam);
            return ret;
        });
    }
    apiActIX(param, resultType) {
        return __awaiter(this, void 0, void 0, function* () {
            let { IX, ID, values, IXs } = param;
            let apiParam = {
                IX: entityName(IX),
                ID: entityName(ID),
                IXs: IXs === null || IXs === void 0 ? void 0 : IXs.map((v) => ({ IX: entityName(v.IX), ix: v.ix })),
                values,
            };
            let ret = yield this.apiPost('act-ix', resultType, apiParam);
            return ret;
        });
    }
    apiActIxSort(param, resultType) {
        return __awaiter(this, void 0, void 0, function* () {
            let { IX, ix, id, after } = param;
            let apiParam = {
                IX: entityName(IX),
                ix,
                id,
                after,
            };
            return yield this.apiPost('act-ix-sort', resultType, apiParam);
        });
    }
    apiActDetail(param, resultType) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let { main, detail, detail2, detail3 } = param;
            let postParam = {
                main: {
                    name: entityName(main.ID),
                    value: toScalars(main.value),
                },
                detail: {
                    name: entityName(detail.ID),
                    values: (_a = detail.values) === null || _a === void 0 ? void 0 : _a.map(v => toScalars(v)),
                },
            };
            if (detail2) {
                postParam.detail2 = {
                    name: entityName(detail2.ID),
                    values: (_b = detail2.values) === null || _b === void 0 ? void 0 : _b.map(v => toScalars(v)),
                };
            }
            if (detail3) {
                postParam.detail3 = {
                    name: entityName(detail3.ID),
                    values: (_c = detail3.values) === null || _c === void 0 ? void 0 : _c.map(v => toScalars(v)),
                };
            }
            let ret = yield this.apiPost('act-detail', resultType, postParam);
        });
    }
    apiQueryID(param, resultType) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ID, IX, IDX } = param;
            if (!IDX) {
                IDX = [ID];
            }
            let ret = yield this.apiPost('query-id', resultType, Object.assign(Object.assign({}, param), { ID: entityName(ID), IX: IX === null || IX === void 0 ? void 0 : IX.map(v => entityName(v)), IDX: this.IDXToString(IDX) }));
            return ret;
        });
    }
    apiIDTv(ids, resultType) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.apiPost('id-tv', resultType, ids);
            return ret;
        });
    }
    apiIDNO(param, resultType) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ID, stamp } = param;
            let ret = yield this.apiPost('id-no', resultType, { ID: entityName(ID), stamp });
            return ret;
        });
    }
    apiIDDetailGet(param, resultType) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id, main, detail, detail2, detail3 } = param;
            let ret = yield this.apiPost('id-detail-get', resultType, {
                id,
                main: entityName(main),
                detail: entityName(detail),
                detail2: entityName(detail2),
                detail3: entityName(detail3),
            });
            return ret;
        });
    }
    IDXToString(p) {
        if (Array.isArray(p) === true)
            return p.map(v => entityName(v));
        return entityName(p);
    }
    apiID(param, resultType) {
        return __awaiter(this, void 0, void 0, function* () {
            let { IDX } = param;
            //this.checkParam(null, IDX, null, id, null, page);
            let ret = yield this.apiPost('id', resultType, Object.assign(Object.assign({}, param), { IDX: this.IDXToString(IDX) }));
            return ret;
        });
    }
    apiKeyID(param, resultType) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ID, IDX } = param;
            let ret = yield this.apiPost('key-id', resultType, Object.assign(Object.assign({}, param), { ID: entityName(ID), IDX: IDX === null || IDX === void 0 ? void 0 : IDX.map(v => entityName(v)) }));
            return ret;
        });
    }
    apiIX(param, resultType) {
        return __awaiter(this, void 0, void 0, function* () {
            let { IX, IX1, IDX } = param;
            //this.checkParam(null, IDX, IX, id, null, page);
            let ret = yield this.apiPost('ix', resultType, Object.assign(Object.assign({}, param), { IX: entityName(IX), IX1: entityName(IX1), IDX: IDX === null || IDX === void 0 ? void 0 : IDX.map(v => entityName(v)) }));
            return ret;
        });
    }
    apiIXValues(param, resultType) {
        return __awaiter(this, void 0, void 0, function* () {
            let { IX } = param;
            let ret = yield this.apiPost('ix-values', resultType, Object.assign(Object.assign({}, param), { IX: entityName(IX) }));
            return ret;
        });
    }
    apiIXr(param, resultType) {
        return __awaiter(this, void 0, void 0, function* () {
            let { IX, IX1, IDX } = param;
            //this.checkParam(null, IDX, IX, id, null, page);
            let ret = yield this.apiPost('ixr', resultType, Object.assign(Object.assign({}, param), { IX: entityName(IX), IX1: entityName(IX1), IDX: IDX === null || IDX === void 0 ? void 0 : IDX.map(v => entityName(v)) }));
            return ret;
        });
    }
    apiKeyIX(param, resultType) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ID, IX, IDX } = param;
            //this.checkParam(ID, IDX, IX, null, key, page);
            let ret = yield this.apiPost('key-ix', resultType, Object.assign(Object.assign({}, param), { ID: entityName(ID), IX: entityName(IX), IDX: IDX === null || IDX === void 0 ? void 0 : IDX.map(v => entityName(v)) }));
            return ret;
        });
    }
    apiIDLog(param, resultType) {
        return __awaiter(this, void 0, void 0, function* () {
            let { IDX } = param;
            //this.checkParam(null, IDX, null, id, null, page);
            let ret = yield this.apiPost('id-log', resultType, Object.assign(Object.assign({}, param), { IDX: entityName(IDX) }));
            return ret;
        });
    }
    apiIDSum(param, resultType) {
        return __awaiter(this, void 0, void 0, function* () {
            let { IDX } = param;
            //this.checkParam(null, IDX, null, id, null, page);
            let ret = yield this.apiPost('id-sum', resultType, Object.assign(Object.assign({}, param), { IDX: entityName(IDX) }));
            return ret;
        });
    }
    apiIDinIX(param, resultType) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ID, IX } = param;
            //this.checkParam(null, IDX, null, id, null, page);
            let ret = yield this.apiPost('id-in-ix', resultType, Object.assign(Object.assign({}, param), { ID: entityName(ID), IX: entityName(IX) }));
            return ret;
        });
    }
    apiIDxID(param, resultType) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ID, IX, ID2 } = param;
            //this.checkParam(null, IDX, null, id, null, page);
            let ret = yield this.apiPost('id-x-id', resultType, Object.assign(Object.assign({}, param), { ID: entityName(ID), IX: entityName(IX), ID2: entityName(ID2) }));
            return ret;
        });
    }
    apiIDTree(param, resultType) {
        return __awaiter(this, void 0, void 0, function* () {
            let { ID } = param;
            let ret = yield this.apiPost('id-tree', resultType, Object.assign(Object.assign({}, param), { ID: entityName(ID) }));
            return ret;
        });
    }
}
exports.UqMan = UqMan;
function ids(item) {
    if (!item)
        return;
    let len = item.length;
    if (len <= 1)
        return;
    let ret = [];
    for (let i = 0; i < len - 1; i++)
        ret.push(Number(item[i]));
    return ret;
}
function entityName(entity) {
    if (!entity)
        return;
    if (typeof entity === 'string')
        return entity;
    return entity.name;
}
function toScalars(value) {
    if (!value)
        return value;
    let ret = {};
    for (let i in value) {
        let v = value[i];
        if (typeof v === 'object')
            v = v['id'];
        ret[i] = v;
    }
    return ret;
}
//# sourceMappingURL=uqMan.js.map