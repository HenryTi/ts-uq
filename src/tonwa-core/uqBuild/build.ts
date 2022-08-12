import * as fs from "fs";
import { env } from '../tool';
import { lastBuildTime, red, saveTsFile, saveSrcTsFileIfNotExists, overrideTsFile } from './tools';
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

    let { tsTemplate } = buildContext;

    let { uqTsSrcPath } = buildContext;
    if (!fs.existsSync(uqTsSrcPath)) {
        fs.mkdirSync(uqTsSrcPath);
    }
    //let tsIndex = tsTemplate.tsIndex;
    //overrideTsFile(`${buildContext.uqTsSrcPath}/index.ts`, tsIndex);
    /*
    let tsCApp = tsTemplate.tsCApp;
    saveSrcTsFileIfNotExists(buildContext, 'CApp', 'ts', tsCApp);
    let tsCBase = tsTemplate.tsCBase;
    saveTsFile(buildContext, 'CBase', tsCBase);
    let tsVMain = tsTemplate.tsVMain;
    saveSrcTsFileIfNotExists(buildContext, 'VMain', 'tsx', tsVMain);
    let tsApp = tsTemplate.tsApp;
    saveSrcTsFileIfNotExists(buildContext, 'App', 'tsx', tsApp);
    */
    //saveTsFile(buildContext, 'uqs', '');
    //fs.unlinkSync(uqTsSrcPath + '/uqs.ts');

    //let centerHost = 'https://dev.tonwa.ca';
    let centerHost = 'https://tv.jkchemical.com';
    let centerToken = undefined;
    let centerChannel = new CenterHttpChannel(buildContext.web, centerHost, centerToken);

    let promises = uqConfigs.map(v => centerChannel.get('/tonwa/open/uq-schema', { uqOwner: v.dev.name, uqName: v.name }));
    let retUqSchemas = await Promise.all(promises);
    let uqSchemas: UqSchema[] = [];
    for (let i = 0; i < retUqSchemas.length; i++) {
        uqSchemas.push({
            config: uqConfigs[i],
            schema: JSON.parse(retUqSchemas[i]),
        });
    }

    await buildUqsFolder(buildContext, uqSchemas);
};
