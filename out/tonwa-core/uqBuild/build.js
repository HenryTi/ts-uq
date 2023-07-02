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
exports.build = void 0;
const fs = require("fs");
const jsonpack = require("jsonpack");
const node_fetch_1 = require("node-fetch");
const tool_1 = require("../tool");
const tools_1 = require("./tools");
const uqsFolder_1 = require("./uqsFolder");
const httpChannel_1 = require("../web/httpChannel");
const urlCenterPublic = 'https://tv.jkchemical.com';
const centerLocal = 'localhost:3000';
const urlCenterLocal = `http://${centerLocal}`;
const pathTonwaUqSchema = '/tonwa/open/uq-schema';
function build(uqConfigs, buildContext) {
    return __awaiter(this, void 0, void 0, function* () {
        //let buildContext = new BuildContext(uqSrcPath);
        // 只从test 数据库构建uq ts
        tool_1.env.testing = true;
        tool_1.env.buildingUq = true;
        if (tools_1.lastBuildTime > 0) {
            console.log(tools_1.red, 'quit !');
            return;
        }
        let { uqTsSrcPath } = buildContext;
        if (!fs.existsSync(uqTsSrcPath)) {
            fs.mkdirSync(uqTsSrcPath);
        }
        const centerLocal = '';
        let retCheck = yield localCheck(centerLocal);
        const centerHost = retCheck === null ? urlCenterPublic : urlCenterLocal;
        let centerToken = undefined;
        let centerChannel = new httpChannel_1.CenterHttpChannel(buildContext.web, centerHost, centerToken);
        let promises = uqConfigs.map(v => centerChannel.get(pathTonwaUqSchema, { uqOwner: v.dev.name, uqName: v.name }));
        let retUqSchemas = yield Promise.all(promises);
        let uqSchemas = [];
        for (let i = 0; i < retUqSchemas.length; i++) {
            const schemaText = retUqSchemas[i];
            try {
                const schema = schemaText[0] === '{' ? JSON.parse(schemaText) : jsonpack.unpack(schemaText);
                uqSchemas.push({
                    config: uqConfigs[i],
                    schema,
                });
            }
            catch (err) {
                console.error('parse schema error', err);
                console.log('schema', schemaText);
            }
        }
        yield (0, uqsFolder_1.buildUqsFolder)(buildContext, uqSchemas);
    });
}
exports.build = build;
;
// 因为测试的都是局域网服务器，甚至本机服务器，所以一秒足够了
// 网上找了上面的fetch timeout代码。
// 尽管timeout了，fetch仍然继续，没有cancel
// 实际上，一秒钟不够。web服务器会自动停。重启的时候，可能会比较长时间。也许两秒甚至更多。
//const timeout = 2000;
const timeout = 2000;
const fetchOptions = {
    method: "GET",
    headers: {
        "Content-Type": "text/plain;charset=UTF-8"
    },
};
function fetchLocalCheck(url) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            setTimeout(reject, timeout, new Error("Connection timed out"));
            let resp = yield (0, node_fetch_1.default)(url, fetchOptions);
            if (resp.ok === false) {
                reject('resp.ok === false');
                return;
            }
            let text = yield resp.text();
            resolve(text);
        }
        catch (err) {
            reject(err);
        }
    }));
}
function localCheck(host) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!host)
            return null;
        let url = `http://${host}/hello`;
        try {
            return yield fetchLocalCheck(url);
        }
        catch (err) {
            return null;
        }
    });
}
//# sourceMappingURL=build.js.map