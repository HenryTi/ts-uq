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
exports.UQsMan = void 0;
const tool_1 = require("../tool");
const uqMan_1 = require("./uqMan");
/*
export interface TVs {
    [uqName:string]: {
        [tuidName: string]: (values: any) => JSX.Element;
    }
}
*/
class UQsMan {
    constructor(tonwa) {
        this.uqMans = [];
        this.tonwa = tonwa;
        this.web = tonwa.web;
        //this.tvs = tvs || {};
        //this.buildTVs();
        this.uqMans = [];
        this.collection = {};
    }
    buildUqs(uqDataArr, version, uqConfigs, isBuildingUQ) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init(uqDataArr);
            let localMap = tool_1.env.localDb.map('$app');
            let localCacheVersion = localMap.child('version');
            let cacheVersion = localCacheVersion.get();
            if (version !== cacheVersion) {
                for (let uqMan of this.uqMans) {
                    uqMan.localMap.removeAll();
                }
                localCacheVersion.set(version);
            }
            let retErrors = yield this.load();
            if (retErrors.length > 0)
                return retErrors;
            if (isBuildingUQ === false) {
                this.setTuidImportsLocal();
            }
            if (retErrors.length > 0)
                return retErrors;
            if (uqConfigs) {
                for (let uqConfig of uqConfigs) {
                    let { dev, name, alias } = uqConfig;
                    let { name: owner, alias: ownerAlias } = dev;
                    let uqLower = (ownerAlias !== null && ownerAlias !== void 0 ? ownerAlias : owner).toLowerCase() + '/' + (alias !== null && alias !== void 0 ? alias : name).toLowerCase();
                    let uq = this.collection[uqLower];
                    uq.config = uqConfig;
                }
            }
            this.proxy = this.buildUQs();
        });
    }
    uq(uqName) {
        return this.collection[uqName.toLowerCase()];
    }
    getUqUserRoles(uqLower) {
        return __awaiter(this, void 0, void 0, function* () {
            let uqMan = this.collection[uqLower];
            if (uqMan === undefined)
                return null;
            let roles = yield uqMan.getRoles();
            return roles;
        });
    }
    /*
    private buildTVs() {
        if (!this.tvs) return;
        for (let i in this.tvs) {
            let uqTVs = this.tvs[i];
            if (uqTVs === undefined) continue;
            let l = i.toLowerCase();
            if (l === i) continue;
            this.tvs[l] = uqTVs;
            for (let j in uqTVs) {
                let en = uqTVs[j];
                if (en === undefined) continue;
                let lj = j.toLowerCase();
                if (lj === j) continue;
                uqTVs[lj] = en;
            }
        }
    }
    */
    init(uqsData) {
        return __awaiter(this, void 0, void 0, function* () {
            let promiseInits = [];
            for (let uqData of uqsData) {
                let { uqOwner, ownerAlias, uqName, uqAlias } = uqData;
                // 原名加入collection
                let uqFullName = uqOwner + '/' + uqName;
                let uqFull = this.collection[uqFullName];
                let uq;
                if (uqFull) {
                    uq = uqFull;
                }
                else {
                    uq = new uqMan_1.UqMan(this.tonwa, uqData /*, undefined, this.tvs[uqFullName] || this.tvs[uqName]*/);
                    this.collection[uqFullName] = uq;
                    promiseInits.push(uq.init());
                }
                this.uqMans.push(uq);
                let lower = uqFullName.toLowerCase();
                this.collection[lower] = uq;
                // 别名加入collection
                if (uqAlias)
                    uqName = uqAlias;
                if (ownerAlias)
                    uqOwner = ownerAlias;
                uqFullName = uqOwner + '/' + uqName;
                lower = uqFullName.toLowerCase();
                this.collection[lower] = uq;
            }
            yield Promise.all(promiseInits);
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let retErrors = [];
            let promises = [];
            //let lowerUqNames:string[] = [];
            // collection有小写名字，还有正常名字
            //for (let i in this.collection) {
            for (let uqMan of this.uqMans) {
                //let lower = (i as string).toLowerCase();
                //if (lowerUqNames.indexOf(lower) >= 0) continue;
                //lowerUqNames.push(lower);
                //let uq = this.collection[i];
                promises.push(uqMan.loadEntities());
            }
            let results = yield Promise.all(promises);
            for (let result of results) {
                let retError = result; // await cUq.loadSchema();
                if (retError !== undefined) {
                    retErrors.push(retError);
                }
            }
            return retErrors;
        });
    }
    buildUQs() {
        let uqs = {};
        function setUq(uqKey, proxy) {
            if (!uqKey)
                return;
            let lower = uqKey.toLowerCase();
            uqs[uqKey] = proxy;
            if (lower !== uqKey)
                uqs[lower] = proxy;
        }
        for (let uqMan of this.uqMans) {
            let proxy = uqMan.createProxy();
            setUq(uqMan.getUqKey(), proxy);
            setUq(uqMan.getUqKeyWithConfig(), proxy);
            /*
            let uqKey = uqMan.getUqKey();
            let lower = uqKey.toLowerCase();
            uqs[uqKey] = proxy;
            if (lower !== uqKey) uqs[lower] = proxy;
            let uqKeyWithConfig = uqMan.getUqKeyWithConfig();
            let lowerWithConfig = uqKeyWithConfig.toLowerCase();
            uqs[uqKeyWithConfig] = proxy;
            if (lowerWithConfig !== uqKeyWithConfig) uqs[lowerWithConfig] = proxy;
            */
        }
        return new Proxy(uqs, {
            get: (target, key, receiver) => {
                let lk = key.toLowerCase();
                let ret = target[lk];
                if (ret !== undefined)
                    return ret;
                debugger;
                console.error(`controller.uqs.${String(key)} undefined`);
                this.showReload(`新增 uq ${String(key)}`);
                return undefined;
            },
        });
    }
    getUqMans() {
        return this.uqMans;
    }
    showReload(msg) {
        for (let uqMan of this.uqMans) {
            uqMan.localMap.removeAll();
        }
        this.web.showReloadPage(msg);
    }
    setTuidImportsLocal() {
        let ret = [];
        for (let uqMan of this.uqMans) {
            for (let tuid of uqMan.tuidArr) {
                if (tuid.isImport === true) {
                    let error = this.setInner(tuid);
                    if (error)
                        ret.push(error);
                }
            }
        }
        return ret;
    }
    setInner(tuidImport) {
        let { from } = tuidImport;
        let fromName = from.owner + '/' + from.uq;
        let uq = this.collection[fromName];
        if (uq === undefined) {
            //debugger;
            if (tool_1.env.buildingUq === false) {
                console.error(`setInner(tuidImport: TuidImport): uq ${fromName} is not loaded`);
            }
            return;
        }
        let iName = tuidImport.name;
        let tuid = uq.tuid(iName);
        if (tuid === undefined) {
            //debugger;
            return `setInner(tuidImport: TuidImport): uq ${fromName} has no Tuid ${iName}`;
        }
        if (tuid.isImport === true) {
            //debugger;
            return `setInner(tuidImport: TuidImport): uq ${fromName} Tuid ${iName} is import`;
        }
        tuidImport.setFrom(tuid);
    }
}
exports.UQsMan = UQsMan;
//# sourceMappingURL=uqsMan.js.map