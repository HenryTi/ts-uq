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
const node_fetch_1 = require("node-fetch");
const fs = require("fs");
const tonwa_core_1 = require("./tonwa-core");
class NodeWeb extends tonwa_core_1.Web {
    fetch(url, init) {
        return (0, node_fetch_1.default)(url, init);
    }
}
class UqBuildContextUI extends tonwa_core_1.UqBuildContext {
    get uiPlatform() { return 'react'; }
    ;
    get uiPlatformUpper() { return 'REACT'; }
    ;
    get uiPlatformCamel() { return 'React'; }
    get element() { return 'JSX.Element'; }
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('start building ts-uq-react!');
        let cwd = process.cwd();
        let srcPath;
        if (fs.existsSync(cwd + '/src') === true) {
            srcPath = '/src';
        }
        else {
            srcPath = '/uq-app';
            if (fs.existsSync(cwd + srcPath) === false) {
                fs.mkdirSync(cwd + srcPath);
            }
        }
        let p = cwd.indexOf('build-uq-interface');
        let uqAppPath = cwd + (p >= 0 ? '/uq-app' : srcPath);
        /*
        if (fs.existsSync(uqAppPath) === false) {
            uqAppPath = cwd + '/uq-app';
            if (fs.existsSync(uqAppPath) === false) {
                console.error(`Folder '${uqAppPath}' not exists`);
                return;
            }
        }
        */
        let jsonUqConfigs = cwd + srcPath + '/uqconfig.json';
        if (fs.existsSync(jsonUqConfigs) === false) {
            console.error(`uqConfigs.json in ${cwd}${srcPath} not exists:`, jsonUqConfigs);
            return;
        }
        if (fs.existsSync(uqAppPath + '/uqs') === false) {
            fs.mkdirSync(uqAppPath + '/uqs');
        }
        let json = fs.readFileSync(jsonUqConfigs, 'utf8');
        let uqConfigs = uqsFromConfigs(JSON.parse(json));
        let web = new NodeWeb();
        yield (0, tonwa_core_1.build)(uqConfigs, new UqBuildContextUI(web, uqAppPath));
    });
})();
function uqsFromConfigs(uqConfigs) {
    let { devs, uqs } = uqConfigs;
    return uqs.map((v) => {
        let { dev, name, alias } = v;
        return {
            dev: devs[dev],
            name,
            alias,
        };
    });
}
//# sourceMappingURL=index.js.map