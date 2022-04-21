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
exports.Tonwa = exports.TonwaBase = exports.tonwa = void 0;
const Navigo_1 = require("./Navigo");
const tool_1 = require("../tool");
const tool_2 = require("../tool");
let logMark;
const logs = [];
class TonwaBase {
    constructor() {
        this.testing = false;
        this.web = this.createWeb();
    }
    getLocalGuest() { return undefined; }
    setLocalGuest(guest) { }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.testing = tool_1.env.testing;
            yield this.web.start(this.testing);
            if (this.forceDevelopment === true) {
                tool_1.env.isDevelopment = true;
            }
            let { url, ws, resHost } = this.web.host;
            this.resUrl = this.web.resUrlFromHost(resHost);
            this.wsHost = ws;
            this.web.setCenterUrl(url);
            let guest = this.getLocalGuest();
            if (guest === undefined) {
                guest = yield this.web.guestApi.guest();
            }
            if (!guest) {
                debugger;
                throw Error('guest can not be undefined');
            }
            this.setGuest(guest);
        });
    }
    setGuest(guest) {
        this.setLocalGuest(guest);
        this.web.setNetToken(0, guest.token);
    }
}
exports.TonwaBase = TonwaBase;
class Tonwa extends TonwaBase {
    constructor() {
        super();
        this.local = new tool_1.LocalData();
        this.user = null;
        this.arrs = ['/test', '/test/'];
        this.reloadUser = () => {
            let user = this.local.user.get();
            let curUser = this.user;
            if (!user && !curUser)
                return;
            if ((user === null || user === void 0 ? void 0 : user.id) === (curUser === null || curUser === void 0 ? void 0 : curUser.id))
                return;
            if (!user) {
                this.logout();
            }
            else {
                this.logined(user);
            }
        };
        this.reload = () => __awaiter(this, void 0, void 0, function* () {
            let { navigator, window } = tool_2.envGlobal;
            let waiting = new Promise((resolve, reject) => {
                setTimeout(resolve, 100);
            });
            if ('serviceWorker' in navigator) {
                let registration = yield Promise.race([waiting, navigator.serviceWorker.ready]);
                if (registration)
                    registration.unregister();
            }
            window.document.location.reload();
            // dcloud hbuilder里面的app自动升级，需要清webview的缓存
            let plus = window.plus;
            if (plus) {
                let webview = plus.webview;
                if (webview) {
                    if (webview.reload)
                        webview.reload(true);
                }
                else {
                    let webView = plus.webView;
                    if (webView) {
                        if (webView.reload)
                            webView.reload(true);
                    }
                }
                //plus.webview.reload(true)
            }
        });
        this.navLogin = (params) => __awaiter(this, void 0, void 0, function* () {
            this.showLogin((user) => __awaiter(this, void 0, void 0, function* () { return tool_2.envGlobal.window.history.back(); }), false);
        });
        this.navLogout = (params) => __awaiter(this, void 0, void 0, function* () {
            this.showLogout(() => __awaiter(this, void 0, void 0, function* () { return tool_2.envGlobal.window.history.back(); }));
        });
        this.navRegister = (params) => __awaiter(this, void 0, void 0, function* () {
            this.showRegister();
        });
        this.navForget = (params) => __awaiter(this, void 0, void 0, function* () {
            this.showForget();
        });
        this.doneSysRoutes = false;
        this.sysRoutes = {
            '/login': this.navLogin,
            '/logout': this.navLogout,
            '/register': this.navRegister,
            '/forget': this.navForget,
        };
        exports.tonwa = this;
    }
    getLocalGuest() {
        return this.local.guest.get();
    }
    setLocalGuest(guest) {
        this.local.guest.set(guest);
    }
    //abstract clear(): void;
    get guest() {
        let guest = this.local.guest;
        if (guest === undefined)
            return 0;
        let g = guest.get();
        if (g === undefined)
            return 0;
        return g.guest;
    }
    onReceive(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            //if (this.ws === undefined) return;
            yield this.web.messageHub.dispatch(msg);
        });
    }
    setSettings(settings) {
        let { document } = tool_2.envGlobal;
        this.navSettings = settings;
        let { htmlTitle } = settings;
        if (htmlTitle) {
            document.title = htmlTitle;
        }
        let html = document.getElementsByTagName('html');
        let html0 = html[0];
        if (html0) {
            let version = html0 === null || html0 === void 0 ? void 0 : html0.getAttribute('data-version');
            if (version) {
                //appConfig.version = version;
            }
        }
    }
    get oem() {
        return this.navSettings && this.navSettings.oem;
    }
    unitJsonPath() {
        let { document } = tool_2.envGlobal;
        let { origin, pathname } = document.location;
        pathname = pathname.toLowerCase();
        for (let item of this.arrs) {
            if (pathname.endsWith(item) === true) {
                pathname = pathname.substr(0, pathname.length - item.length);
                break;
            }
        }
        if (pathname.endsWith('/') === true || pathname.endsWith('\\') === true) {
            pathname = pathname.substr(0, pathname.length - 1);
        }
        return origin + pathname + '/unit.json';
    }
    init() {
        const _super = Object.create(null, {
            init: { get: () => super.init }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.init.call(this);
        });
    }
    appStart(notLogined, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            //if (this.appStarted === true) return;
            //this.appStarted = true;
            this.notLogined = notLogined;
            this.userPassword = userPassword;
            yield this.init();
            yield this.start();
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { window, document } = tool_2.envGlobal;
                this.beforeStart();
                if (tool_1.env.isMobile === true) {
                    document.onselectstart = function () { return false; };
                    document.oncontextmenu = function () { return false; };
                }
                this.nav.clear();
                this.nav.startWait();
                let user = this.local.user.get();
                if (user === undefined) {
                    //throw new Error('user logout to be implemented');
                    //let {userPassword} = this.navView.props;
                    if (this.userPassword) {
                        let ret = yield this.userPassword();
                        if (ret) {
                            let { user: userName, password } = ret;
                            let logindUser = yield this.web.userApi.login({
                                user: userName,
                                pwd: password,
                                guest: this.guest,
                            });
                            user = logindUser;
                        }
                    }
                    if (user === undefined) {
                        //let {notLogined} = this.navView.props;
                        if (this.notLogined !== undefined) {
                            yield this.notLogined();
                        }
                        else {
                            yield this.showLogin(undefined);
                            //nav.navigateToLogin();
                        }
                        return;
                    }
                }
                yield this.logined(user);
            }
            catch (err) {
                console.error(err);
                debugger;
            }
            finally {
                this.nav.endWait();
            }
        });
    }
    resolveRoute() {
        //if (this.isRouting === false) return;
        if (this.navigo === undefined)
            return;
        this.navigo.resolve();
    }
    on(...args) {
        if (this.navigo === undefined) {
            this.navigo = new Navigo_1.Navigo();
            if (this.nav.isWebNav !== true)
                this.navigo.historyAPIUpdateMethod('replaceState');
        }
        return this.navigo.on(args[0], args[1], args[2]);
    }
    navigateToLogin() {
        this.navigate('/login');
    }
    navigate(url, absolute) {
        if (!this.navigo) {
            tool_2.envGlobal.window.alert('Is not in webnav state, cannot navigate to url "' + url + '"');
            return;
        }
        if (this.testing === true) {
            url += '#test';
        }
        return this.navigo.navigate(url, absolute);
    }
    go(showPage, url, absolute) {
        if (this.navigo !== undefined) {
            this.navigate(url, absolute);
        }
        else {
            showPage();
        }
    }
    saveLocalUser() {
        this.local.user.set(this.user);
    }
    setUqRoles(uq, roles) {
        let { roles: userRoles } = this.user;
        if (!userRoles) {
            this.user.roles = {};
        }
        this.user.roles[uq] = roles;
        this.local.user.set(this.user);
    }
    loadMe() {
        return __awaiter(this, void 0, void 0, function* () {
            let me = yield this.web.userApi.me();
            this.user.icon = me.icon;
            this.user.nick = me.nick;
        });
    }
    internalLogined(user, callback, isUserLogin) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.web.logoutApis();
            this.user = user;
            this.saveLocalUser();
            this.web.setNetToken(user.id, user.token);
            this.nav.clear();
            yield ((_a = this.onChangeLogin) === null || _a === void 0 ? void 0 : _a.call(this, this.user));
            if (callback !== undefined) {
                yield callback(user);
            }
            else if (this.nav.isWebNav === true) {
                this.navigate('/index');
            }
            else {
                yield this.showAppView(isUserLogin);
            }
        });
    }
    // 缓冲登录
    logined(user, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.internalLogined(user, callback, false);
        });
    }
    // 用户操作之后登录
    userLogined(user, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.internalLogined(user, callback, true);
        });
    }
    loginTop(defaultTop /*JSX.Element*/) {
        return (this.navSettings && this.navSettings.loginTop) || defaultTop;
    }
    logout(callback) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.local.logoutClear();
            this.user = undefined; //{} as User;
            this.web.logoutApis();
            let guest = this.local.guest.get();
            this.web.setCenterToken(0, guest && guest.token);
            this.nav.clear();
            if (callback === undefined)
                yield this.start();
            else
                yield callback();
            (_a = this.onChangeLogin) === null || _a === void 0 ? void 0 : _a.call(this, undefined);
        });
    }
    get logs() { return logs; }
    ;
    log(msg) {
        logs.push(msg);
    }
    logMark() {
        let date = new Date();
        logMark = date.getTime();
        logs.push('log-mark: ' + date.toTimeString());
    }
    logStep(step) {
        logs.push(step + ': ' + (new Date().getTime() - logMark));
    }
    openSysPage(url) {
        let navPage = this.sysRoutes[url];
        if (navPage === undefined) {
            //alert(url + ' is not defined in sysRoutes');
            return false;
        }
        navPage(undefined);
        return true;
    }
    routeFromNavPage(navPage) {
        return (params, queryStr) => {
            if (navPage) {
                if (this.nav.isWebNav)
                    this.nav.clear();
                navPage(params);
            }
        };
    }
    onNavRoute(navPage) {
        this.on(this.routeFromNavPage(navPage));
    }
    /*
    onSysNavRoutes() {
        this.onNavRoutes(this.sysRoutes);
    }
    */
    onNavRoutes(navPageRoutes) {
        if (this.doneSysRoutes === false) {
            this.doneSysRoutes = true;
            this.internalOnNavRoutes(this.sysRoutes);
        }
        this.internalOnNavRoutes(navPageRoutes);
    }
    internalOnNavRoutes(navPageRoutes) {
        if (!navPageRoutes)
            return;
        this.navPageRoutes = Object.assign(this.navPageRoutes, navPageRoutes);
        let navOns = {};
        for (let route in navPageRoutes) {
            let navPage = navPageRoutes[route];
            navOns[route] = this.routeFromNavPage(navPage);
        }
        this.on(navOns);
    }
    setCreateLogin(createLogin) {
        this.createLogin = createLogin;
    }
    changePassword() {
        return __awaiter(this, void 0, void 0, function* () {
            let login = yield this.getLogin();
            login.showChangePassword();
        });
    }
    userQuit() {
        return __awaiter(this, void 0, void 0, function* () {
            let login = yield this.getLogin();
            login.showUserQuit();
        });
    }
    getLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.login)
                return this.login;
            return this.login = yield this.createLogin(this);
        });
    }
    showLogin(callback, withBack) {
        return __awaiter(this, void 0, void 0, function* () {
            let login = yield this.getLogin();
            login.showLogin(callback, withBack);
        });
    }
    showLogout(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let login = yield this.getLogin();
            login.showLogout(callback);
        });
    }
}
exports.Tonwa = Tonwa;
//# sourceMappingURL=Tonwa.js.map