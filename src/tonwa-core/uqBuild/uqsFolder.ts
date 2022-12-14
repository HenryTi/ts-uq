import * as fs from 'fs';
import { UqBuildContext } from './UqBuildContext';
import { getNameFromConfig, overrideTsFile } from './tools';
import { UqSchema } from './build';
import { tsHeader } from './UqConfig';
import { TsUQ } from './TsUQ';

export async function buildUqsFolder(buildContext: UqBuildContext, uqSchemas: UqSchema[]) {
    let { uqTsSrcPath } = buildContext;
    let uqsFolder = uqTsSrcPath + '/uqs';

    let tsUqsIndexHeader = '';
    let tsUqsIndexContent: string;
    let tsUqsIndexSchema: string = `\n\nexport const uqsSchema = {`;
    let uqsIndexFile = `${uqTsSrcPath}/uqs/index.ts`;
    if (fs.existsSync(uqsIndexFile) === true) {
        let indexText = fs.readFileSync(uqsIndexFile, 'utf8');
        let p1 = indexText.indexOf('///###import AppUQs###///');
        if (p1 >= 0) {
            let pe = indexText.indexOf('\n', p1);
            tsUqsIndexHeader = indexText.substring(0, pe + 1);
            tsUqsIndexContent = `\n\nexport interface UQs extends AppUQs {`;
        }
        else {
            tsUqsIndexContent = `\n\nexport interface UQs {`;
        }
    }
    else {
        tsUqsIndexContent = `\n\nexport interface UQs {`;
    }
    tsUqsIndexHeader += tsHeader; // tsTemplate.tsHeader;
    let tsUqsIndexReExport = '\n';
    let len = uqSchemas.length;
    for (let i = 0; i < len; i++) {
        let { config, schema } = uqSchemas[i];
        let { fullName, devName: o1, uqName: n1 } = getNameFromConfig(config);
        let uqAlias = o1 + n1;
        // let tsUqFolder = new TsUqFolder(buildContext, schema, fullName, uqsFolder, uqAlias, idOnly);
        // tsUqFolder.build();
        // let uqFolder = this.uqsFolder;
        // let tsUq = tsHeader + buildTsUq(schema, fullName);
        let { "id-only": idOnly } = config;
        if (i === 0) {
            // 第一个uq默认全interface
            if (idOnly === undefined) idOnly = false;
        }
        else {
            // 之后的uq默认仅ID interface
            if (idOnly === undefined) idOnly = true;
        }

        let tsUqBuilder = new TsUQ(buildContext, schema, fullName, idOnly);
        let tsUq = tsHeader + tsUqBuilder.build();

        // let tsUqBuilder = new TsUQ(this.buildContext, this.uqSchema, this.uqName);
        // tsUq += tsUqBuilder.build();
        overrideTsFile(`${uqsFolder}/${uqAlias}.ts`, tsUq);

        tsUqsIndexHeader += `\nimport * as ${uqAlias} from './${uqAlias}';`;
        tsUqsIndexContent += `\n\t${uqAlias}: ${uqAlias}.UqExt;`;
        tsUqsIndexSchema += `\n\t"${fullName}": ${uqAlias}.uqSchema,`;
        tsUqsIndexReExport += `\nexport * as ${uqAlias} from './${uqAlias}';`;
    }
    if (!fs.existsSync(uqsFolder)) {
        fs.mkdirSync(uqsFolder);
    }

    overrideTsFile(
        uqsIndexFile,
        tsUqsIndexHeader
        + tsUqsIndexContent + '\n}'
        + tsUqsIndexSchema + '\n}'
        + tsUqsIndexReExport + '\n'
    );
    /*
        function buildTsUq(uqSchema: any, uqName: string): string {
            // let uqFolder = this.uqsFolder;
            let tsUqBuilder = new TsUQ(buildContext, uqSchema, uqName);
            return tsHeader + tsUqBuilder.build();
            // overrideTsFile(`${uqFolder}/${this.uqAlias}.ts`, tsUq);
        }
    */
}
