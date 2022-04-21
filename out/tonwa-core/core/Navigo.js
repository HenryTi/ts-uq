"use strict";
// typescript version of krasimir/navigo
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navigo = void 0;
const tool_1 = require("../tool");
class Navigo {
    constructor(r = null, useHash = false, hash = '#') {
        this._routes = [];
        this._onLocationChange = () => {
            console.log('_onLocationChange');
            this.resolve();
        };
        this.root = null;
        this._useHash = useHash;
        this._hash = (!hash) ? '#' : hash;
        this._paused = false;
        this._destroyed = false;
        this._lastRouteResolved = null;
        this._notFoundHandler = null;
        this._defaultHandler = null;
        this._usePushState = !useHash && Navigo.isPushStateAvailable();
        //this._onLocationChange = this._onLocationChange.bind(this);
        this._genericHooks = null;
        this._historyUpdateMethod = 'pushState';
        if (r) {
            this.root = useHash ? r.replace(/\/$/, '/' + this._hash) : r.replace(/\/$/, '');
        }
        else if (useHash) {
            this.root = this._cLoc().split(this._hash)[0].replace(/\/$/, '/' + this._hash);
        }
        this._listen();
        this.updatePageLinks();
    }
    static isPushStateAvailable() {
        let { window } = tool_1.envGlobal;
        return !!(typeof window !== 'undefined' &&
            window.history &&
            window.history.pushState);
    }
    static clean(s) {
        if (s instanceof RegExp)
            return s;
        return Navigo.cleanUrl(s);
    }
    static cleanUrl(s) {
        return s.replace(/\/+$/, '').replace(/^\/+/, '^/');
    }
    static regExpResultToParams(match, names) {
        if (names.length === 0)
            return null;
        if (!match)
            return null;
        return match
            .slice(1, match.length)
            .reduce((params, value, index) => {
            if (params === null)
                params = {};
            params[names[index]] = decodeURIComponent(value);
            return params;
        }, null);
    }
    static replaceDynamicURLParts(route) {
        let paramNames = [], regexp;
        if (route instanceof RegExp) {
            regexp = route;
        }
        else {
            regexp = new RegExp(route.replace(Navigo.PARAMETER_REGEXP, function (full, dots, name) {
                paramNames.push(name);
                return Navigo.REPLACE_VARIABLE_REGEXP;
            })
                .replace(Navigo.WILDCARD_REGEXP, Navigo.REPLACE_WILDCARD) + Navigo.FOLLOWED_BY_SLASH_REGEXP, Navigo.MATCH_REGEXP_FLAGS);
        }
        return { regexp, paramNames };
    }
    static getUrlDepth(url) {
        return url.replace(/\/$/, '').split('/').length;
    }
    static compareUrlDepth(urlA, urlB) {
        return Navigo.getUrlDepth(urlB) - Navigo.getUrlDepth(urlA);
    }
    static findMatchedRoutes(url, routes = []) {
        return routes.map(route => {
            let { regexp, paramNames } = Navigo.replaceDynamicURLParts(Navigo.clean(route.route));
            let match = url.replace(/^\/+/, '/').match(regexp);
            let params = Navigo.regExpResultToParams(match, paramNames);
            return match ? { match, route, params } : false;
        }).filter(m => m);
    }
    static match(url, routes) {
        return Navigo.findMatchedRoutes(url, routes)[0] || false;
    }
    static root(url, routes) {
        const colonExp = RegExp('\\/:\\D(\\w*)', 'g');
        const exp = ''; // '($|\\/)';  // 单\，编译报错 ($|\/)
        let matched = routes.map(route => {
            let r = route.route;
            if (r === '' || r === '*')
                return url;
            if (typeof r === 'string') {
                r = r.replace(colonExp, '\\/(\\w|%|[\u4E00-\u9FCC])+');
            }
            let routeExp = r + exp;
            let ret = url.split(new RegExp(routeExp))[0];
            return ret;
        });
        let fallbackURL = Navigo.cleanUrl(url);
        let len = matched.length;
        if (len === 0)
            return fallbackURL;
        let matched0 = matched[0];
        if (len === 1)
            return matched0;
        return matched.reduce((result, url) => {
            if (result.length > url.length)
                result = url;
            return result;
        }, matched0);
    }
    static isHashChangeAPIAvailable() {
        let { window } = tool_1.envGlobal;
        return typeof window !== 'undefined' && 'onhashchange' in window;
    }
    static extractGETParameters(url) {
        return url.split(/\?(.*)?$/).slice(1).join('');
    }
    static getOnlyURL(url, useHash, hash) {
        let onlyURL = url, split;
        var cleanGETParam = (str) => str.split(/\?(.*)?$/)[0];
        if (typeof hash === 'undefined') {
            // To preserve BC
            hash = '#';
        }
        if (Navigo.isPushStateAvailable() && !useHash) {
            onlyURL = cleanGETParam(url).split(hash)[0];
        }
        else {
            split = url.split(hash);
            onlyURL = split.length > 1 ? cleanGETParam(split[1]) : cleanGETParam(split[0]);
        }
        return onlyURL;
    }
    static manageHooks(handler, hooks, params, exHooks) {
        if (hooks && typeof hooks === 'object') {
            if (hooks.before) {
                hooks.before((shouldRoute = true) => {
                    if (!shouldRoute)
                        return;
                    handler();
                    hooks.after && hooks.after(params);
                }, params);
                return;
            }
            else if (hooks.after) {
                handler();
                hooks.after && hooks.after(params);
                return;
            }
        }
        handler();
    }
    static isHashedRoot(url, useHash, hash) {
        if (Navigo.isPushStateAvailable() && !useHash) {
            return false;
        }
        if (!url.match(hash)) {
            return false;
        }
        let split = url.split(hash);
        return split.length < 2 || split[1] === '';
    }
    navigate(path, absolute = false) {
        let { window } = tool_1.envGlobal;
        let to;
        path = path || '';
        if (this._usePushState) {
            to = (!absolute ? this._getRoot() + '/' : '') + path.replace(/^\/+/, '/');
            to = to.replace(/([^:])(\/{2,})/g, '$1/');
            to = to.replace('/#test/', '/');
            this._historyUpdate({}, '', to);
            this.resolve();
        }
        else if (typeof window !== 'undefined') {
            path = path.replace(new RegExp('^' + this._hash), '');
            let { location } = window;
            location.href = location.href
                .replace(/#$/, '')
                .replace(new RegExp(this._hash + '.*$'), '') + this._hash + path;
        }
        return this;
    }
    on(...args) {
        let arg0 = args[0];
        let arg1 = args[1];
        switch (typeof arg0) {
            case 'function':
                this._defaultHandler = { handler: arg0, hooks: arg1 };
                if (!this._notFoundHandler) {
                    this._notFoundHandler = this._defaultHandler;
                }
                break;
            case 'object':
                let orderedRoutes = Object.keys(arg0).sort(Navigo.compareUrlDepth);
                orderedRoutes.forEach(route => this.on(route, arg0[route]));
                break;
            default:
                if (args.length < 2)
                    break;
                if (arg0 === '/') {
                    this._defaultHandler = {
                        handler: typeof arg1 === 'object' ? arg1.uses : arg1,
                        hooks: args[2],
                    };
                    break;
                }
                this._add(arg0, arg1, args[2]);
                break;
        }
        return this;
    }
    off(handler) {
        if (this._defaultHandler !== null && handler === this._defaultHandler.handler) {
            this._defaultHandler = null;
        }
        else if (this._notFoundHandler !== null && handler === this._notFoundHandler.handler) {
            this._notFoundHandler = null;
        }
        this._routes = this._routes.reduce((result, r) => {
            if (r.handler !== handler)
                result.push(r);
            return result;
        }, []);
        return this;
    }
    notFound(handler, hooks) {
        this._notFoundHandler = { handler, hooks };
        return this;
    }
    resolve(current) {
        let c = current || this._cLoc();
        let root = this._getRoot();
        let url = c.replace(root, '');
        if (this._useHash) {
            const exp = '^\\/'; // 单\，编译报错 ^\/
            url = url.replace(new RegExp(exp + this._hash), '/');
        }
        let GETParameters = Navigo.extractGETParameters(current || this._cLoc());
        let onlyURL = Navigo.getOnlyURL(url, this._useHash, this._hash);
        if (onlyURL.startsWith('/') === false) {
            onlyURL = '/' + onlyURL;
        }
        if (this._paused)
            return false;
        if (this._lastRouteResolved &&
            onlyURL === this._lastRouteResolved.url &&
            GETParameters === this._lastRouteResolved.query) {
            if (this._lastRouteResolved.hooks && this._lastRouteResolved.hooks.already) {
                this._lastRouteResolved.hooks.already(this._lastRouteResolved.params);
            }
            return false;
        }
        let matched = Navigo.match(onlyURL, this._routes);
        let manageHooks = (handler) => {
            Navigo.manageHooks(() => {
                Navigo.manageHooks(() => {
                    this._callLeave();
                    this._lastRouteResolved = {
                        url: onlyURL,
                        query: GETParameters,
                        hooks: handler.hooks
                    };
                    handler.handler(GETParameters);
                }, handler.hooks);
            }, this._genericHooks);
        };
        if (matched === false) {
            if (this._defaultHandler && (onlyURL === '' ||
                onlyURL === '/' ||
                onlyURL === this._hash ||
                Navigo.isHashedRoot(onlyURL, this._useHash, this._hash))) {
                /*
                Navigo.manageHooks(() => {
                    Navigo.manageHooks(() => {
                        this._callLeave();
                        this._lastRouteResolved = {
                            url: onlyURL,
                            query: GETParameters,
                            hooks: this._defaultHandler.hooks
                        };
                        this._defaultHandler.handler(GETParameters);
                    }, this._defaultHandler.hooks);
                }, this._genericHooks);
                */
                manageHooks(this._defaultHandler);
                return true;
            }
            else if (this._notFoundHandler) {
                /*
                Navigo.manageHooks(() => {
                    Navigo.manageHooks(() => {
                        this._callLeave();
                        this._lastRouteResolved = {
                            url: onlyURL,
                            query: GETParameters,
                            hooks: this._notFoundHandler.hooks
                        };
                        this._notFoundHandler.handler(GETParameters);
                    }, this._notFoundHandler.hooks);
                }, this._genericHooks);
                */
                manageHooks(this._notFoundHandler);
            }
            return false;
        }
        let m = matched;
        if (m) {
            this._callLeave();
            this._lastRouteResolved = {
                url: onlyURL,
                query: GETParameters,
                hooks: m.route.hooks,
                params: m.params,
                name: m.route.name
            };
            let handler = m.route.handler;
            Navigo.manageHooks(() => {
                Navigo.manageHooks(() => {
                    m.route.route instanceof RegExp ?
                        handler(...(m.match.slice(1, m.match.length))) :
                        handler(m.params, GETParameters);
                }, m.route.hooks, m.params, this._genericHooks);
            }, this._genericHooks, m.params);
            return m;
        }
    }
    destroy() {
        let { window } = tool_1.envGlobal;
        this._routes = [];
        this._destroyed = true;
        this._lastRouteResolved = null;
        this._genericHooks = null;
        clearTimeout(this.timout);
        if (typeof window !== 'undefined') {
            window.removeEventListener('popstate', this._onLocationChange);
            window.removeEventListener('hashchange', this._onLocationChange);
        }
    }
    updatePageLinks() {
        let { document } = tool_1.envGlobal;
        if (typeof document === 'undefined')
            return;
        this._findLinks().forEach(link => {
            if (!link.hasListenerAttached) {
                link.addEventListener('click', (e) => {
                    // e: React.MouseEvent<HTMLElement>
                    if ((e.ctrlKey || e.metaKey) && e.currentTarget.tagName.toLowerCase() === 'a') {
                        return false;
                    }
                    var location = this.getLinkPath(link);
                    if (!this._destroyed) {
                        e.preventDefault();
                        this.navigate(location.replace(/\/+$/, '').replace(/^\/+/, '/'));
                    }
                });
                link.hasListenerAttached = true;
            }
        });
    }
    generate(name, data = {}) {
        let result = this._routes.reduce((result, route) => {
            if (route.name === name) {
                result = route.route.toString();
                for (let key in data) {
                    result = result.replace(':' + key, data[key]);
                }
            }
            return result;
        }, '');
        return this._useHash ? this._hash + result : result;
    }
    link(path) {
        return this._getRoot() + path;
    }
    pause(status = true) {
        this._paused = status;
        if (status) {
            this._historyUpdateMethod = 'replaceState';
        }
        else {
            this._historyUpdateMethod = 'pushState';
        }
    }
    resume() {
        this.pause(false);
    }
    historyAPIUpdateMethod(value) {
        if (typeof value === 'undefined')
            return this._historyUpdateMethod;
        this._historyUpdateMethod = value;
        return value;
    }
    disableIfAPINotAvailable() {
        if (!Navigo.isPushStateAvailable()) {
            this.destroy();
        }
    }
    lastRouteResolved() {
        return this._lastRouteResolved;
    }
    getLinkPath(link) {
        return link.getAttribute('href');
    }
    hooks(hooks) {
        this._genericHooks = hooks;
    }
    _add(route, handler, hooks) {
        if (typeof route === 'string') {
            route = encodeURI(route);
        }
        this._routes.push(typeof handler === 'object' ?
            {
                route,
                handler: handler.uses,
                name: handler.as,
                hooks: hooks || handler.hooks
            }
            :
                {
                    route,
                    handler,
                    name: undefined,
                    hooks,
                });
        return this._add;
    }
    _historyUpdate(data, title, url) {
        let { window } = tool_1.envGlobal;
        switch (this._historyUpdateMethod) {
            default: throw Error('unknow history method ' + this._historyUpdateMethod);
            case 'pushState':
                window.history.pushState(data, title, url);
                return;
            case 'replaceState':
                window.history.replaceState(data, title, url);
                return;
        }
    }
    _getRoot() {
        if (this.root === null) {
            let cLoc = this._cLoc();
            let cLocRoot = cLoc.split('?')[0];
            this.root = Navigo.root(cLocRoot, this._routes);
        }
        let root = this.root.replace('#test', '');
        return root;
    }
    _listen() {
        let { window } = tool_1.envGlobal;
        if (this._usePushState) {
            window.addEventListener('popstate', this._onLocationChange);
        }
        else if (Navigo.isHashChangeAPIAvailable()) {
            window.addEventListener('hashchange', this._onLocationChange);
        }
        else {
            let cached = this._cLoc();
            let check = () => {
                let current = this._cLoc();
                if (cached !== current) {
                    cached = current;
                    this.resolve();
                }
                if (this.timout)
                    clearTimeout(this.timout);
                this.timout = setTimeout(check, 200);
            };
            check();
        }
    }
    _cLoc() {
        let { window } = tool_1.envGlobal;
        if (typeof window !== 'undefined') {
            //if (typeof window.__NAVIGO_WINDOW_LOCATION_MOCK__ !== 'undefined') {
            //	return window.__NAVIGO_WINDOW_LOCATION_MOCK__;
            //}
            let { href } = window.location;
            return Navigo.cleanUrl(href);
        }
        return '';
    }
    _findLinks() {
        let { document } = tool_1.envGlobal;
        return [].slice.call(document.querySelectorAll('[data-navigo]'));
    }
    _callLeave() {
        const lastRouteResolved = this._lastRouteResolved;
        if (lastRouteResolved) {
            let { params, hooks } = lastRouteResolved;
            if (hooks) {
                if (hooks.leave) {
                    hooks.leave(params);
                }
            }
        }
    }
}
exports.Navigo = Navigo;
Navigo.PARAMETER_REGEXP = /([:*])(\w+)/g;
Navigo.WILDCARD_REGEXP = /\*/g;
Navigo.REPLACE_VARIABLE_REGEXP = '([^\\/]+)'; // 单\，编译错误 ([^\/]+)
Navigo.REPLACE_WILDCARD = `(?:.*)`;
Navigo.FOLLOWED_BY_SLASH_REGEXP = '(?:\\/$|$)'; // 单\，编译错误 (?:\/$|$)
Navigo.MATCH_REGEXP_FLAGS = '';
//# sourceMappingURL=Navigo.js.map