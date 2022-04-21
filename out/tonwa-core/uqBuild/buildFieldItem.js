"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFieldItem = void 0;
const tool_1 = require("../tool");
//import { FieldItem, FieldUIType } from "../../tonwa-react/ui";
function buildFieldItem(field, isKey) {
    let $FieldItemType, fieldItemType, widget /*FieldUIType*/;
    let { name, type } = field;
    switch (type) {
        case 'id':
            $FieldItemType = 'FieldItemId';
            fieldItemType = 'id';
            break;
        case 'char':
            $FieldItemType = 'FieldItemString';
            fieldItemType = 'string';
            widget = 'string';
            break;
        case 'enum':
        case 'tinyint':
        case 'smallint':
        case 'int':
        case 'bigint':
            $FieldItemType = 'FieldItemInt';
            fieldItemType = 'integer';
            widget = 'updown';
            break;
        case 'dec':
        case 'float':
        case 'double':
            $FieldItemType = 'FieldItemNumber';
            fieldItemType = 'number';
            widget = 'number';
            break;
        case 'text':
            $FieldItemType = 'FieldItemString';
            fieldItemType = 'string';
            widget = 'textarea';
            break;
    }
    return {
        name,
        type: fieldItemType,
        isKey,
        widget,
        label: (0, tool_1.capitalCase)(name),
        $FieldItemType,
    } /*as FieldItem*/;
}
exports.buildFieldItem = buildFieldItem;
//# sourceMappingURL=buildFieldItem.js.map