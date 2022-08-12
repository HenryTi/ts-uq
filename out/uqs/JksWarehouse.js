"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uqSchema = exports.SheetType = exports.Industry = exports.EnumSpecState = exports.WarehouseAction = void 0;
var WarehouseAction;
(function (WarehouseAction) {
    WarehouseAction[WarehouseAction["out"] = 0] = "out";
    WarehouseAction[WarehouseAction["in"] = 1] = "in";
})(WarehouseAction = exports.WarehouseAction || (exports.WarehouseAction = {}));
var EnumSpecState;
(function (EnumSpecState) {
    EnumSpecState[EnumSpecState["on"] = 1] = "on";
    EnumSpecState[EnumSpecState["lock"] = 10] = "lock";
})(EnumSpecState = exports.EnumSpecState || (exports.EnumSpecState = {}));
var Industry;
(function (Industry) {
    Industry[Industry["Medicine"] = 1] = "Medicine";
    Industry[Industry["Clothing"] = 2] = "Clothing";
})(Industry = exports.Industry || (exports.Industry = {}));
var SheetType;
(function (SheetType) {
    SheetType[SheetType["out"] = 0] = "out";
    SheetType[SheetType["in"] = 1] = "in";
})(SheetType = exports.SheetType || (exports.SheetType = {}));
exports.uqSchema = {
    "$poked": {
        "name": "$poked",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "poke",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    },
    "$setmytimezone": {
        "name": "$setMyTimezone",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "_timezone",
                "type": "tinyint"
            }
        ],
        "returns": []
    },
    "$getunittime": {
        "name": "$getUnitTime",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "timezone",
                        "type": "tinyint"
                    },
                    {
                        "name": "unitTimeZone",
                        "type": "tinyint"
                    },
                    {
                        "name": "unitBizMonth",
                        "type": "tinyint"
                    },
                    {
                        "name": "unitBizDate",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    },
    "warehouseaction": {
        "name": "WarehouseAction",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "out": 0,
            "in": 1
        }
    },
    "ixspecbin": {
        "name": "IxSpecBin",
        "type": "ix",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "quantity",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "enumspecstate": {
        "name": "EnumSpecState",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "on": 1,
            "lock": 10
        }
    },
    "ixspecstate": {
        "name": "IxSpecState",
        "type": "ix",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "quantity",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "spechistory": {
        "name": "SpecHistory",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "Spec",
                "type": "id"
            },
            {
                "name": "Bin",
                "type": "id"
            },
            {
                "name": "action",
                "type": "enum"
            },
            {
                "name": "quantity",
                "type": "dec",
                "scale": 4,
                "precision": 18
            }
        ],
        "keys": [],
        "global": false,
        "idType": 4
    },
    "ixproductspec": {
        "name": "IxProductSpec",
        "type": "ix",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "ixownerspec": {
        "name": "IxOwnerSpec",
        "type": "ix",
        "private": true,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id"
            },
            {
                "name": "xi",
                "type": "id"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "xiType": 0
    },
    "bin": {
        "name": "Bin",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "serial",
                "type": "char",
                "size": 16
            }
        ],
        "keys": [
            {
                "name": "serial",
                "type": "char",
                "size": 16
            }
        ],
        "global": false,
        "idType": 3
    },
    "product": {
        "name": "Product",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "discription",
                "type": "char",
                "size": 200
            },
            {
                "name": "industry",
                "type": "enum"
            }
        ],
        "keys": [
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "no"
        ],
        "global": false,
        "idType": 2
    },
    "owner": {
        "name": "Owner",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "discription",
                "type": "char",
                "size": 200
            }
        ],
        "keys": [
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "no"
        ],
        "global": false,
        "idType": 2
    },
    "person": {
        "name": "Person",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "name",
                "type": "char",
                "size": 30
            }
        ],
        "keys": [
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "name",
            "no"
        ],
        "global": false,
        "idType": 2
    },
    "industry": {
        "name": "Industry",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "Medicine": 1,
            "Clothing": 2
        }
    },
    "spec": {
        "name": "Spec",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "industry",
                "type": "enum"
            }
        ],
        "keys": [
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "no"
        ],
        "global": false,
        "idType": 3
    },
    "speccloth": {
        "name": "SpecCloth",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "industry",
                "type": "enum"
            }
        ],
        "keys": [
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "no"
        ],
        "global": false,
        "idType": 2
    },
    "specmedicine": {
        "name": "SpecMedicine",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "industry",
                "type": "enum"
            },
            {
                "name": "validTo",
                "type": "date"
            }
        ],
        "keys": [
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "no"
        ],
        "global": false,
        "idType": 2
    },
    "sheettype": {
        "name": "SheetType",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "out": 0,
            "in": 1
        }
    },
    "specsheet": {
        "name": "SpecSheet",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "type",
                "type": "enum"
            }
        ],
        "keys": [
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "nameNoVice": [
            "no"
        ],
        "global": false,
        "idType": 3
    },
    "specsheetrow": {
        "name": "SpecSheetRow",
        "type": "id",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "null": false
            },
            {
                "name": "sheet",
                "type": "id"
            },
            {
                "name": "bin",
                "type": "id"
            },
            {
                "name": "spec",
                "type": "id"
            },
            {
                "name": "quantity",
                "type": "dec",
                "scale": 4,
                "precision": 18
            }
        ],
        "keys": [],
        "global": false,
        "idType": 3
    }
};
//# sourceMappingURL=JksWarehouse.js.map