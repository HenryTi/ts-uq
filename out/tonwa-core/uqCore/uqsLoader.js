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
exports.UQsBuildingLoader = exports.UQsLoader = void 0;
const uqsMan_1 = require("./uqsMan");
const tool_1 = require("../tool");
const web_1 = require("../web");
class UQsLoader {
    constructor(tonwa, appConfig) {
        this.isBuildingUQ = false;
        this.appConfig = appConfig;
        this.tonwa = tonwa;
    }
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            let { app, uqs } = this.appConfig;
            let retErrors;
            if (app) {
                retErrors = yield this.loadApp();
            }
            else if (uqs) {
                retErrors = yield this.loadUqs();
            }
            else {
                throw new Error('either uqs or app must be defined in AppConfig');
            }
            return retErrors;
        });
    }
    /*
    async buildUQs(uqsConfig: AppConfig) {
        let {uqs, tvs, version} = uqsConfig;
        let retErrors:string[];
        if (uqs) {
            UQsMan.isBuildingUQ = true;
            retErrors = await this.loadUqs();
        }
        else {
            throw new Error('either uqs or app must be defined in AppConfig');
        }
        return retErrors;
    }
    */
    // 返回 errors, 每个uq一行
    loadApp() {
        return __awaiter(this, void 0, void 0, function* () {
            let { app, uqs: uqConfigs, version } = this.appConfig;
            let { name, dev } = app;
            let uqsManApp = new UQsManApp(this.tonwa, `${dev.name}/${name}`);
            this.uqsMan = uqsManApp;
            let { appOwner, appName, localData } = uqsManApp;
            let uqAppData = localData.get();
            if (!uqAppData || uqAppData.version !== version) {
                uqAppData = yield this.loadUqAppData(appOwner, appName);
                if (!uqAppData.id) {
                    return [
                        `${appOwner}/${appName}不存在。请仔细检查app全名。`
                    ];
                }
                uqAppData.version = version;
                if (uqConfigs) {
                    let data = yield this.loadUqData(uqConfigs);
                    uqAppData.uqs.push(...data);
                }
                localData.set(uqAppData);
                // 
                for (let uq of uqAppData.uqs)
                    uq.newVersion = true;
            }
            let { id, uqs } = uqAppData;
            uqsManApp.id = id;
            return yield this.uqsMan.buildUqs(uqs, version, uqConfigs, this.isBuildingUQ);
        });
    }
    // 返回 errors, 每个uq一行
    loadUqs( /*uqConfigs: UqConfig[], version:string, tvs:TVs*/) {
        return __awaiter(this, void 0, void 0, function* () {
            let { uqs: uqConfigs, version } = this.appConfig;
            this.uqsMan = new uqsMan_1.UQsMan(this.tonwa);
            let uqs = yield this.loadUqData(uqConfigs);
            return yield this.uqsMan.buildUqs(uqs, version, uqConfigs, this.isBuildingUQ);
        });
    }
    loadUqAppData(appOwner, appName) {
        return __awaiter(this, void 0, void 0, function* () {
            let centerAppApi = new web_1.CenterAppApi(this.tonwa.web, 'tv/', undefined);
            let ret = yield centerAppApi.appUqs(appOwner, appName);
            return ret;
        });
    }
    loadUqData(uqConfigs) {
        return __awaiter(this, void 0, void 0, function* () {
            let uqs = uqConfigs.map(v => {
                let { dev, name, version, alias } = v;
                let { name: owner, alias: ownerAlias } = dev;
                return { owner, ownerAlias, name, version, alias };
            });
            let centerAppApi = new web_1.CenterAppApi(this.tonwa.web, 'tv/', undefined);
            let ret = uqs.length === 0 ? [] : yield centerAppApi.uqs(uqs);
            if (ret.length < uqs.length) {
                let err = `下列UQ：\n${uqs.map(v => `${v.owner}/${v.name}`).join('\n')}之一不存在`;
                console.error(err);
                throw Error(err);
            }
            for (let i = 0; i < uqs.length; i++) {
                let { ownerAlias, alias } = uqs[i];
                ret[i].ownerAlias = ownerAlias;
                ret[i].uqAlias = alias;
            }
            return ret;
        });
    }
}
exports.UQsLoader = UQsLoader;
class UQsManApp extends uqsMan_1.UQsMan {
    constructor(tonwa, tonwaAppName) {
        super(tonwa);
        let parts = tonwaAppName.split('/');
        if (parts.length !== 2) {
            throw new Error('tonwaApp name must be / separated, owner/app');
        }
        this.appOwner = parts[0];
        this.appName = parts[1];
        this.localMap = tool_1.env.localDb.map(tonwaAppName);
        this.localData = this.localMap.child('uqData');
    }
}
class UQsBuildingLoader extends UQsLoader {
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            //nav.forceDevelopment = true;
            tool_1.env.isDevelopment = true;
            //await nav.init();
            //await this.tonwa.web.navInit();
            yield this.tonwa.init();
            this.isBuildingUQ = true;
            let { uqs } = this.appConfig;
            let retErrors;
            if (uqs) {
                retErrors = yield this.loadUqs();
            }
            else {
                throw new Error('uqs must be defined in AppConfig');
            }
            return retErrors;
        });
    }
}
exports.UQsBuildingLoader = UQsBuildingLoader;
//# sourceMappingURL=uqsLoader.js.map