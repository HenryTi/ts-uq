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
exports.TuidBoxDiv = exports.TuidDiv = exports.TuidBox = exports.TuidImport = exports.TuidInner = exports.Tuid = exports.UqTuid = void 0;
const entity_1 = require("../entity");
const caller_1 = require("../caller");
const idCache_1 = require("./idCache");
class UqTuid extends entity_1.Entity {
    constructor() {
        super(...arguments);
        this.typeName = 'tuid';
        this.isImport = false;
    }
    //render: Render<M>;
    setSchema(schema) {
        super.setSchema(schema);
        let { id } = schema;
        this.idName = id;
    }
    buildTuidBox() {
        return new TuidBox(this);
    }
    getIdFromObj(obj) { return obj[this.idName]; }
    stopCache() { this.noCache = true; }
    static idValue(id) {
        let t = typeof id;
        switch (t) {
            default:
                debugger;
                throw new Error('unknown id type: ' + t);
            case 'undefined': return undefined;
            case 'object': return id.id;
            case 'number': return id;
        }
    }
    static equ(id1, ix) {
        if (id1 === undefined || id1 === null)
            return false;
        if (ix === undefined || ix === null)
            return false;
        return Tuid.idValue(id1) === Tuid.idValue(ix);
        /*
        if (typeof id1 === 'object') {
            let id1Id = id1.id;
            return typeof ix === 'object'? id1Id === ix.id : id1Id === ix;
        }
        if (typeof ix === 'object') {
            let id2Id = ix.id;
            return typeof id1 === 'object'? id2Id === id1.id : id2Id === id1;
        }
        return id1 === ix;
        */
    }
    cacheIds() { }
    modifyIds(ids) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.UqTuid = UqTuid;
class Tuid extends UqTuid {
}
exports.Tuid = Tuid;
class TuidInner extends Tuid {
    constructor(uq, name, typeId) {
        super(uq, name, typeId);
        this.idCache = new idCache_1.IdCache(this);
        this.localArr = this.schemaLocal.arr(this.name + '.whole');
        if (uq.newVersion === true)
            this.localArr.removeAll();
    }
    setSchema(schema) {
        super.setSchema(schema);
        let { arrs } = schema;
        if (arrs !== undefined) {
            this.divs = {};
            for (let arr of arrs) {
                let { name } = arr;
                let tuidDiv = new TuidDiv(this.uq, this, name);
                this.divs[name] = tuidDiv;
                tuidDiv.setSchema(arr);
                tuidDiv.buildFieldsTuid();
            }
        }
    }
    getObj(id) {
        let obj = this.valueFromId(id);
        if (obj)
            return obj;
        this.useId(id);
        return { id };
    }
    useId(id, defer) {
        if (this.noCache === true)
            return;
        if (!id)
            return;
        this.idCache.useId(id, defer);
    }
    boxId(id) {
        if (!id)
            return;
        if (typeof id === 'object')
            return id;
        this.useId(id);
        //let {createBoxId} = this.uq;
        //if (!createBoxId) 
        return { id: id };
        //return createBoxId(this, id);
    }
    valueFromId(id) { return this.idCache.getValue(id); }
    resetCache(id) {
        if (typeof id === 'object')
            id = id.id;
        this.idCache.resetCache(id);
    }
    assureBox(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                return;
            if (typeof id === 'object')
                id = id.id;
            yield this.idCache.assureObj(id);
            return this.idCache.getValue(id);
        });
    }
    cacheIds() {
        this.idCache.cacheIds();
        if (this.divs === undefined)
            return;
        for (let i in this.divs)
            this.divs[i].cacheIds();
    }
    modifyIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.idCache.modifyIds(ids);
        });
    }
    cacheTuids(defer) { this.uq.cacheTuids(defer); }
    get hasDiv() { return this.divs !== undefined; }
    div(name) {
        return this.divs && this.divs[name];
    }
    loadValuesFromIds(divName, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield new IdsCaller(this, { divName: divName, ids: ids }, undefined, false).request();
            return ret;
        });
    }
    loadMain(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof id === 'object')
                id = id.id;
            yield this.idCache.assureObj(id);
            return this.idCache.valueFromId(id);
        });
    }
    load(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id === undefined || id === 0)
                return;
            //let cacheValue = this.idCache.valueFromId(id); 
            //if (typeof cacheValue === 'object') return cacheValue;
            if (typeof id === 'object')
                id = id.id;
            let valuesText = undefined; //this.localArr.getItem(id);
            let values;
            if (valuesText) {
                values = JSON.parse(valuesText);
            }
            else {
                values = yield new GetCaller(this, id).request();
                if (values !== undefined) {
                    // this.localArr.setItem(id, JSON.stringify(values));
                }
            }
            if (values === undefined)
                return;
            for (let f of this.schema.fields) {
                let { tuid } = f;
                if (tuid === undefined)
                    continue;
                let t = this.uq.getTuid(tuid);
                if (t === undefined)
                    continue;
                let n = f.name;
                values[n] = t.boxId(values[n]);
            }
            this.idCache.cacheValue(values);
            this.cacheTuidFieldValues(values);
            return values;
        });
    }
    cacheTuidFieldValues(values) {
        let { fields, arrs } = this.schema;
        this.cacheFieldsInValue(values, fields);
        if (arrs !== undefined) {
            for (let arr of arrs) {
                let { name, fields } = arr;
                let arrValues = values[name];
                if (arrValues === undefined)
                    continue;
                let tuidDiv = this.div(name);
                for (let row of arrValues) {
                    //row._$tuid = tuidDiv;
                    //row.$owner = this.boxId(row.owner);
                    tuidDiv.cacheValue(row);
                    this.cacheFieldsInValue(row, fields);
                }
            }
        }
    }
    buildFieldsTuid() {
        super.buildFieldsTuid();
        let { mainFields, $create, $update, stampOnMain } = this.schema;
        if (mainFields === undefined)
            debugger;
        this.cacheFields = mainFields || this.fields;
        if (stampOnMain === true) {
            if ($create === true)
                this.cacheFields.push({ name: '$create', type: 'timestamp', _tuid: undefined });
            if ($update === true)
                this.cacheFields.push({ name: '$update', type: 'timestamp', _tuid: undefined });
        }
        this.uq.buildFieldTuid(this.cacheFields);
    }
    unpackTuidIds(values) {
        return this.unpackTuidIdsOfFields(values, this.cacheFields);
    }
    save(id, props) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield new SaveCaller(this, { id: id, props: props }).request();
            if (id !== undefined) {
                this.idCache.remove(id);
                this.localArr.removeItem(id);
            }
            return ret;
        });
    }
    saveProp(id, prop, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new SavePropCaller(this, { id, prop, value }).request();
            this.idCache.remove(id);
            yield this.idCache.assureObj(id);
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield new AllCaller(this, {}).request();
            return ret;
        });
    }
    search(key, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.searchArr(undefined, key, pageStart, pageSize);
            return ret;
        });
    }
    searchArr(owner, key, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            //let api = this.uqApi;
            //let ret = await api.tuidSearch(this.name, undefined, owner, key, pageStart, pageSize);
            let params = { arr: undefined, owner: owner, key: key, pageStart: pageStart, pageSize: pageSize };
            let ret = yield new SearchCaller(this, params).request();
            let { fields } = this.schema;
            for (let row of ret) {
                this.cacheFieldsInValue(row, fields);
            }
            return ret;
        });
    }
    loadArr(arr, owner, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id === undefined || id === 0)
                return;
            //let api = this.uqApi;
            //return await api.tuidArrGet(this.name, arr, owner, id);
            return yield new LoadArrCaller(this, { arr: arr, owner: owner, id: id }).request();
        });
    }
    saveArr(arr, owner, id, props) {
        return __awaiter(this, void 0, void 0, function* () {
            //let params = _.clone(props);
            //params["$id"] = id;
            //return await this.uqApi.tuidArrSave(this.name, arr, owner, params);
            return yield new SaveArrCaller(this, { arr: arr, owner: owner, id: id, props: props }).request();
        });
    }
    posArr(arr, owner, id, order) {
        return __awaiter(this, void 0, void 0, function* () {
            //return await this.uqApi.tuidArrPos(this.name, arr, owner, id, order);
            return yield new ArrPosCaller(this, { arr: arr, owner: owner, id: id, order: order }).request();
        });
    }
    no() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new TuidNoCaller(this, undefined).request();
        });
    }
}
exports.TuidInner = TuidInner;
class TuidCaller extends caller_1.EntityCaller {
    get entity() { return this._entity; }
    ;
}
// 包含main字段的load id
// 当前为了兼容，先调用的包含所有字段的内容
class GetCaller extends TuidCaller {
    constructor() {
        super(...arguments);
        this.method = 'GET';
    }
    get path() { return `tuid/${this.entity.name}/${this.params}`; }
}
class IdsCaller extends TuidCaller {
    get path() {
        let { divName } = this.params;
        return `tuidids/${this.entity.name}/${divName !== undefined ? divName : '$'}`;
    }
    buildParams() { return this.params.ids; }
    xresult(res) {
        return res.split('\n');
    }
}
class SaveCaller extends TuidCaller {
    get path() { return `tuid/${this.entity.name}`; }
    buildParams() {
        let { fields, arrs } = this.entity.schema;
        let { id, props } = this.params;
        let params = { $id: id };
        this.transParams(params, props, fields);
        if (arrs !== undefined) {
            for (let arr of arrs) {
                let arrName = arr.name;
                let arrParams = [];
                let arrFields = arr.fields;
                let arrValues = props[arrName];
                if (arrValues !== undefined) {
                    for (let arrValue of arrValues) {
                        let row = {};
                        this.transParams(row, arrValue, arrFields);
                        arrParams.push(row);
                    }
                }
                params[arrName] = arrParams;
            }
        }
        return params;
    }
    transParams(values, params, fields) {
        if (params === undefined)
            return;
        for (let field of fields) {
            let { name, tuid, type } = field;
            let val = params[name];
            if (tuid !== undefined) {
                if (typeof val === 'object') {
                    if (val !== null)
                        val = val.id;
                }
            }
            else {
                switch (type) {
                    case 'date':
                        val = this.entity.buildDateParam(val);
                        break;
                    case 'datetime':
                        val = this.entity.buildDateTimeParam(val);
                        break;
                }
            }
            values[name] = val;
        }
    }
}
class SearchCaller extends TuidCaller {
    get path() { return `tuids/${this.entity.name}`; }
}
class AllCaller extends TuidCaller {
    constructor() {
        super(...arguments);
        this.method = 'GET';
    }
    get path() { return `tuid-all/${this.entity.name}`; }
}
class LoadArrCaller extends TuidCaller {
    constructor() {
        super(...arguments);
        this.method = 'GET';
    }
    get path() {
        let { arr, owner, id } = this.params;
        return `tuid-arr/${this.entity.name}/${owner}/${arr}/${id}`;
    }
}
class SavePropCaller extends TuidCaller {
    get path() { return `tuid-prop/${this.entity.name}/`; }
}
class SaveArrCaller extends TuidCaller {
    get path() {
        let { arr, owner } = this.params;
        return `tuid-arr/${this.entity.name}/${owner}/${arr}/`;
    }
    buildParams() {
        let { id, props } = this.params;
        let params = Object.assign({}, props);
        params['$id'] = id;
        return params;
    }
}
class ArrPosCaller extends TuidCaller {
    get path() {
        let { arr, owner } = this.params;
        return `tuid-arr-pos/${this.entity.name}/${owner}/${arr}/`;
    }
    buildParams() {
        let { id, order } = this.params;
        return { bid: id, $order: order };
    }
}
class TuidNoCaller extends TuidCaller {
    get path() {
        return `tuid-no/${this.entity.name}/`;
    }
    buildParams() {
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let date = d.getDate();
        return { year, month, date };
    }
}
class TuidImport extends Tuid {
    constructor(uq, name, typeId, from) {
        super(uq, name, typeId);
        this.isImport = true;
        this.from = from;
    }
    setFrom(tuidLocal) { this.tuidLocal = tuidLocal; }
    getObj(id) { var _a; return (_a = this.tuidLocal) === null || _a === void 0 ? void 0 : _a.getObj(id); }
    /*
    tv(id:number, render?:Render<any>):JSX.Element {
        return this.tuidLocal?.tv(id, render);
    }
    */
    useId(id) { var _a; (_a = this.tuidLocal) === null || _a === void 0 ? void 0 : _a.useId(id); }
    boxId(id) {
        var _a;
        if (!this.tuidLocal)
            debugger;
        return (_a = this.tuidLocal) === null || _a === void 0 ? void 0 : _a.boxId(id);
    }
    valueFromId(id) { var _a; return (_a = this.tuidLocal) === null || _a === void 0 ? void 0 : _a.valueFromId(id); }
    resetCache(id) {
        var _a;
        (_a = this.tuidLocal) === null || _a === void 0 ? void 0 : _a.resetCache(id);
    }
    assureBox(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tuidLocal.assureBox(id);
            return this.tuidLocal.valueFromId(id);
        });
    }
    get hasDiv() { var _a; return (_a = this.tuidLocal) === null || _a === void 0 ? void 0 : _a.hasDiv; }
    div(name) { var _a; return (_a = this.tuidLocal) === null || _a === void 0 ? void 0 : _a.div(name); }
    loadMain(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.tuidLocal.loadMain(id);
            return ret;
        });
    }
    load(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tuidLocal.load(id);
        });
    }
    save(id, props) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tuidLocal.save(id, props);
        });
    }
    saveProp(id, prop, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tuidLocal.saveProp(id, prop, value);
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tuidLocal.all();
        });
    }
    search(key, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tuidLocal.search(key, pageStart, pageSize);
        });
    }
    searchArr(owner, key, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tuidLocal.searchArr(owner, key, pageStart, pageSize);
        });
    }
    loadArr(arr, owner, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tuidLocal.loadArr(arr, owner, id);
        });
    }
    saveArr(arr, owner, id, props) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tuidLocal.saveArr(arr, owner, id, props);
        });
    }
    posArr(arr, owner, id, order) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tuidLocal.posArr(arr, owner, id, order);
        });
    }
    no() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tuidLocal.no();
        });
    }
}
exports.TuidImport = TuidImport;
// field._tuid 用这个接口
// Tuid, TuidDiv 实现这个接口
class TuidBox {
    constructor(tuid) {
        this.ownerField = undefined;
        this.tuid = tuid;
    }
    boxId(id) {
        return this.tuid.boxId(id);
    }
    getIdFromObj(obj) {
        return this.tuid.getIdFromObj(obj);
    }
    useId(id) {
        return this.tuid.useId(id);
    }
    showInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('showInfo not implemented');
        });
    }
}
exports.TuidBox = TuidBox;
class TuidDiv extends TuidInner {
    constructor(uq, tuid, name) {
        super(uq, name, 0);
        this.typeName = 'div';
        this.tuid = tuid;
        this.idName = 'id';
        this.idCache = new idCache_1.IdDivCache(tuid, this);
    }
    get owner() { return this.tuid; }
    buildFieldsTuid() {
        super.buildFieldsTuid();
        let { mainFields } = this.schema;
        if (mainFields === undefined)
            debugger;
        this.uq.buildFieldTuid(this.cacheFields = mainFields);
    }
    buildTuidDivBox(ownerField) {
        return new TuidBoxDiv(this.tuid, this, ownerField);
    }
    getIdFromObj(obj) { return obj[this.idName]; }
    cacheValue(value) {
        this.idCache.cacheValue(value);
    }
    useId(id, defer) {
        if (this.noCache === true)
            return;
        this.idCache.useId(id, defer);
    }
    valueFromId(id) {
        return this.idCache.getValue(id);
    }
    assureBox(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.idCache.assureObj(id);
            return this.idCache.getValue(id);
        });
    }
    cacheIds() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.idCache.cacheIds();
        });
    }
    cacheTuidFieldValues(values) {
        let fields = this.schema.fields;
        this.cacheFieldsInValue(values, fields);
    }
    unpackTuidIds(values) {
        return this.unpackTuidIdsOfFields(values, this.cacheFields);
    }
}
exports.TuidDiv = TuidDiv;
class TuidBoxDiv extends TuidBox {
    constructor(tuid, div, ownerField) {
        super(tuid);
        this.div = div;
        this.ownerField = ownerField;
    }
    boxId(id) {
        return this.div.boxId(id);
    }
    getIdFromObj(obj) {
        return this.div.getIdFromObj(obj);
    }
    useId(id) {
        return this.div.useId(id);
    }
}
exports.TuidBoxDiv = TuidBoxDiv;
//# sourceMappingURL=tuid.js.map