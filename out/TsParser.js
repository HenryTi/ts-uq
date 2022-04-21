"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsParser = void 0;
const ts = require("typescript");
class TsParser {
    constructor(tsFile, source) {
        this.identifierColl = {};
        this.tsFile = tsFile;
        this.source = source;
    }
    parse() {
        const node = ts.createSourceFile(this.tsFile, // fileName
        this.source, // sourceText
        ts.ScriptTarget.Latest // langugeVersion
        );
        this.parseNode(1, node);
        return true;
    }
    parseNode(level, node) {
        node.forEachChild(child => {
            let { kind, pos, end } = child;
            switch (kind) {
                default:
                    console.log(level, ts.SyntaxKind[kind], child);
                    console.log(this.source.substring(pos, end));
                    this.parseNode(level + 1, child);
                    break;
                //case ts.SyntaxKind.VariableDeclaration:
                //    this.parseVariableDeclaration(child);
                //    break;
            }
        });
    }
    parseVariableDeclaration(node) {
        let identifier;
        let value;
        node.forEachChild(child => {
            if (value)
                return;
            let { kind, pos, end } = child;
            switch (kind) {
                case ts.SyntaxKind.Identifier:
                    identifier = this.source.substring(pos, end).trim();
                    break;
                default:
                    value = this.parseObjectLiteralExpression(child);
                    break;
            }
        });
        if (identifier && value) {
            this.identifierColl[identifier] = value;
        }
    }
    parseObjectLiteralExpression(node) {
        let obj = new ObjectLiteralValue();
        let value = {};
        obj.value = value;
        node.forEachChild(child => {
            if (child.kind === ts.SyntaxKind.PropertyAssignment) {
                let prop = this.parsePropertyAssignment(child);
                value[prop.name] = prop.value;
            }
        });
        return obj;
    }
    parsePropertyAssignment(node) {
        let name;
        let c0 = node.getChildAt(0);
        let { kind, pos, end } = c0;
        switch (kind) {
            case ts.SyntaxKind.StringLiteral:
                name = this.source.substring(pos + 1, end - 2);
                break;
            case ts.SyntaxKind.Identifier:
                name = this.source.substring(pos, end);
                break;
        }
        let c1 = node.getChildAt(1);
        let value = this.parseValue(c1);
        return { name, value };
    }
    parseValue(node) {
        let { kind, pos, end } = node;
        switch (kind) {
            case ts.SyntaxKind.StringLiteral:
                return new StringLiteralValue(this.source.substring(pos, end));
            //case ts.SyntaxKind.StringLiteral:
            //    return new 
            case ts.SyntaxKind.ObjectLiteralExpression:
                return this.parseObjectLiteralExpression(node);
            case ts.SyntaxKind.Identifier:
                return new Identifier(this.source.substring(pos, end));
        }
    }
}
exports.TsParser = TsParser;
class Value {
}
class StringValue {
    constructor(str) {
        this.str = str;
    }
}
class Identifier extends StringValue {
}
class StringLiteralValue extends StringValue {
}
class NumberLiteralValue extends Value {
}
class ObjectLiteralValue extends Value {
}
//# sourceMappingURL=TsParser.js.map