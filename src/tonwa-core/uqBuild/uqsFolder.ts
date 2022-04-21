import * as fs from 'fs';
import * as path from 'path';
import { UqBuildContext } from './UqBuildContext';
import { getNameFromConfig, overrideTsFile } from './tools';
import { TsUqFolder } from './TsUqFolder';
import { UqSchema } from './build';

export async function buildUqsFolder(buildContext: UqBuildContext, uqSchemas: UqSchema[]) {
	let { uqTsSrcPath, tsTemplate } = buildContext;
	let uqsFolder = uqTsSrcPath + '/uqs';
	/*
	let uqErrors = await uqsLoader.build();
	if (uqErrors) {
		throw new Error('error in uqsLoader.build()');
	}
	let { uqsMan } = uqsLoader;
	let uqMans = uqsMan.getUqMans();

	let promiseArr: Promise<void>[] = [];
	if (uqErrors) {
		console.error(uqErrors.join('\n'));
	}

	for (let uq of uqMans) {
		promiseArr.push(loadUqEntities(uq));
	}
	await Promise.all(promiseArr);
	*/

	let tsUqsIndexHeader = '';
	let tsUqsIndexContent: string;
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
	tsUqsIndexHeader += tsTemplate.tsHeader;
	let tsUqsIndexReExport = '\n';
	//let tsUqsUI = `\n\nexport function setUI(uqs:UQs) {`;
	for (let uqSchema of uqSchemas) {
		let { config, schema } = uqSchema;
		let { fullName, devName: o1, uqName: n1 } = getNameFromConfig(config);
		let uqAlias = o1 + n1;
		let tsUqFolder = new TsUqFolder(buildContext, schema, fullName, uqsFolder, uqAlias);
		// buildTsUqFolder(uq, uqsFolder, uqAlias);
		tsUqFolder.build();

		tsUqsIndexHeader += `\nimport * as ${uqAlias} from './${uqAlias}';`;
		tsUqsIndexContent += `\n\t${uqAlias}: ${uqAlias}.UqExt;`;
		tsUqsIndexReExport += `\nexport * as ${uqAlias} from './${uqAlias}';`;
		//tsUqsUI += `\n\t${uqAlias}.setUI(uqs.${uqAlias});`;
	}
	if (!fs.existsSync(uqsFolder)) {
		fs.mkdirSync(uqsFolder);
	}
	/*
	else {
		try {
			let files = fs.readdirSync(uqsFolder);
			for (const file of files) {
				let fullPath = path.join(uqsFolder, file);
				if (fs.lstatSync(fullPath).isFile() === true) {
					fs.unlinkSync(fullPath);
				}
			}
		}
		catch (err) {
			throw err;
		}
	}
	*/

	overrideTsFile(uqsIndexFile,
		tsUqsIndexHeader + tsUqsIndexContent + '\n}' + tsUqsIndexReExport + '\n');
}
