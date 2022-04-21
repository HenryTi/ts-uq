"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUqConfigs = void 0;
const ts = require("typescript");
function parseUqConfigs(tsAppConfig, source) {
    const node = ts.createSourceFile(tsAppConfig, // fileName
    source, // sourceText
    ts.ScriptTarget.Latest // langugeVersion
    );
    logNode(source, 1, node);
    return;
}
exports.parseUqConfigs = parseUqConfigs;
function logNode(source, level, node) {
    node.forEachChild(child => {
        console.log(level, ts.SyntaxKind[child.kind], child);
        console.log(source.substring(child.pos, child.end));
        logNode(source, level + 1, child);
    });
}
class Value {
}
class Identifier extends Value {
}
class StringLiteralValue extends Value {
}
class NumberLiteralValue extends Value {
}
class ObjectLiteralValue extends Value {
}
const identifierColl = {};
function parseVariableDeclaration(source, node) {
    let ret = {};
    let identifier;
    let obj;
    node.forEachChild(child => {
        let { kind, pos, end } = child;
        switch (kind) {
            case ts.SyntaxKind.Identifier:
                identifier = source.substring(pos, end);
                break;
            case ts.SyntaxKind.ObjectLiteralExpression:
                obj = parseObjectLiteralExpression(source, child);
                break;
        }
    });
    return ret;
}
function parseObjectLiteralExpression(source, node) {
    let obj = new ObjectLiteralValue();
    let value = {};
    obj.value = value;
    node.forEachChild(child => {
        if (child.kind === ts.SyntaxKind.PropertyAssignment) {
        }
    });
    return obj;
}
//# sourceMappingURL=parseUqConfigs.js.map