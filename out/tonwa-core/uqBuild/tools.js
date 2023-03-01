"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNameFromConfig = exports.entityName = exports.saveTsFileIfNotExists = exports.overrideTsFile = exports.saveTsFile = exports.saveSrcTsFileIfNotExists = exports.lastBuildTime = exports.red = void 0;
const fs = require("fs");
const tool_1 = require("../tool");
exports.red = ''; //'\x1b[41m%s\x1b[0m';
exports.lastBuildTime = 0;
//export const uqTsSrcPath = 'src/UqApp';
function saveSrcTsFileIfNotExists(context, fileName, suffix, content) {
    let tsFilePath = `${context.uqTsSrcPath}/${fileName}.${suffix}`;
    saveTsFileIfNotExists(tsFilePath, content);
    //if (fs.existsSync(tsFile) === true) return;
    //saveTsFile(fileName, content, suffix);
}
exports.saveSrcTsFileIfNotExists = saveSrcTsFileIfNotExists;
function saveTsFile(context, fileName, content, suffix = 'ts') {
    let { uqTsSrcPath } = context;
    let srcFile = `${uqTsSrcPath}/${fileName}.${suffix}.txt`;
    let tsFile = `${uqTsSrcPath}/${fileName}.${suffix}`;
    if (!fs.existsSync(srcFile)) {
        if (fs.existsSync(tsFile)) {
            fs.renameSync(tsFile, srcFile);
        }
    }
    fs.writeFileSync(tsFile, content);
    exports.lastBuildTime = Date.now();
    console.log(exports.red, `${fileName} built`);
}
exports.saveTsFile = saveTsFile;
function overrideTsFile(path, content) {
    fs.writeFileSync(path, content);
    exports.lastBuildTime = Date.now();
    console.log(exports.red, `${path} built`);
}
exports.overrideTsFile = overrideTsFile;
function saveTsFileIfNotExists(tsFilePath, content) {
    if (fs.existsSync(tsFilePath) === true)
        return;
    overrideTsFile(tsFilePath, content);
}
exports.saveTsFileIfNotExists = saveTsFileIfNotExists;
function entityName(s) {
    return (0, tool_1.capitalCase)(s);
}
exports.entityName = entityName;
function getNameFromConfig(uqConfig) {
    let devPart, uqPart;
    let { dev, name, alias } = uqConfig;
    let { name: devName, alias: devAlias } = dev;
    devPart = devAlias || devName;
    uqPart = alias || name;
    return {
        fullName: `${devName}/${name}`,
        devName: (0, tool_1.capitalCase)(devPart),
        uqName: (0, tool_1.capitalCase)(uqPart),
    };
}
exports.getNameFromConfig = getNameFromConfig;
//# sourceMappingURL=tools.js.map