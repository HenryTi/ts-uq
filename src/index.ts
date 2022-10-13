import fetch from 'node-fetch';
import * as fs from 'fs';
import { build, DevConfig, UqBuildContext, UqConfig, Web } from './tonwa-core';
import { TsTemplate } from 'tonwa-core/uqBuild/TsTemplate';

class NodeWeb extends Web {
    fetch(url: string, init?: any): Promise<any> {
        return fetch(url, init);
    }
}

class UqBuildContextUI extends UqBuildContext {
    get uiPlatform(): string { return 'react' };
    get uiPlatformUpper(): string { return 'REACT' };
    get uiPlatformCamel(): string { return 'React' }
    get element(): string { return 'JSX.Element' }
}

(async function () {
    console.log('ts-uq building ...');
    let cwd = process.cwd();
    let srcPath: string;
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
    await build(uqConfigs, new UqBuildContextUI(web, uqAppPath));
})();

function uqsFromConfigs(uqConfigs: any): UqConfig[] {
    let { devs, uqs } = uqConfigs;
    return uqs.map((v: any) => {
        let { dev, name, alias } = v;
        return {
            dev: devs[dev],
            name,
            alias,
        };
    });
}
