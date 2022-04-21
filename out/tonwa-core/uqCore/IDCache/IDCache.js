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
exports.IDCache = void 0;
const maxCacheSize = 1000;
const delayLoad = 30; // 延迟loading的时间
class IDCache {
    constructor(uqMan) {
        this.queue = []; // 每次使用，都排到队头
        this.waitingIds = []; // 等待loading的
        this.timeOut = () => __awaiter(this, void 0, void 0, function* () {
            let waitingIds = this.waitingIds;
            this.waitingIds = [];
            if (waitingIds.length === 0)
                return;
            let values = yield this.TvIdValues(waitingIds);
            for (let val of values) {
                let { id } = val;
                if (waitingIds[0] < 0)
                    id = -id;
                this.cache.set(id, val);
                let index = waitingIds.findIndex(v => v === id);
                if (index >= 0)
                    waitingIds.splice(index, 1);
            }
            for (let id of waitingIds) {
                this.cache.set(id, null);
            }
        });
        this.uqMan = uqMan;
        this.cache = uqMan.tonwa.createObservableMap();
    }
    getValue(id) {
        let ret = this.cache.get(id);
        if (ret === null)
            return;
        if (ret === undefined) {
            this.useId(id);
            return;
        }
        if (typeof ret === 'number')
            return;
        return ret;
    }
    TvIdValues(waitingIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.uqMan.IDTv(waitingIds);
        });
    }
    useId(id) {
        if (!id)
            return;
        if (typeof id !== 'number') {
            console.error('id cache ' + id + ' is not number');
            return;
        }
        if (this.cache.has(id) === true) {
            this.moveToHead(id);
            return;
        }
        clearTimeout(this.timeoutHandler);
        this.timeoutHandler = setTimeout(this.timeOut, delayLoad);
        //this.cache.set(id, 0);
        if (this.waitingIds.findIndex(v => v === id) >= 0) {
            this.moveToHead(id);
            return;
        }
        if (this.queue.length >= maxCacheSize) {
            // 缓冲已满，先去掉最不常用的
            let r = this.queue.shift();
            if (r === id) {
                // 如果移除的，正好是现在用的，则插入
                this.queue.push(r);
                return;
            }
            //let rKey = String(r);
            if (this.cache.has(r) === true) {
                // 如果移除r已经缓存
                this.cache.delete(r);
            }
            else {
                // 如果移除r还没有缓存
                let index = this.waitingIds.findIndex(v => v === r);
                this.waitingIds.splice(index, 1);
            }
        }
        this.waitingIds.push(id);
        this.queue.push(id);
        return;
    }
    moveToHead(id) {
        let index = this.queue.findIndex(v => v === id);
        this.queue.splice(index, 1);
        this.queue.push(id);
    }
    remove(id) {
        this.cache.delete(id);
        let index = this.queue.findIndex(v => v === id);
        this.queue.splice(index, 1);
        //this.localArr.removeItem(id);
    }
    resetCache(id) {
        this.remove(id);
        this.useId(id);
    }
}
exports.IDCache = IDCache;
//# sourceMappingURL=IDCache.js.map