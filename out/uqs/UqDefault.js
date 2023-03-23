"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uqSchema = exports.EnumID = void 0;
var EnumID;
(function (EnumID) {
})(EnumID = exports.EnumID || (exports.EnumID = {}));
exports.uqSchema = {
    "$role_my": {
        "name": "$role_my",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "admins",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "unit",
                        "type": "id"
                    },
                    {
                        "name": "admin",
                        "type": "tinyint"
                    },
                    {
                        "name": "entity",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "assigned",
                        "type": "char",
                        "size": 100
                    }
                ]
            },
            {
                "name": "roles",
                "fields": [
                    {
                        "name": "unit",
                        "type": "id"
                    },
                    {
                        "name": "role",
                        "type": "char",
                        "size": 100
                    }
                ]
            },
            {
                "name": "unitProps",
                "fields": [
                    {
                        "name": "unit",
                        "type": "id"
                    },
                    {
                        "name": "props",
                        "type": "text"
                    }
                ]
            }
        ]
    },
    "$role_unit_users": {
        "name": "$role_unit_users",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "unit",
                "type": "bigint"
            }
        ],
        "returns": [
            {
                "name": "users",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "user",
                        "type": "id"
                    },
                    {
                        "name": "admin",
                        "type": "tinyint"
                    },
                    {
                        "name": "assigned",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "nick",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "icon",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "addBy",
                        "type": "id"
                    }
                ]
            },
            {
                "name": "roles",
                "fields": [
                    {
                        "name": "user",
                        "type": "id"
                    },
                    {
                        "name": "role",
                        "type": "char",
                        "size": 100
                    }
                ]
            }
        ]
    },
    "$role_unit_add_admin": {
        "name": "$role_unit_add_admin",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "unit",
                "type": "bigint"
            },
            {
                "name": "user",
                "type": "bigint"
            },
            {
                "name": "admin",
                "type": "tinyint"
            },
            {
                "name": "assigned",
                "type": "char",
                "size": 100
            }
        ],
        "returns": []
    },
    "$role_unit_del_admin": {
        "name": "$role_unit_del_admin",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "unit",
                "type": "bigint"
            },
            {
                "name": "user",
                "type": "bigint"
            },
            {
                "name": "admin",
                "type": "tinyint"
            }
        ],
        "returns": []
    },
    "$role_unit_add_user": {
        "name": "$role_unit_add_user",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "unit",
                "type": "bigint"
            },
            {
                "name": "user",
                "type": "bigint"
            },
            {
                "name": "assigned",
                "type": "char",
                "size": 100
            }
        ],
        "returns": []
    },
    "$role_unit_user_role": {
        "name": "$role_unit_user_role",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "unit",
                "type": "bigint"
            },
            {
                "name": "user",
                "type": "bigint"
            },
            {
                "name": "action",
                "type": "char",
                "size": 100
            },
            {
                "name": "role",
                "type": "char",
                "size": 100
            }
        ],
        "returns": []
    },
    "$role_unit_quit_owner": {
        "name": "$role_unit_quit_owner",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "unit",
                "type": "bigint"
            }
        ],
        "returns": []
    },
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
    "lot": {
        "name": "Lot",
        "type": "tuid",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "lotnumber",
                "type": "char",
                "size": 50
            },
            {
                "name": "product",
                "type": "id",
                "null": false,
                "ID": "productx",
                "tuid": "productx"
            }
        ],
        "global": false,
        "sync": false,
        "id": "id",
        "search": [
            "lotnumber"
        ],
        "main": [
            "lotnumber"
        ]
    },
    "coa": {
        "name": "COA",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "content",
                "type": "text"
            },
            {
                "name": "version",
                "type": "char",
                "size": 50
            },
            {
                "name": "issuer",
                "type": "char",
                "size": 50
            },
            {
                "name": "issueDate",
                "type": "date",
                "null": false
            }
        ],
        "keys": [
            {
                "name": "lot",
                "type": "id",
                "null": false,
                "ID": "lot",
                "tuid": "lot"
            }
        ],
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "getlotbylotnumber": {
        "name": "getLotByLotnumber",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "lotnumber",
                "type": "char",
                "size": 50
            },
            {
                "name": "origin",
                "type": "char",
                "size": 50
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "ID": "lot",
                        "tuid": "lot"
                    },
                    {
                        "name": "product",
                        "type": "id",
                        "ID": "productx",
                        "tuid": "productx"
                    }
                ]
            }
        ]
    },
    "getproductlotnumber": {
        "name": "getProductLotNumber",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "product",
                "type": "id",
                "ID": "productx",
                "tuid": "productx"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "ID": "lot",
                        "tuid": "lot"
                    },
                    {
                        "name": "product",
                        "type": "id",
                        "ID": "productx",
                        "tuid": "productx"
                    },
                    {
                        "name": "lotnumber",
                        "type": "char",
                        "size": 50
                    }
                ]
            }
        ]
    },
    "chemical": {
        "name": "Chemical",
        "type": "tuid",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "CAS",
                "type": "char",
                "size": 20
            }
        ],
        "from": {
            "owner": "百灵威系统工程部",
            "uq": "chemical"
        },
        "global": false,
        "sync": false,
        "id": "id",
        "search": [],
        "main": []
    },
    "salesregion": {
        "name": "SalesRegion",
        "type": "tuid",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "name",
                "type": "char",
                "null": false,
                "size": 10
            },
            {
                "name": "currency",
                "type": "id",
                "null": false,
                "ID": "currency",
                "tuid": "currency"
            },
            {
                "name": "no",
                "type": "char",
                "null": false,
                "size": 10
            }
        ],
        "from": {
            "owner": "百灵威系统工程部",
            "uq": "common"
        },
        "global": false,
        "sync": false,
        "id": "id",
        "unique": [
            "name"
        ],
        "search": [
            "name"
        ],
        "main": [
            "name",
            "currency"
        ]
    },
    "currency": {
        "name": "Currency",
        "type": "tuid",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "name",
                "type": "char",
                "null": false,
                "size": 5
            },
            {
                "name": "suffix",
                "type": "char",
                "size": 10
            }
        ],
        "from": {
            "owner": "百灵威系统工程部",
            "uq": "common"
        },
        "global": false,
        "sync": false,
        "id": "id",
        "unique": [
            "name"
        ],
        "search": [
            "name",
            "suffix"
        ],
        "main": [
            "name",
            "suffix"
        ]
    },
    "packtype": {
        "name": "PackType",
        "type": "tuid",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "name",
                "type": "char",
                "null": false,
                "size": 8
            },
            {
                "name": "description",
                "type": "char",
                "size": 20
            }
        ],
        "from": {
            "owner": "百灵威系统工程部",
            "uq": "common"
        },
        "global": false,
        "sync": false,
        "id": "id",
        "unique": [
            "name"
        ],
        "search": [
            "name",
            "description"
        ],
        "main": [
            "name",
            "description"
        ]
    },
    "language": {
        "name": "Language",
        "type": "tuid",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "no",
                "type": "char",
                "size": 10
            },
            {
                "name": "description",
                "type": "char",
                "size": 30
            }
        ],
        "from": {
            "owner": "百灵威系统工程部",
            "uq": "common"
        },
        "global": false,
        "sync": false,
        "id": "id",
        "search": [],
        "main": []
    },
    "research": {
        "name": "Research",
        "type": "tuid",
        "private": false,
        "sys": true,
        "fields": [],
        "from": {
            "owner": "百灵威系统工程部",
            "uq": "customer"
        },
        "global": false,
        "sync": false,
        "id": "id",
        "search": [],
        "main": []
    },
    "searchpointproduct": {
        "name": "searchPointProduct",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "keyWord",
                "type": "char",
                "size": 100
            },
            {
                "name": "salesRegion",
                "type": "id",
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "seq",
                        "type": "bigint"
                    },
                    {
                        "name": "id",
                        "type": "id",
                        "owner": "product",
                        "arr": "packx"
                    },
                    {
                        "name": "product",
                        "type": "id",
                        "ID": "productx",
                        "tuid": "productx"
                    },
                    {
                        "name": "origin",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "description",
                        "type": "char",
                        "size": 1000
                    },
                    {
                        "name": "descriptionC",
                        "type": "char",
                        "size": 1000
                    },
                    {
                        "name": "imageUrl",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "radiox",
                        "type": "dec",
                        "scale": 2,
                        "precision": 12
                    },
                    {
                        "name": "radioy",
                        "type": "dec",
                        "scale": 4,
                        "precision": 12
                    },
                    {
                        "name": "unit",
                        "type": "char",
                        "size": 10
                    },
                    {
                        "name": "retail",
                        "type": "dec",
                        "scale": 2,
                        "precision": 12
                    }
                ],
                "order": "asc"
            }
        ]
    },
    "getpointproductmorebysource": {
        "name": "getPointProductMoreBySource",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "pack",
                "type": "bigint"
            },
            {
                "name": "salesRegion",
                "type": "id",
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "owner": "product",
                        "arr": "packx"
                    },
                    {
                        "name": "product",
                        "type": "id",
                        "ID": "productx",
                        "tuid": "productx"
                    },
                    {
                        "name": "origin",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "description",
                        "type": "char",
                        "size": 1000
                    },
                    {
                        "name": "descriptionC",
                        "type": "char",
                        "size": 1000
                    },
                    {
                        "name": "imageUrl",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "radiox",
                        "type": "dec",
                        "scale": 2,
                        "precision": 12
                    },
                    {
                        "name": "radioy",
                        "type": "dec",
                        "scale": 4,
                        "precision": 12
                    },
                    {
                        "name": "unit",
                        "type": "char",
                        "size": 10
                    },
                    {
                        "name": "retail",
                        "type": "dec",
                        "scale": 2,
                        "precision": 12
                    }
                ]
            }
        ]
    },
    "agentprice": {
        "name": "AgentPrice",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "expireDate",
                "type": "datetime"
            },
            {
                "name": "discountinued",
                "type": "tinyint",
                "null": false
            },
            {
                "name": "agentPrice",
                "type": "dec",
                "scale": 2,
                "precision": 12
            }
        ],
        "keys": [
            {
                "name": "product",
                "type": "id",
                "null": false,
                "ID": "productx",
                "tuid": "productx"
            },
            {
                "name": "pack",
                "type": "id",
                "null": false,
                "owner": "product",
                "arr": "packx"
            },
            {
                "name": "salesRegion",
                "type": "id",
                "null": false,
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "brand": {
        "name": "Brand",
        "type": "tuid",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "name",
                "type": "char",
                "null": false,
                "size": 50
            },
            {
                "name": "no",
                "type": "char",
                "null": false,
                "size": 10
            }
        ],
        "isOpen": true,
        "global": false,
        "sync": false,
        "id": "id",
        "unique": [
            "no"
        ],
        "search": [
            "name"
        ],
        "main": [
            "name"
        ]
    },
    "brandsalesregion": {
        "name": "BrandSalesRegion",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "level",
                "type": "int",
                "null": false
            }
        ],
        "keys": [
            {
                "name": "brand",
                "type": "id",
                "null": false,
                "ID": "brand",
                "tuid": "brand"
            },
            {
                "name": "salesRegion",
                "type": "id",
                "null": false,
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "isOpen": true,
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "branddeliverytime": {
        "name": "BrandDeliveryTime",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "minValue",
                "type": "int"
            },
            {
                "name": "maxValue",
                "type": "int"
            },
            {
                "name": "unit",
                "type": "char",
                "size": 10
            },
            {
                "name": "deliveryTimeDescription",
                "type": "char",
                "size": 100
            },
            {
                "name": "isRestrict",
                "type": "tinyint",
                "null": false
            }
        ],
        "keys": [
            {
                "name": "brand",
                "type": "id",
                "null": false,
                "ID": "brand",
                "tuid": "brand"
            },
            {
                "name": "salesRegion",
                "type": "id",
                "null": false,
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "isOpen": true,
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "stuff": {
        "name": "Stuff",
        "type": "tuid",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "name",
                "type": "char",
                "null": false,
                "size": 50
            },
            {
                "name": "packType",
                "type": "id",
                "null": false,
                "ID": "packtype",
                "tuid": "packtype"
            }
        ],
        "global": false,
        "sync": false,
        "id": "id",
        "unique": [
            "name"
        ],
        "search": [
            "name",
            "packtype"
        ],
        "main": [
            "name",
            "packType"
        ]
    },
    "productstuff": {
        "name": "ProductStuff",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [],
        "keys": [
            {
                "name": "product",
                "type": "id",
                "null": false,
                "ID": "productx",
                "tuid": "productx"
            },
            {
                "name": "stuff",
                "type": "id",
                "null": false,
                "ID": "stuff",
                "tuid": "stuff"
            }
        ],
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "productx": {
        "name": "ProductX",
        "type": "tuid",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "brand",
                "type": "id",
                "null": false,
                "ID": "brand",
                "tuid": "brand"
            },
            {
                "name": "origin",
                "type": "char",
                "size": 50
            },
            {
                "name": "description",
                "type": "char",
                "size": 1000
            },
            {
                "name": "descriptionC",
                "type": "char",
                "size": 1000
            },
            {
                "name": "imageUrl",
                "type": "char",
                "size": 200
            },
            {
                "name": "no",
                "type": "char",
                "null": false,
                "size": 50
            },
            {
                "name": "isValid",
                "type": "tinyint",
                "null": false
            }
        ],
        "isOpen": true,
        "global": false,
        "sync": false,
        "id": "id",
        "search": [
            "origin",
            "description",
            "descriptionc"
        ],
        "main": [
            "brand",
            "origin",
            "description",
            "descriptionC",
            "imageUrl"
        ],
        "arrs": [
            {
                "name": "packx",
                "fields": [
                    {
                        "name": "radiox",
                        "type": "dec",
                        "scale": 2,
                        "precision": 12
                    },
                    {
                        "name": "radioy",
                        "type": "dec",
                        "scale": 4,
                        "precision": 12
                    },
                    {
                        "name": "unit",
                        "type": "char",
                        "size": 10
                    },
                    {
                        "name": "salesLevel",
                        "type": "id",
                        "ID": "packsaleslevel",
                        "tuid": "packsaleslevel"
                    },
                    {
                        "name": "jkcat",
                        "type": "char",
                        "null": false,
                        "size": 50
                    }
                ],
                "id": "id",
                "owner": "owner",
                "order": "$order",
                "main": [
                    "radiox",
                    "radioy",
                    "unit",
                    "salesLevel"
                ]
            }
        ]
    },
    "pricex": {
        "name": "PriceX",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "expireDate",
                "type": "datetime"
            },
            {
                "name": "discountinued",
                "type": "tinyint",
                "null": false
            },
            {
                "name": "retail",
                "type": "dec",
                "scale": 2,
                "precision": 12
            }
        ],
        "keys": [
            {
                "name": "product",
                "type": "id",
                "null": false,
                "ID": "productx",
                "tuid": "productx"
            },
            {
                "name": "pack",
                "type": "id",
                "null": false,
                "owner": "product",
                "arr": "packx"
            },
            {
                "name": "salesRegion",
                "type": "id",
                "null": false,
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "productchemical": {
        "name": "ProductChemical",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "CAS",
                "type": "char",
                "size": 20
            },
            {
                "name": "purity",
                "type": "char",
                "size": 80
            },
            {
                "name": "gradeCN",
                "type": "char",
                "size": 200
            },
            {
                "name": "molecularFomula",
                "type": "char",
                "size": 200
            },
            {
                "name": "molecularWeight",
                "type": "char",
                "size": 30
            }
        ],
        "keys": [
            {
                "name": "product",
                "type": "id",
                "null": false,
                "ID": "productx",
                "tuid": "productx"
            },
            {
                "name": "chemical",
                "type": "id",
                "null": false,
                "ID": "chemical",
                "tuid": "chemical"
            }
        ],
        "isOpen": true,
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "productsalesregion": {
        "name": "ProductSalesRegion",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "isValid",
                "type": "tinyint",
                "null": false
            }
        ],
        "keys": [
            {
                "name": "product",
                "type": "id",
                "null": false,
                "ID": "productx",
                "tuid": "productx"
            },
            {
                "name": "salesRegion",
                "type": "id",
                "null": false,
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "isOpen": true,
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "productlegallyprohibited": {
        "name": "ProductLegallyProhibited",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "reason",
                "type": "char",
                "size": 200
            }
        ],
        "keys": [
            {
                "name": "product",
                "type": "id",
                "null": false,
                "ID": "productx",
                "tuid": "productx"
            },
            {
                "name": "salesRegion",
                "type": "id",
                "null": false,
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "isOpen": true,
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "productdeliverytime": {
        "name": "ProductDeliveryTime",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "minValue",
                "type": "int"
            },
            {
                "name": "maxValue",
                "type": "int"
            },
            {
                "name": "unit",
                "type": "char",
                "size": 10
            },
            {
                "name": "deliveryTimeDescription",
                "type": "char",
                "size": 100
            },
            {
                "name": "isRestrict",
                "type": "tinyint",
                "null": false
            }
        ],
        "keys": [
            {
                "name": "product",
                "type": "id",
                "null": false,
                "ID": "productx",
                "tuid": "productx"
            },
            {
                "name": "salesRegion",
                "type": "id",
                "null": false,
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "isOpen": true,
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "productcache": {
        "name": "ProductCache",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "level",
                "type": "int",
                "null": false
            },
            {
                "name": "hasStock",
                "type": "smallint",
                "null": false
            }
        ],
        "keys": [
            {
                "name": "product",
                "type": "id",
                "null": false,
                "ID": "productx",
                "tuid": "productx"
            },
            {
                "name": "salesRegion",
                "type": "id",
                "null": false,
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "packsaleslevel": {
        "name": "PackSalesLevel",
        "type": "tuid",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "name",
                "type": "char",
                "null": false,
                "size": 50
            },
            {
                "name": "no",
                "type": "char",
                "null": false,
                "size": 10
            }
        ],
        "global": false,
        "sync": false,
        "id": "id",
        "search": [
            "name"
        ],
        "main": [
            "name"
        ]
    },
    "product2c": {
        "name": "Product2c",
        "type": "idx",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id"
            },
            {
                "name": "createDate",
                "type": "datetime"
            }
        ],
        "update": true
    },
    "productcategory": {
        "name": "ProductCategory",
        "type": "tuid",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "no",
                "type": "int",
                "null": false
            },
            {
                "name": "parent",
                "type": "id",
                "ID": "productcategory",
                "tuid": "productcategory"
            },
            {
                "name": "isLeaf",
                "type": "tinyint",
                "null": false
            },
            {
                "name": "orderWithinParent",
                "type": "int"
            }
        ],
        "isOpen": true,
        "global": false,
        "sync": false,
        "id": "id",
        "unique": [
            "no"
        ],
        "search": [
            "no",
            "parent",
            "isleaf",
            "orderwithinparent"
        ],
        "main": [
            "no",
            "parent",
            "isLeaf",
            "orderWithinParent"
        ],
        "arrs": [
            {
                "name": "productcategorylanguage",
                "fields": [
                    {
                        "name": "language",
                        "type": "id",
                        "ID": "language",
                        "tuid": "language"
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 200
                    }
                ],
                "id": "id",
                "owner": "owner",
                "order": "$order",
                "main": [
                    "language",
                    "name"
                ]
            }
        ]
    },
    "productproductcategory": {
        "name": "ProductProductCategory",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [],
        "keys": [
            {
                "name": "product",
                "type": "id",
                "null": false,
                "ID": "productx",
                "tuid": "productx"
            },
            {
                "name": "category",
                "type": "id",
                "null": false,
                "ID": "productcategory",
                "tuid": "productcategory"
            }
        ],
        "isOpen": true,
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "productcategoryinclusion": {
        "name": "ProductCategoryInclusion",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "total",
                "type": "int",
                "null": false
            }
        ],
        "keys": [
            {
                "name": "category",
                "type": "id",
                "null": false,
                "ID": "productcategory",
                "tuid": "productcategory"
            },
            {
                "name": "salesRegion",
                "type": "id",
                "null": false,
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "productproductcategorycache": {
        "name": "ProductProductCategoryCache",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "product",
                "type": "id",
                "ID": "productx",
                "tuid": "productx"
            }
        ],
        "keys": [
            {
                "name": "salesRegion",
                "type": "id",
                "null": false,
                "ID": "salesregion",
                "tuid": "salesregion"
            },
            {
                "name": "category",
                "type": "id",
                "null": false,
                "ID": "productcategory",
                "tuid": "productcategory"
            },
            {
                "name": "order",
                "type": "int",
                "null": false
            }
        ],
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "productcategoryleafcache": {
        "name": "ProductCategoryLeafCache",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [],
        "keys": [
            {
                "name": "parent",
                "type": "id",
                "null": false,
                "ID": "productcategory",
                "tuid": "productcategory"
            },
            {
                "name": "leaf",
                "type": "id",
                "null": false,
                "ID": "productcategory",
                "tuid": "productcategory"
            }
        ],
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "productcategoryresearchdomain": {
        "name": "ProductCategoryResearchDomain",
        "type": "ix",
        "private": false,
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
        "ixx": false,
        "hasSort": false,
        "xiType": 0
    },
    "getrootcategories": {
        "name": "GetRootCategories",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "salesRegion",
                "type": "id",
                "ID": "salesregion",
                "tuid": "salesregion"
            },
            {
                "name": "language",
                "type": "id",
                "ID": "language",
                "tuid": "language"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "productCategory",
                        "type": "int"
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "total",
                        "type": "int"
                    }
                ]
            }
        ]
    },
    "getrootcategory": {
        "name": "GetRootCategory",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "salesRegion",
                "type": "id",
                "ID": "salesregion",
                "tuid": "salesregion"
            },
            {
                "name": "language",
                "type": "id",
                "ID": "language",
                "tuid": "language"
            }
        ],
        "returns": [
            {
                "name": "first",
                "fields": [
                    {
                        "name": "productCategory",
                        "type": "id",
                        "ID": "productcategory",
                        "tuid": "productcategory"
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "total",
                        "type": "int"
                    }
                ]
            },
            {
                "name": "secend",
                "fields": [
                    {
                        "name": "productCategory",
                        "type": "id",
                        "ID": "productcategory",
                        "tuid": "productcategory"
                    },
                    {
                        "name": "parent",
                        "type": "id"
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "total",
                        "type": "int"
                    }
                ]
            },
            {
                "name": "third",
                "fields": [
                    {
                        "name": "productCategory",
                        "type": "id",
                        "ID": "productcategory",
                        "tuid": "productcategory"
                    },
                    {
                        "name": "parent",
                        "type": "id"
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "total",
                        "type": "int"
                    }
                ]
            }
        ]
    },
    "getchildrencategory": {
        "name": "GetChildrenCategory",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "parent",
                "type": "id",
                "ID": "productcategory",
                "tuid": "productcategory"
            },
            {
                "name": "salesRegion",
                "type": "id",
                "ID": "salesregion",
                "tuid": "salesregion"
            },
            {
                "name": "language",
                "type": "id",
                "ID": "language",
                "tuid": "language"
            }
        ],
        "returns": [
            {
                "name": "first",
                "fields": [
                    {
                        "name": "productCategory",
                        "type": "id",
                        "ID": "productcategory",
                        "tuid": "productcategory"
                    },
                    {
                        "name": "parent",
                        "type": "id"
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "total",
                        "type": "int"
                    }
                ]
            },
            {
                "name": "secend",
                "fields": [
                    {
                        "name": "productCategory",
                        "type": "id",
                        "ID": "productcategory",
                        "tuid": "productcategory"
                    },
                    {
                        "name": "parent",
                        "type": "id"
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "total",
                        "type": "int"
                    }
                ]
            }
        ]
    },
    "searchproductbycategory": {
        "name": "SearchProductByCategory",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "productCategory",
                "type": "id",
                "ID": "productcategory",
                "tuid": "productcategory"
            },
            {
                "name": "salesRegion",
                "type": "id",
                "ID": "salesregion",
                "tuid": "salesregion"
            },
            {
                "name": "language",
                "type": "id",
                "ID": "language",
                "tuid": "language"
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "seq",
                        "type": "bigint"
                    },
                    {
                        "name": "id",
                        "type": "id",
                        "ID": "productx",
                        "tuid": "productx"
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "brand",
                        "type": "id",
                        "ID": "brand",
                        "tuid": "brand"
                    },
                    {
                        "name": "origin",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "description",
                        "type": "char",
                        "size": 1000
                    },
                    {
                        "name": "descriptionC",
                        "type": "char",
                        "size": 1000
                    },
                    {
                        "name": "imageUrl",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "chemical",
                        "type": "id",
                        "ID": "chemical",
                        "tuid": "chemical"
                    },
                    {
                        "name": "CAS",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "purity",
                        "type": "char",
                        "size": 80
                    },
                    {
                        "name": "molecularFomula",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "molecularWeight",
                        "type": "char",
                        "size": 30
                    }
                ],
                "order": "asc"
            }
        ]
    },
    "countproductcategoryinclusion": {
        "name": "CountProductCategoryInclusion",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": []
    },
    "addresearchproductcategory": {
        "name": "addResearchProductCategory",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "research",
                "type": "id"
            },
            {
                "name": "productCategory",
                "type": "id"
            }
        ],
        "returns": []
    },
    "deleteresearchproductcategory": {
        "name": "deleteResearchProductCategory",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "research",
                "type": "id"
            },
            {
                "name": "productCategory",
                "type": "id"
            }
        ],
        "returns": []
    },
    "getresearchbyproductcategory": {
        "name": "GetResearchByProductCategory",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "productCategory",
                "type": "id",
                "ID": "productcategory",
                "tuid": "productcategory"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "productCategory",
                        "type": "id",
                        "ID": "productcategory",
                        "tuid": "productcategory"
                    },
                    {
                        "name": "research",
                        "type": "id",
                        "ID": "research",
                        "tuid": "research"
                    }
                ]
            }
        ]
    },
    "productmsdsfile": {
        "name": "ProductMSDSFile",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "fileName",
                "type": "char",
                "size": 50
            }
        ],
        "keys": [
            {
                "name": "product",
                "type": "id",
                "null": false,
                "ID": "productx",
                "tuid": "productx"
            },
            {
                "name": "language",
                "type": "id",
                "null": false,
                "ID": "language",
                "tuid": "language"
            }
        ],
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "productspecfile": {
        "name": "ProductSpecFile",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "fileName",
                "type": "char",
                "size": 50
            }
        ],
        "keys": [
            {
                "name": "product",
                "type": "id",
                "null": false,
                "ID": "productx",
                "tuid": "productx"
            }
        ],
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "productusermanualfile": {
        "name": "ProductUserManualFile",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "fileName",
                "type": "char",
                "size": 50
            }
        ],
        "keys": [
            {
                "name": "product",
                "type": "id",
                "null": false,
                "ID": "productx",
                "tuid": "productx"
            },
            {
                "name": "language",
                "type": "id",
                "null": false,
                "ID": "language",
                "tuid": "language"
            }
        ],
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "productembargo": {
        "name": "ProductEmbargo",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "type",
                "type": "char",
                "null": false,
                "size": 10
            },
            {
                "name": "packDescription",
                "type": "char",
                "size": 50
            },
            {
                "name": "beginDate",
                "type": "date",
                "null": false
            },
            {
                "name": "endDate",
                "type": "date"
            },
            {
                "name": "isValid",
                "type": "smallint",
                "null": false
            }
        ],
        "keys": [
            {
                "name": "product",
                "type": "id",
                "null": false,
                "ID": "productx",
                "tuid": "productx"
            },
            {
                "name": "salesRegion",
                "type": "id",
                "null": false,
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "isOpen": true,
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "packageembargo": {
        "name": "PackageEmbargo",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "EmbargoNote",
                "type": "char",
                "size": 20
            }
        ],
        "keys": [
            {
                "name": "pack",
                "type": "id",
                "null": false,
                "ID": "productx",
                "tuid": "productx",
                "arr": "packx"
            },
            {
                "name": "salesRegion",
                "type": "id",
                "null": false,
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "isOpen": true,
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "productextention": {
        "name": "ProductExtention",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "content",
                "type": "text"
            }
        ],
        "keys": [
            {
                "name": "product",
                "type": "id",
                "null": false,
                "ID": "productx",
                "tuid": "productx"
            }
        ],
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "productstandardsample": {
        "name": "ProductStandardSample",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "content",
                "type": "text"
            }
        ],
        "keys": [
            {
                "name": "product",
                "type": "id",
                "null": false,
                "ID": "productx",
                "tuid": "productx"
            }
        ],
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "getproductbyorigin": {
        "name": "GetProductByOrigin",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "origin",
                "type": "char",
                "size": 50
            },
            {
                "name": "salesRegion",
                "type": "id",
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "ID": "productx",
                        "tuid": "productx"
                    }
                ]
            }
        ]
    },
    "getproductpackbyorigin": {
        "name": "GetProductPackByOrigin",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "origin",
                "type": "char",
                "size": 50
            },
            {
                "name": "salesRegion",
                "type": "id",
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "product",
                        "type": "id",
                        "ID": "productx",
                        "tuid": "productx"
                    },
                    {
                        "name": "pack",
                        "type": "id",
                        "owner": "product",
                        "arr": "packx"
                    }
                ]
            }
        ]
    },
    "getavailableproductbyid": {
        "name": "GetAvailableProductById",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "product",
                "type": "id",
                "ID": "productx",
                "tuid": "productx"
            },
            {
                "name": "salesRegion",
                "type": "id",
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "ID": "productx",
                        "tuid": "productx"
                    },
                    {
                        "name": "brand",
                        "type": "id",
                        "ID": "brand",
                        "tuid": "brand"
                    },
                    {
                        "name": "origin",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "description",
                        "type": "char",
                        "size": 1000
                    },
                    {
                        "name": "descriptionC",
                        "type": "char",
                        "size": 1000
                    },
                    {
                        "name": "imageUrl",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "isValid",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    },
    "getfuturedeliverytime": {
        "name": "GetFutureDeliveryTime",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "product",
                "type": "id",
                "ID": "productx",
                "tuid": "productx"
            },
            {
                "name": "salesRegion",
                "type": "id",
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "minValue",
                        "type": "int"
                    },
                    {
                        "name": "maxValue",
                        "type": "int"
                    },
                    {
                        "name": "unit",
                        "type": "char",
                        "size": 10
                    },
                    {
                        "name": "deliveryTimeDescription",
                        "type": "char",
                        "size": 100
                    }
                ]
            }
        ]
    },
    "searchproduct": {
        "name": "SearchProduct",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "keyWord",
                "type": "char",
                "size": 100
            },
            {
                "name": "salesRegion",
                "type": "id",
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "seq",
                        "type": "bigint"
                    },
                    {
                        "name": "id",
                        "type": "id",
                        "ID": "productx",
                        "tuid": "productx"
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "brand",
                        "type": "id",
                        "ID": "brand",
                        "tuid": "brand"
                    },
                    {
                        "name": "origin",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "description",
                        "type": "char",
                        "size": 1000
                    },
                    {
                        "name": "descriptionC",
                        "type": "char",
                        "size": 1000
                    },
                    {
                        "name": "imageUrl",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "chemical",
                        "type": "id",
                        "ID": "chemical",
                        "tuid": "chemical"
                    },
                    {
                        "name": "CAS",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "purity",
                        "type": "char",
                        "size": 80
                    },
                    {
                        "name": "gradeCN",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "molecularFomula",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "molecularWeight",
                        "type": "char",
                        "size": 30
                    }
                ],
                "order": "asc"
            }
        ]
    },
    "getpack": {
        "name": "GetPack",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "brandName",
                "type": "char",
                "size": 20
            },
            {
                "name": "origin",
                "type": "char",
                "size": 50
            },
            {
                "name": "radiox",
                "type": "dec",
                "scale": 2,
                "precision": 12
            },
            {
                "name": "radioy",
                "type": "dec",
                "scale": 4,
                "precision": 12
            },
            {
                "name": "unit",
                "type": "char",
                "size": 20
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "product",
                        "type": "id",
                        "ID": "productx",
                        "tuid": "productx"
                    },
                    {
                        "name": "pack",
                        "type": "id",
                        "ID": "productx",
                        "tuid": "productx",
                        "arr": "packx"
                    },
                    {
                        "name": "jkcat",
                        "type": "char",
                        "size": 50
                    }
                ]
            }
        ]
    },
    "getproductprices": {
        "name": "GetProductPrices",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "product",
                "type": "id",
                "ID": "productx",
                "tuid": "productx"
            },
            {
                "name": "salesRegion",
                "type": "id",
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "product",
                        "type": "id",
                        "ID": "productx",
                        "tuid": "productx"
                    },
                    {
                        "name": "pack",
                        "type": "id",
                        "owner": "product",
                        "arr": "packx"
                    },
                    {
                        "name": "salesRegion",
                        "type": "id",
                        "ID": "salesregion",
                        "tuid": "salesregion"
                    },
                    {
                        "name": "retail",
                        "type": "dec",
                        "scale": 2,
                        "precision": 12
                    },
                    {
                        "name": "expireDate",
                        "type": "datetime"
                    },
                    {
                        "name": "discountinued",
                        "type": "tinyint"
                    },
                    {
                        "name": "salesLevel",
                        "type": "id",
                        "ID": "packsaleslevel",
                        "tuid": "packsaleslevel"
                    }
                ]
            }
        ]
    },
    "getproductbypackid": {
        "name": "GetProductByPackId",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "pack",
                "type": "id",
                "ID": "productx",
                "tuid": "productx",
                "arr": "packx"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "product",
                        "type": "id",
                        "ID": "productx",
                        "tuid": "productx"
                    },
                    {
                        "name": "origin",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "description",
                        "type": "char",
                        "size": 1000
                    },
                    {
                        "name": "descriptionC",
                        "type": "char",
                        "size": 1000
                    },
                    {
                        "name": "brand",
                        "type": "id",
                        "ID": "brand",
                        "tuid": "brand"
                    },
                    {
                        "name": "brandName",
                        "type": "char",
                        "size": 50
                    }
                ]
            }
        ]
    },
    "productsalesrank": {
        "name": "ProductSalesRank",
        "type": "map",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "rank",
                "type": "int",
                "null": false
            }
        ],
        "keys": [
            {
                "name": "product",
                "type": "id",
                "null": false,
                "ID": "productx",
                "tuid": "productx"
            }
        ],
        "actions": {
            "add": "$add$",
            "del": "$del$"
        },
        "queries": {
            "all": "$all$",
            "page": "$page$",
            "query": "$query$"
        }
    },
    "pricexquery": {
        "name": "PriceXquery",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "product",
                "type": "id",
                "ID": "productx",
                "tuid": "productx"
            },
            {
                "name": "pack",
                "type": "id",
                "owner": "product",
                "arr": "packx"
            },
            {
                "name": "salesRegion",
                "type": "id",
                "ID": "salesregion",
                "tuid": "salesregion"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "product",
                        "type": "id",
                        "ID": "productx",
                        "tuid": "productx"
                    },
                    {
                        "name": "pack",
                        "type": "id",
                        "owner": "product",
                        "arr": "packx"
                    },
                    {
                        "name": "salesRegion",
                        "type": "id",
                        "ID": "salesregion",
                        "tuid": "salesregion"
                    },
                    {
                        "name": "expireDate",
                        "type": "datetime"
                    },
                    {
                        "name": "discountinued",
                        "type": "tinyint"
                    },
                    {
                        "name": "retail",
                        "type": "dec",
                        "scale": 2,
                        "precision": 12
                    }
                ]
            }
        ]
    }
};
//# sourceMappingURL=UqDefault.js.map