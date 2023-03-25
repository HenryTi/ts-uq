import * as fs from "fs";
import * as jsonpack from 'jsonpack';
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
    const centerHost = 'https://tv.jkchemical.com';
    let centerToken = undefined;
    let centerChannel = new CenterHttpChannel(buildContext.web, centerHost, centerToken);

    let promises = uqConfigs.map(v => centerChannel.get('/tonwa/open/uq-schema', { uqOwner: v.dev.name, uqName: v.name }));
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
