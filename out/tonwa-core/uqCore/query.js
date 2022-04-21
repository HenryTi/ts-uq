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
exports.Query = exports.UqQuery = void 0;
const entity_1 = require("./entity");
const caller_1 = require("./caller");
class UqQuery extends entity_1.Entity {
    get typeName() { return 'query'; }
    setSchema(schema) {
        super.setSchema(schema);
        let { returns } = schema;
        this.returns = returns;
        this.isPaged = returns && returns.find(v => v.name === '$page') !== undefined;
    }
    /*
    resetPage(size:number, params:any) {
        this.pageStart = undefined;
        this.pageSize = size;
        this.params = params;
        this.more = false;
        //this.list = undefined;
    }
    */
    //get hasMore() {return this.more;}
    /*
    async loadPage():Promise<void> {
        if (this.pageSize === undefined) {
            throw new Error('call resetPage(size:number, params:any) first');
        }
        let pageStart:any;
        if (this.pageStart !== undefined) {
            switch (this.startField.type) {
                default: pageStart = this.pageStart; break;
                case 'date':
                case 'time':
                case 'datetime': pageStart = (this.pageStart as Date).getTime(); break;
            }
        }
        let ret = await this.page(this.params, pageStart, this.pageSize+1);
        let page = (ret as any).$page;
        this.list = observable.array([], {deep: false});
        if (page !== undefined) {
            if (page.length > this.pageSize) {
                this.more = true;
                page.pop();
                let ret = this.returns.find(r => r.name === '$page');
                this.startField = ret.fields[0];
                this.pageStart = page[page.length-1][this.startField.name];
            }
            else {
                this.more = false;
            }
            this.list.push(...page);
        }
    }
    */
    pageCaller(params, $$user = undefined, showWaiting = true) {
        return new caller_1.QueryPageCaller(this, params, $$user, showWaiting);
    }
    page(params, pageStart, pageSize, $$user = undefined, showWaiting = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let p = { pageStart, pageSize, params };
            let res = yield this.pageCaller(p, $$user, showWaiting).request();
            return res;
        });
    }
    queryCaller(params, $$user = undefined, showWaiting = true) {
        return new caller_1.QueryQueryCaller(this, params, $$user, showWaiting);
    }
    query(params, $$user = undefined, showWaiting = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.queryCaller(params, $$user, showWaiting).request();
            return res;
        });
    }
    table(params, $$user = undefined, showWaiting = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.query(params, $$user, showWaiting);
            for (let i in ret) {
                return ret[i];
            }
        });
    }
    obj(params, $$user = undefined, showWaiting = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.table(params, $$user, showWaiting);
            if (ret.length > 0)
                return ret[0];
        });
    }
    scalar(params, $$user = undefined, showWaiting = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.obj(params, $$user, showWaiting);
            for (let i in ret)
                return ret[i];
        });
    }
}
exports.UqQuery = UqQuery;
class Query extends UqQuery {
}
exports.Query = Query;
//# sourceMappingURL=query.js.map