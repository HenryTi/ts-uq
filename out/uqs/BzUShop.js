"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uqSchema = exports.Role = exports.EnumRoleShop = exports.EnumRole = exports.ConstType = void 0;
exports.ConstType = {
    category: "category",
    tag: "tag"
};
var EnumRole;
(function (EnumRole) {
    EnumRole["shopmanager"] = "shopmanager";
})(EnumRole = exports.EnumRole || (exports.EnumRole = {}));
;
var EnumRoleShop;
(function (EnumRoleShop) {
    EnumRoleShop["product"] = "shop.product";
    EnumRoleShop["price"] = "shop.price";
    EnumRoleShop["delivery"] = "shop.delivery";
    EnumRoleShop["accountant"] = "shop.accountant";
})(EnumRoleShop = exports.EnumRoleShop || (exports.EnumRoleShop = {}));
;
exports.Role = {
    $: [
        EnumRole.shopmanager,
    ],
    shop: [
        EnumRoleShop.product, EnumRoleShop.price, EnumRoleShop.delivery, EnumRoleShop.accountant,
    ],
};
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
    "consttype": {
        "name": "ConstType",
        "type": "const",
        "private": false,
        "sys": true,
        "fields": [],
        "values": {
            "category": "category",
            "tag": "tag"
        }
    },
    "type": {
        "name": "Type",
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
                "name": "unit",
                "type": "id"
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "keys": [
            {
                "name": "unit",
                "type": "id"
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "nameNoVice": [
            "name"
        ],
        "global": false,
        "idType": 3,
        "isMinute": false
    },
    "tag": {
        "name": "Tag",
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
                "name": "unit",
                "type": "id"
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            },
            {
                "name": "discription",
                "type": "char",
                "size": 100
            }
        ],
        "keys": [
            {
                "name": "unit",
                "type": "id"
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "nameNoVice": [
            "name"
        ],
        "global": false,
        "idType": 3,
        "isMinute": false
    },
    "ixtag": {
        "name": "IxTag",
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
            },
            {
                "name": "seq",
                "type": "int",
                "null": false
            }
        ],
        "ixxx": false,
        "ixx": false,
        "hasSort": true,
        "xiType": 0
    },
    "ixcategoryitem": {
        "name": "IxCategoryItem",
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
            },
            {
                "name": "seq",
                "type": "int",
                "null": false
            }
        ],
        "ixxx": false,
        "ixx": false,
        "hasSort": true,
        "xiType": 0
    },
    "ixtagitem": {
        "name": "IxTagItem",
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
        "ixxx": false,
        "ixx": false,
        "hasSort": false,
        "xiType": 0
    },
    "itemsale": {
        "name": "ItemSale",
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
                "size": 100
            },
            {
                "name": "icon",
                "type": "char",
                "size": 100
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
        "idType": 3,
        "isMinute": true
    },
    "itempacksale": {
        "name": "ItemPackSale",
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
                "name": "item",
                "type": "id"
            },
            {
                "name": "pack",
                "type": "id"
            }
        ],
        "keys": [
            {
                "name": "item",
                "type": "id"
            },
            {
                "name": "pack",
                "type": "id"
            }
        ],
        "global": false,
        "idType": 3,
        "isMinute": true
    },
    "itembatchsale": {
        "name": "ItemBatchSale",
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
                "name": "item",
                "type": "id"
            },
            {
                "name": "batch",
                "type": "id"
            }
        ],
        "keys": [
            {
                "name": "item",
                "type": "id"
            },
            {
                "name": "batch",
                "type": "id"
            }
        ],
        "global": false,
        "idType": 3,
        "isMinute": true
    },
    "itempack": {
        "name": "ItemPack",
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
                "name": "discription",
                "type": "char",
                "size": 20
            },
            {
                "name": "item",
                "type": "id"
            },
            {
                "name": "pack",
                "type": "id"
            },
            {
                "name": "x",
                "type": "dec",
                "scale": 4,
                "precision": 8
            },
            {
                "name": "y",
                "type": "dec",
                "scale": 4,
                "precision": 8
            }
        ],
        "keys": [],
        "global": false,
        "idType": 3,
        "isMinute": true
    },
    "pack": {
        "name": "Pack",
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
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "keys": [
            {
                "name": "name",
                "type": "char",
                "size": 50
            }
        ],
        "nameNoVice": [
            "name"
        ],
        "global": false,
        "idType": 3,
        "isMinute": true
    },
    "batch": {
        "name": "Batch",
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
                "name": "item",
                "type": "id"
            },
            {
                "name": "product",
                "type": "date"
            },
            {
                "name": "expire",
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
        "idType": 3,
        "isMinute": true
    },
    "itemchemical": {
        "name": "ItemChemical",
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
                "name": "chemical",
                "type": "id"
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
        "idType": 3,
        "isMinute": true
    },
    "reagent": {
        "name": "Reagent",
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
                "name": "chemical",
                "type": "id"
            }
        ],
        "keys": [],
        "global": false,
        "idType": 3,
        "isMinute": true
    },
    "chemical": {
        "name": "Chemical",
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
                "name": "chinese",
                "type": "char",
                "size": 100
            },
            {
                "name": "english",
                "type": "char",
                "size": 100
            },
            {
                "name": "formula",
                "type": "char",
                "size": 100
            }
        ],
        "keys": [],
        "global": false,
        "idType": 3,
        "isMinute": true
    },
    "shop": {
        "name": "Shop",
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
                "size": 50
            },
            {
                "name": "discription",
                "type": "text"
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
        "idType": 2,
        "isMinute": true,
        "permit": "shop+"
    },
    "shelf": {
        "name": "Shelf",
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
                "name": "caption",
                "type": "char",
                "size": 100
            },
            {
                "name": "shop",
                "type": "id"
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
        "idType": 3,
        "isMinute": true
    },
    "savetag": {
        "name": "SaveTag",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "parent",
                "type": "id"
            },
            {
                "name": "unit",
                "type": "id"
            },
            {
                "name": "name",
                "type": "char",
                "size": 50
            },
            {
                "name": "discription",
                "type": "char",
                "size": 100
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    }
                ]
            }
        ]
    },
    "gettags": {
        "name": "GetTags",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "unit",
                "type": "id"
            },
            {
                "name": "id",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "types",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 50
                    }
                ]
            },
            {
                "name": "tags",
                "fields": [
                    {
                        "name": "parent",
                        "type": "id"
                    },
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "seq",
                        "type": "bigint"
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "discription",
                        "type": "char",
                        "size": 100
                    }
                ]
            },
            {
                "name": "subs",
                "fields": [
                    {
                        "name": "parent",
                        "type": "id"
                    },
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "seq",
                        "type": "bigint"
                    },
                    {
                        "name": "name",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "discription",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "count",
                        "type": "int"
                    }
                ]
            }
        ]
    },
    "$role": {
        "name": "$Role",
        "type": "$role",
        "private": false,
        "names": {
            "$": [
                "shopmanager"
            ],
            "shop": [
                "product",
                "price",
                "delivery",
                "accountant"
            ]
        }
    },
    "a": {
        "name": "a",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": []
    },
    "role_my": {
        "name": "role_my",
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
                        "name": "user",
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
                        "name": "unitProps",
                        "type": "text"
                    }
                ]
            },
            {
                "name": "roles",
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
                        "name": "user",
                        "type": "id"
                    },
                    {
                        "name": "role",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "entity",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "unitProps",
                        "type": "text"
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
    }
};
//# sourceMappingURL=BzUShop.js.map