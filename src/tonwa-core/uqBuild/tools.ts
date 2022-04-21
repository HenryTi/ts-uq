import * as fs from "fs";
import { UqConfig } from "./UqConfig";
import { capitalCase } from "../tool";
import { UqBuildContext } from './UqBuildContext';

export const red = ''; //'\x1b[41m%s\x1b[0m';
export let lastBuildTime: number = 0;
//export const uqTsSrcPath = 'src/UqApp';

export function saveSrcTsFileIfNotExists(context: UqBuildContext, fileName: string, suffix: string, content: string) {
	let tsFilePath = `${context.uqTsSrcPath}/${fileName}.${suffix}`;
	saveTsFileIfNotExists(tsFilePath, content);
	//if (fs.existsSync(tsFile) === true) return;
	//saveTsFile(fileName, content, suffix);
}
export function saveTsFile(context: UqBuildContext, fileName: string, content: string, suffix: string = 'ts') {
	let { uqTsSrcPath } = context;
	let srcFile = `${uqTsSrcPath}/${fileName}.${suffix}.txt`;
	let tsFile = `${uqTsSrcPath}/${fileName}.${suffix}`;
	if (!fs.existsSync(srcFile)) {
		if (fs.existsSync(tsFile)) {
			fs.renameSync(tsFile, srcFile);
		}
	}
	fs.writeFileSync(tsFile, content);
	lastBuildTime = Date.now();
	console.log(red, `${fileName} is built`);
}
export function overrideTsFile(path: string, content: string) {
	fs.writeFileSync(path, content);
	lastBuildTime = Date.now();
	console.log(red, `${path} is built`);
}

export function saveTsFileIfNotExists(tsFilePath: string, content: string) {
	if (fs.existsSync(tsFilePath) === true) return;
	overrideTsFile(tsFilePath, content);
}

export function entityName(s: string): string {
	return capitalCase(s);
}

export function getNameFromConfig(uqConfig: UqConfig): { fullName: string; devName: string; uqName: string } {
	let devPart: string, uqPart: string;
	let { dev, name, alias } = uqConfig;
	let { name: devName, alias: devAlias } = dev;
	devPart = devAlias || devName;
	uqPart = alias || name;
	return {
		fullName: `${devName}/${name}`,
		devName: capitalCase(devPart),
		uqName: capitalCase(uqPart),
	};
}
