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
exports.UqHttpChannel = exports.CenterHttpChannel = exports.HttpChannel = void 0;
const tool_1 = require("../tool");
/*
export async function httpGet(url:string, params?:any):Promise<any> {
    let channel = new HttpChannel(false, url, undefined, undefined);
    let ret = await channel.get('', params);
    return ret;
}

export async function httpPost(url:string, params?:any):Promise<any> {
    let channel = new HttpChannel(false, url, undefined, undefined);
    let ret = await channel.post('', params);
    return ret;
}
*/
const methodsWithBody = ['POST', 'PUT'];
class HttpChannel {
    constructor(web, hostUrl, apiToken, ui) {
        this.startWait = (waiting) => {
            if (waiting === true) {
                if (this.ui !== undefined)
                    this.ui.startWait();
            }
        };
        this.endWait = (url, reject) => {
            if (this.ui !== undefined)
                this.ui.endWait();
            if (reject !== undefined)
                reject(url);
        };
        this.showError = (error) => __awaiter(this, void 0, void 0, function* () {
            if (this.ui !== undefined)
                yield this.ui.showError(error);
        });
        this.web = web;
        this.hostUrl = hostUrl;
        this.apiToken = apiToken;
        this.ui = ui;
        this.timeout = tool_1.env.isDevelopment === true ? 30000 : 50000;
    }
    used() {
        this.post('', {});
    }
    xcall(urlPrefix, caller) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = this.buildOptions();
            let { headers, path, method } = caller;
            if (headers !== undefined) {
                let h = options.headers;
                for (let i in headers) {
                    //h.append(i, encodeURI(headers[i]));
                    h[i] = encodeURI(headers[i]);
                }
            }
            options.method = method;
            let p = caller.buildParams();
            if (methodsWithBody.indexOf(method) >= 0 && p !== undefined) {
                options.body = JSON.stringify(p);
            }
            return yield this.innerFetch(urlPrefix + path, options, caller.waiting);
        });
    }
    innerFetchResult(url, options, waiting) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.innerFetch(url, options, waiting);
            return ret.res;
        });
    }
    get(url_1) {
        return __awaiter(this, arguments, void 0, function* (url, params = undefined, waiting) {
            if (params) {
                let keys = Object.keys(params);
                if (keys.length > 0) {
                    let c = '?';
                    for (let k of keys) {
                        let v = params[k];
                        if (v === undefined)
                            continue;
                        url += c + k + '=' + params[k];
                        c = '&';
                    }
                }
            }
            let options = this.buildOptions();
            options.method = 'GET';
            return yield this.innerFetchResult(url, options, waiting);
        });
    }
    post(url, params, waiting) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = this.buildOptions();
            options.method = 'POST';
            options.body = JSON.stringify(params);
            return yield this.innerFetchResult(url, options, waiting);
        });
    }
    put(url, params, waiting) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = this.buildOptions();
            options.method = 'PUT';
            options.body = JSON.stringify(params);
            return yield this.innerFetchResult(url, options, waiting);
        });
    }
    delete(url, params, waiting) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = this.buildOptions();
            options.method = 'DELETE';
            options.body = JSON.stringify(params);
            return yield this.innerFetchResult(url, options, waiting);
        });
    }
    fetch(url, options, waiting, resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            let that = this;
            this.startWait(waiting);
            let path = url;
            function buildError(err, ex) {
                switch (typeof err) {
                    case 'string':
                        if (ex !== undefined)
                            err += ' ' + ex;
                        break;
                    case 'object':
                        let keys = Object.keys(err);
                        let retErr = {
                            ex: ex,
                        };
                        for (let key of keys) {
                            retErr[key] = err[key];
                        }
                        err = retErr;
                        break;
                }
                return {
                    channel: that,
                    url: path,
                    options: options,
                    resolve: resolve,
                    reject: reject,
                    error: err,
                };
            }
            try {
                console.log('%s-%s %s', options.method, path, options.body || '');
                let now = Date.now();
                let timeOutHandler = tool_1.env.setTimeout(undefined, //'httpChannel.fetch',
                () => {
                    that.endWait(`webapi timeout: ${(Date.now() - now)}ms ${url}`, reject);
                }, this.timeout);
                let res = yield this.web.fetch(encodeURI(path), options);
                if (res.ok === false) {
                    tool_1.env.clearTimeout(timeOutHandler);
                    console.log('ok false endWait');
                    that.endWait();
                    console.log('call error %s', res.statusText);
                    throw res.statusText;
                }
                let ct = res.headers.get('content-type');
                if (ct && ct.indexOf('json') >= 0) {
                    return res.json().then((retJson) => __awaiter(this, void 0, void 0, function* () {
                        tool_1.env.clearTimeout(timeOutHandler);
                        that.endWait();
                        if (retJson.ok === true) {
                            if (typeof retJson !== 'object') {
                                debugger;
                            }
                            else if (Array.isArray(retJson) === true) {
                                debugger;
                            }
                            return resolve(retJson);
                        }
                        let retError = retJson.error;
                        if (retError === undefined) {
                            yield that.showError(buildError('not valid tonwa json'));
                        }
                        else {
                            yield that.showError(buildError(retError, 'retJson.error'));
                            reject(retError);
                        }
                    })).catch((error) => __awaiter(this, void 0, void 0, function* () {
                        yield that.showError(buildError(error, 'catch res.json()'));
                    }));
                }
                else {
                    let text = yield res.text();
                    tool_1.env.clearTimeout(timeOutHandler);
                    console.log('text endWait');
                    that.endWait();
                    resolve(text);
                }
            }
            catch (error) {
                this.endWait(url, reject);
                if (typeof error === 'string') {
                    let err = error.toLowerCase();
                    if (err.startsWith('unauthorized') === true || err.startsWith('$roles') === true) {
                        this.web.logout();
                        return;
                    }
                }
                console.error('fecth error (no nav.showError): ' + url);
            }
            ;
        });
    }
    callFetch(url, method, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = this.buildOptions();
            options.method = method;
            options.body = body;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield this.fetch(url, options, true, resolve, reject);
            }));
        });
    }
    //private buildOptions(): {method:string; headers:Headers; body:any} {
    buildOptions() {
        let headers = this.buildHeaders();
        let options = {
            headers: headers,
            method: undefined,
            body: undefined,
            // cache: 'no-cache',
        };
        return options;
    }
    /*
    protected buildHeaders():Headers {
        let {language, culture} = nav;
        let headers = new Headers();
        //headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        let lang = language;
        if (culture) lang += '-' + culture;
        headers.append('Accept-Language', lang);
        if (this.apiToken) {
            headers.append('Authorization', this.apiToken);
        }
        return headers;
    }
    */
    buildHeaders() {
        let { language, culture } = this.web;
        let headers = {}; //new Headers();
        //headers.append('Access-Control-Allow-Origin', '*');
        //headers.append('Content-Type', 'application/json;charset=UTF-8');
        headers['Content-Type'] = 'application/json;charset=UTF-8';
        let lang = language;
        if (culture)
            lang += '-' + culture;
        //headers.append('Accept-Language', lang);
        headers['Accept-Language'] = lang;
        if (this.apiToken) {
            //headers.append('Authorization', this.apiToken); 
            headers['Authorization'] = this.apiToken;
        }
        return headers;
    }
}
exports.HttpChannel = HttpChannel;
class CenterHttpChannel extends HttpChannel {
    innerFetch(url, options, waiting) {
        return __awaiter(this, void 0, void 0, function* () {
            let u = this.hostUrl + url;
            let { appBridge } = this.web;
            if (this.apiToken === undefined && appBridge.isBridged())
                return yield appBridge.bridgeCenterApi(u, options.method, options.body);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield this.fetch(u, options, waiting, resolve, reject);
            }));
        });
    }
}
exports.CenterHttpChannel = CenterHttpChannel;
class UqHttpChannel extends HttpChannel {
    innerFetch(url, options, waiting) {
        return __awaiter(this, void 0, void 0, function* () {
            let u = this.hostUrl + url;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield this.fetch(u, options, waiting, resolve, reject);
            }));
        });
    }
}
exports.UqHttpChannel = UqHttpChannel;
//# sourceMappingURL=httpChannel.js.map