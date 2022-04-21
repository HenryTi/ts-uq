"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGlobalRes = exports.setRes = exports.resGlobal = exports.resLang = exports.setResOptions = exports.resOptions = void 0;
exports.resOptions = {
    lang: undefined,
    $lang: undefined,
    district: undefined,
    $district: undefined,
};
function setResOptions(lang, district) {
    exports.resOptions.lang = lang;
    exports.resOptions.$lang = '$' + lang;
    exports.resOptions.district = district;
    exports.resOptions.$district = '$' + district;
}
exports.setResOptions = setResOptions;
(function () {
    let nav = global.navigator;
    if (!nav)
        return;
    let lang, district;
    let language = (nav.languages && nav.languages[0]) // Chrome / Firefox
        || nav.language; // ||   // All browsers
    if (!language) {
        lang = 'zh';
        district = 'CN';
    }
    else {
        let parts = language.split('-');
        lang = parts[0];
        if (parts.length > 1)
            district = parts[1].toUpperCase();
    }
    setResOptions(lang, district);
}());
function resLang(res) {
    let { lang, district } = exports.resOptions;
    let ret = {};
    if (res === undefined)
        return ret;
    Object.assign(ret, res._);
    let l = res[lang];
    if (l === undefined)
        return ret;
    Object.assign(ret, l._);
    let d = l[district];
    if (d === undefined)
        return ret;
    Object.assign(ret, d);
    let { entity } = ret;
    if (entity !== undefined) {
        for (let i in entity) {
            entity[i.toLowerCase()] = entity[i];
        }
    }
    return ret;
}
exports.resLang = resLang;
exports.resGlobal = {};
function setRes(target, res) {
    if (res === undefined)
        return;
    let { $lang, $district } = exports.resOptions;
    Object.assign(target, res);
    if ($lang !== undefined) {
        let l = res[$lang];
        if (l !== undefined) {
            Object.assign(target, l);
            let d = l[$district];
            if (d !== undefined) {
                Object.assign(target, d);
            }
        }
    }
    return function (str) {
        return target[str] || str;
    };
}
exports.setRes = setRes;
function setGlobalRes(res) {
    setRes(exports.resGlobal, res);
}
exports.setGlobalRes = setGlobalRes;
/*
export function t(str:string):string|JSX.Element {
    return resGlobal[str] || str;
}
export type TFunc = (str:string|JSX.Element) => string|JSX.Element;
*/
//# sourceMappingURL=res.js.map