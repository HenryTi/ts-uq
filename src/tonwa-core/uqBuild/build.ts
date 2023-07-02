import * as fs from "fs";
import * as jsonpack from 'jsonpack';
import fetch from 'node-fetch';
import { env } from '../tool';
import { lastBuildTime, red } from './tools';
import { buildUqsFolder } from './uqsFolder';
import { UqBuildContext } from './UqBuildContext';
import { UqConfig } from "./UqConfig";
import { CenterHttpChannel } from "../web/httpChannel";

export interface UqSchema {
    config: UqConfig;
    schema: any;
}

const urlCenterPublic = 'https://tv.jkchemical.com';
const centerLocal = 'localhost:3000';
const urlCenterLocal = `http://${centerLocal}`;
const pathTonwaUqSchema = '/tonwa/open/uq-schema';

export async function build(uqConfigs: UqConfig[], buildContext: UqBuildContext) {
    //let buildContext = new BuildContext(uqSrcPath);
    // 只从test 数据库构建uq ts
    env.testing = true;
    env.buildingUq = true;

    if (lastBuildTime > 0) {
        console.log(red, 'quit !');
        return;
    }

    let { uqTsSrcPath } = buildContext;
    if (!fs.existsSync(uqTsSrcPath)) {
        fs.mkdirSync(uqTsSrcPath);
    }
    const centerLocal = '';
    let retCheck = await localCheck(centerLocal);
    const centerHost = retCheck === null ? urlCenterPublic : urlCenterLocal;
    let centerToken = undefined;
    let centerChannel = new CenterHttpChannel(buildContext.web, centerHost, centerToken);

    let promises = uqConfigs.map(v => centerChannel.get(pathTonwaUqSchema, { uqOwner: v.dev.name, uqName: v.name }));
    let retUqSchemas = await Promise.all(promises);
    let uqSchemas: UqSchema[] = [];
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

    await buildUqsFolder(buildContext, uqSchemas);
};



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

function fetchLocalCheck(url: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            setTimeout(reject, timeout, new Error("Connection timed out"));
            let resp = await fetch(url, fetchOptions as any);
            if (resp.ok === false) {
                reject('resp.ok === false');
                return;
            }
            let text = await resp.text();
            resolve(text);
        }
        catch (err) {
            reject(err);
        }
    });
}

async function localCheck(host: string): Promise<string> {
    if (!host) return null;
    let url = `http://${host}/hello`;
    try {
        return await fetchLocalCheck(url);
    }
    catch (err) {
        return null;
    }
}
