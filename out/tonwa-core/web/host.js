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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Host = exports.resUrlFromHost = void 0;
const tool_1 = require("../tool");
const rootCenterHost = 'https://tv.jkchemical.com';
const centerHost = (_a = process.env['REACT_APP_CENTER_HOST']) !== null && _a !== void 0 ? _a : rootCenterHost;
const centerDebugHost = 'localhost:3000'; //'192.168.86.64';
const resHost = centerHost !== null && centerHost !== void 0 ? centerHost : rootCenterHost;
const resDebugHost = 'localhost:3015'; //'192.168.86.63';
const uqDebugHost = 'localhost:3015'; //'192.168.86.63';
const uqDebugBuilderHost = 'localhost:3009';
const hosts = {
    centerhost: {
        value: /*process.env['REACT_APP_CENTER_DEBUG_HOST']*/ undefined || centerDebugHost,
        local: false,
    },
    reshost: {
        value: /*process.env['REACT_APP_RES_DEBUG_HOST']*/ undefined || resDebugHost,
        local: false,
    },
    uqhost: {
        value: /*process.env['REACT_APP_UQ_DEBUG_HOST']*/ undefined || uqDebugHost,
        local: false,
    },
    unitxhost: {
        value: /*process.env['REACT_APP_UQ_DEBUG_HOST']*/ undefined || uqDebugHost,
        local: false,
    },
    "uq-build": {
        value: /*process.env['REACT_APP_UQ_DEBUG_BUILDER_HOST']*/ undefined || uqDebugBuilderHost,
        local: false,
    }
};
const httpArr = ['https://', 'http://'];
function isAbsoluteUrl(url) {
    for (let str of httpArr) {
        if (url.startsWith(str) === true)
            return true;
    }
    return false;
}
function urlFromHost(host) {
    if (isAbsoluteUrl(host) === true) {
        if (host.endsWith('/'))
            return host;
        return host + '/';
    }
    return `http://${host}/`;
}
function centerUrlFromHost(host) {
    return urlFromHost(host);
}
function centerWsFromHost(host) {
    let https = 'https://';
    if (host.startsWith(https) === true) {
        host = host.substr(https.length);
        if (host.endsWith('/') === true)
            host = host.substr(0, host.length - 1);
        return 'wss://' + host + '/tv/';
    }
    return `ws://${host}/tv/`;
}
function resUrlFromHost(host) {
    if (!host)
        return;
    let url = urlFromHost(host);
    return url + 'res/';
}
exports.resUrlFromHost = resUrlFromHost;
const fetchOptions = {
    method: "GET",
    mode: "no-cors", // no-cors, cors, *same-origin
    headers: {
        "Content-Type": "text/plain"
    },
};
class Host {
    start(web, testing) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!centerHost)
                debugger;
            let doc = global.document;
            if (doc) {
                this.hash = doc.location.hash;
            }
            else {
                this.hash = '';
            }
            this.testing = testing;
            if (tool_1.env.isDevelopment === true) {
                yield this.tryLocal(web);
            }
            let host = this.getCenterHost();
            this.url = centerUrlFromHost(host);
            this.ws = centerWsFromHost(host);
            this.resHost = this.getResHost();
        });
    }
    debugHostUrl(host) { return `http://${host}/hello`; }
    tryLocal(web) {
        return __awaiter(this, void 0, void 0, function* () {
            let promises = [];
            let hostArr = [];
            for (let i in hosts) {
                let hostValue = hosts[i];
                let { value } = hostValue;
                if (hostArr.findIndex(v => v === value) < 0)
                    hostArr.push(value);
            }
            for (let host of hostArr) {
                let fetchUrl = this.debugHostUrl(host);
                promises.push(localCheck(web, fetchUrl));
            }
            let results = yield Promise.all(promises);
            let len = hostArr.length;
            for (let i = 0; i < len; i++) {
                let local = results[i];
                let host = hostArr[i];
                for (let j in hosts) {
                    let hostValue = hosts[j];
                    if (hostValue.value === host) {
                        hostValue.local = local;
                    }
                }
            }
        });
    }
    getCenterHost() {
        let { value, local } = hosts.centerhost;
        if (this.hash.includes('sheet_debug') === true) {
            return value;
        }
        if (tool_1.env.isDevelopment === true) {
            if (local === true)
                return value;
        }
        return centerHost;
    }
    getResHost() {
        let { value, local } = hosts.reshost;
        if (this.hash.includes('sheet_debug') === true) {
            return value;
        }
        if (tool_1.env.isDevelopment === true) {
            if (local === true)
                return value;
        }
        return resHost;
    }
    getUrlOrDebug(url, debugHost = 'uqhost') {
        if (tool_1.env.isDevelopment === false)
            return url;
        let host = hosts[debugHost];
        if (host === undefined)
            return url;
        let { value, local } = host;
        if (local === false)
            return url;
        return `http://${value}/`;
    }
    getUrlOrTest(db, url, urlTest) {
        if (!urlTest) {
            urlTest = url;
            if (!urlTest) {
                console.error('no server set for ' + db);
                debugger;
            }
        }
        else if (!url) {
            url = urlTest;
        }
        let testProd;
        if (this.testing === true) {
            if (urlTest !== '-')
                url = urlTest;
            testProd = 'test';
        }
        else {
            testProd = 'prod';
        }
        url = this.getUrlOrDebug(url);
        if (url.endsWith('/') === false) {
            url += '/';
        }
        return `${url}uq/${testProd}/${db}/`;
    }
    localCheck(web, urlDebug) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield localCheck(web, urlDebug);
        });
    }
}
exports.Host = Host;
//export const host:Host = new Host();
// 因为测试的都是局域网服务器，甚至本机服务器，所以一秒足够了
// 网上找了上面的fetch timeout代码。
// 尽管timeout了，fetch仍然继续，没有cancel
// 实际上，一秒钟不够。web服务器会自动停。重启的时候，可能会比较长时间。也许两秒甚至更多。
//const timeout = 2000;
const timeout = 2000;
function fetchLocalCheck(web, url) {
    return new Promise((resolve, reject) => {
        web.fetch(url, fetchOptions)
            .then(v => {
            v.text().then(resolve).catch(reject);
        })
            .catch(reject);
        const e = new Error("Connection timed out");
        tool_1.env.setTimeout('fetchLocalCheck', reject, timeout, e);
    });
}
function localCheck(web, url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fetchLocalCheck(web, url);
            return true;
        }
        catch (err) {
            return false;
        }
    });
}
/*
export interface IUqForChannel {
    uq: string;
    uqVersion: number;
}
*/ 
//# sourceMappingURL=host.js.map