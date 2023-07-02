"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumSetting = exports.EnumSubject = exports.EnumDetail = exports.EnumSheet = exports.EnumAtom = exports.uqSchema = exports.MetricItem = exports.Metric = exports.CurrencyName = exports.MetricType = exports.EnumBizType = exports.EnumID = void 0;
var EnumID;
(function (EnumID) {
    EnumID["$phrase"] = "$phrase";
    EnumID["Metric"] = "metric";
    EnumID["MetricItem"] = "metricitem";
    EnumID["AtomMetric"] = "atommetric";
    EnumID["AtomMetricSpec"] = "atommetricspec";
    EnumID["Bud"] = "bud";
    EnumID["History"] = "history";
    EnumID["Formula"] = "formula";
    EnumID["Atom"] = "atom";
    EnumID["Sheet"] = "sheet";
    EnumID["Detail"] = "detail";
    EnumID["Pend"] = "pend";
})(EnumID = exports.EnumID || (exports.EnumID = {}));
var EnumBizType;
(function (EnumBizType) {
    EnumBizType[EnumBizType["atom"] = 1] = "atom";
    EnumBizType[EnumBizType["sheet"] = 2] = "sheet";
    EnumBizType[EnumBizType["key"] = 11] = "key";
    EnumBizType[EnumBizType["prop"] = 12] = "prop";
    EnumBizType[EnumBizType["assign"] = 13] = "assign";
    EnumBizType[EnumBizType["permit"] = 14] = "permit";
    EnumBizType[EnumBizType["with"] = 15] = "with";
    EnumBizType[EnumBizType["role"] = 16] = "role";
})(EnumBizType = exports.EnumBizType || (exports.EnumBizType = {}));
var MetricType;
(function (MetricType) {
    MetricType[MetricType["count"] = 1] = "count";
    MetricType[MetricType["length"] = 2] = "length";
    MetricType[MetricType["area"] = 3] = "area";
    MetricType[MetricType["volume"] = 4] = "volume";
    MetricType[MetricType["weight"] = 5] = "weight";
    MetricType[MetricType["time"] = 6] = "time";
    MetricType[MetricType["currency"] = 7] = "currency";
})(MetricType = exports.MetricType || (exports.MetricType = {}));
exports.CurrencyName = {
    cny: "cny",
    usd: "usd",
    jpy: "jpy"
};
exports.Metric = {};
exports.MetricItem = {};
exports.uqSchema = {
    "$phrase": {
        "name": "$phrase",
        "type": "id",
        "private": false,
        "fields": [
            {
                "name": "name",
                "type": "char",
                "size": 200
            },
            {
                "name": "caption",
                "type": "char",
                "size": 100
            },
            {
                "name": "base",
                "type": "bigint"
            },
            {
                "name": "valid",
                "type": "tinyint"
            },
            {
                "name": "owner",
                "type": "bigint"
            },
            {
                "name": "type",
                "type": "tinyint"
            }
        ],
        "keys": [],
        "global": false,
        "isMinute": false
    },
    "$ixphrase": {
        "name": "$ixphrase",
        "type": "ix",
        "private": false,
        "fields": [
            {
                "name": "type",
                "type": "tinyint",
                "null": false
            }
        ],
        "ixx": false,
        "hasSort": false
    },
    "$role_my": {
        "name": "$role_my",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "sites",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "site",
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
                    },
                    {
                        "name": "def",
                        "type": "tinyint"
                    }
                ]
            },
            {
                "name": "roles",
                "fields": [
                    {
                        "name": "site",
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
                "name": "permits",
                "fields": [
                    {
                        "name": "site",
                        "type": "id"
                    },
                    {
                        "name": "permit",
                        "type": "char",
                        "size": 100
                    }
                ]
            }
        ]
    },
    "$role_site_users": {
        "name": "$role_site_users",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "site",
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
    "$role_site_add_admin": {
        "name": "$role_site_add_admin",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "site",
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
    "$role_site_del_admin": {
        "name": "$role_site_del_admin",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "site",
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
    "$role_site_add_user": {
        "name": "$role_site_add_user",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "site",
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
    "$role_site_user_role": {
        "name": "$role_site_user_role",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "site",
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
    "$role_site_quit_owner": {
        "name": "$role_site_quit_owner",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "site",
                "type": "bigint"
            }
        ],
        "returns": []
    },
    "$sites": {
        "name": "$sites",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "ex",
                        "type": "char",
                        "size": 100
                    }
                ],
                "order": "desc"
            }
        ]
    },
    "$setsite": {
        "name": "$setSite",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "site",
                "type": "id"
            }
        ],
        "returns": []
    },
    "enumbiztype": {
        "name": "EnumBizType",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "atom": 1,
            "sheet": 2,
            "key": 11,
            "prop": 12,
            "assign": 13,
            "permit": 14,
            "with": 15,
            "role": 16
        }
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
    "saveatom": {
        "name": "SaveAtom",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "atom",
                "type": "char",
                "size": 100
            },
            {
                "name": "no",
                "type": "char",
                "size": 30
            },
            {
                "name": "ex",
                "type": "char",
                "size": 200
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
    "savebud": {
        "name": "SaveBud",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "phrase",
                "type": "char",
                "size": 200
            },
            {
                "name": "id",
                "type": "id"
            },
            {
                "name": "int",
                "type": "bigint"
            },
            {
                "name": "dec",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "str",
                "type": "char",
                "size": 100
            }
        ],
        "returns": []
    },
    "savespec": {
        "name": "SaveSpec",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "spec",
                "type": "char",
                "size": 100
            },
            {
                "name": "atom",
                "type": "id"
            },
            {
                "name": "values",
                "type": "char",
                "size": 300
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
    "savesheet": {
        "name": "SaveSheet",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "sheet",
                "type": "char",
                "size": 100
            },
            {
                "name": "no",
                "type": "char",
                "size": 30
            },
            {
                "name": "target",
                "type": "id"
            },
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 18
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
    "savedetail": {
        "name": "SaveDetail",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "base",
                "type": "id"
            },
            {
                "name": "id",
                "type": "id"
            },
            {
                "name": "item",
                "type": "id"
            },
            {
                "name": "target",
                "type": "id"
            },
            {
                "name": "origin",
                "type": "id"
            },
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "v1",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "v2",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "v3",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "pendFrom",
                "type": "id"
            }
        ],
        "arrs": [
            {
                "name": "props",
                "fields": [
                    {
                        "name": "prop",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "propValue",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
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
    "removedraft": {
        "name": "RemoveDraft",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id"
            }
        ],
        "returns": []
    },
    "getmydrafts": {
        "name": "GetMyDrafts",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "base",
                        "type": "id"
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "target",
                        "type": "id"
                    },
                    {
                        "name": "operator",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "phrase",
                        "type": "char",
                        "size": 200
                    }
                ],
                "order": "desc"
            }
        ]
    },
    "searchatom": {
        "name": "SearchAtom",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "atom",
                "type": "char",
                "size": 200
            },
            {
                "name": "key",
                "type": "char",
                "size": 50
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "ex",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "phrase",
                        "type": "char",
                        "size": 200
                    }
                ],
                "order": "desc"
            }
        ]
    },
    "searchatombuds": {
        "name": "SearchAtomBuds",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "phrase",
                "type": "char",
                "size": 200
            },
            {
                "name": "key",
                "type": "char",
                "size": 50
            },
            {
                "name": "names",
                "type": "char",
                "size": 300
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "ex",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "phrase",
                        "type": "char",
                        "size": 200
                    }
                ],
                "order": "desc"
            },
            {
                "name": "meds",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "main",
                        "type": "id"
                    },
                    {
                        "name": "detail",
                        "type": "id"
                    }
                ]
            },
            {
                "name": "buds",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "bud",
                        "type": "id"
                    },
                    {
                        "name": "phrase",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "value",
                        "type": "char",
                        "size": 200
                    }
                ]
            }
        ]
    },
    "searchatommetricbuds": {
        "name": "SearchAtomMetricBuds",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "phrase",
                "type": "char",
                "size": 200
            },
            {
                "name": "key",
                "type": "char",
                "size": 50
            },
            {
                "name": "names",
                "type": "char",
                "size": 300
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "ex",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "phrase",
                        "type": "char",
                        "size": 200
                    }
                ],
                "order": "desc"
            },
            {
                "name": "meds",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "main",
                        "type": "id"
                    },
                    {
                        "name": "detail",
                        "type": "id"
                    }
                ]
            },
            {
                "name": "buds",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "bud",
                        "type": "id"
                    },
                    {
                        "name": "phrase",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "value",
                        "type": "char",
                        "size": 200
                    }
                ]
            }
        ]
    },
    "getsheet": {
        "name": "GetSheet",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id"
            },
            {
                "name": "buds",
                "type": "char",
                "size": 200
            }
        ],
        "returns": [
            {
                "name": "main",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "base",
                        "type": "id"
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "target",
                        "type": "id"
                    },
                    {
                        "name": "operator",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            },
            {
                "name": "details",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "base",
                        "type": "id"
                    },
                    {
                        "name": "item",
                        "type": "id"
                    },
                    {
                        "name": "target",
                        "type": "id"
                    },
                    {
                        "name": "origin",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "v1",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "v2",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "v3",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "done",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "pendFrom",
                        "type": "id"
                    },
                    {
                        "name": "pendValue",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "sheet",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 30
                    }
                ]
            },
            {
                "name": "origins",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "base",
                        "type": "id"
                    },
                    {
                        "name": "item",
                        "type": "id"
                    },
                    {
                        "name": "target",
                        "type": "id"
                    },
                    {
                        "name": "origin",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "v1",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "v2",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "v3",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "done",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            },
            {
                "name": "buds",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "bud",
                        "type": "id"
                    },
                    {
                        "name": "phrase",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "int",
                        "type": "bigint"
                    },
                    {
                        "name": "dec",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getatom": {
        "name": "GetAtom",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "main",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "phrase",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "ex",
                        "type": "char",
                        "size": 50
                    }
                ]
            },
            {
                "name": "buds",
                "fields": [
                    {
                        "name": "bud",
                        "type": "id"
                    },
                    {
                        "name": "phrase",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "value",
                        "type": "char",
                        "size": 200
                    }
                ]
            }
        ]
    },
    "metrictype": {
        "name": "MetricType",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "count": 1,
            "length": 2,
            "area": 3,
            "volume": 4,
            "weight": 5,
            "time": 6,
            "currency": 7
        }
    },
    "currencyname": {
        "name": "CurrencyName",
        "type": "const",
        "private": false,
        "sys": true,
        "fields": [],
        "values": {
            "cny": "cny",
            "usd": "usd",
            "jpy": "jpy"
        }
    },
    "metric": {
        "name": "Metric",
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
                "name": "base",
                "type": "id"
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "ex",
                "type": "char",
                "size": 50
            },
            {
                "name": "type",
                "type": "enum"
            },
            {
                "name": "template",
                "type": "id"
            }
        ],
        "values": {},
        "keys": [
            {
                "name": "base",
                "type": "id"
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "global": false,
        "idType": 3,
        "isMinute": false
    },
    "metricitem": {
        "name": "MetricItem",
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
                "name": "base",
                "type": "id",
                "ID": "metric",
                "tuid": "metric"
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "ex",
                "type": "char",
                "size": 50
            },
            {
                "name": "div",
                "type": "id",
                "ID": "metric",
                "tuid": "metric"
            },
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 9
            },
            {
                "name": "template",
                "type": "id"
            }
        ],
        "values": {},
        "keys": [
            {
                "name": "base",
                "type": "id",
                "ID": "metric",
                "tuid": "metric"
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "global": false,
        "idType": 3,
        "isMinute": false
    },
    "atommetric": {
        "name": "AtomMetric",
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
                "name": "atom",
                "type": "id",
                "ID": "atom",
                "tuid": "atom"
            },
            {
                "name": "metricItem",
                "type": "id",
                "ID": "metricitem",
                "tuid": "metricitem"
            }
        ],
        "keys": [
            {
                "name": "atom",
                "type": "id",
                "ID": "atom",
                "tuid": "atom"
            },
            {
                "name": "metricItem",
                "type": "id",
                "ID": "metricitem",
                "tuid": "metricitem"
            }
        ],
        "global": false,
        "idType": 3,
        "isMinute": false,
        "stars": [
            "atom",
            "metricItem"
        ]
    },
    "atommetricspec": {
        "name": "AtomMetricSpec",
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
                "name": "atomMetric",
                "type": "id",
                "ID": "atommetric",
                "tuid": "atommetric"
            },
            {
                "name": "spec",
                "type": "id"
            }
        ],
        "keys": [
            {
                "name": "atomMetric",
                "type": "id",
                "ID": "atommetric",
                "tuid": "atommetric"
            },
            {
                "name": "spec",
                "type": "id"
            }
        ],
        "global": false,
        "idType": 3,
        "isMinute": false,
        "stars": [
            "atomMetric",
            "spec"
        ]
    },
    "savemetric": {
        "name": "SaveMetric",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id"
            },
            {
                "name": "no",
                "type": "char",
                "size": 30
            },
            {
                "name": "ex",
                "type": "char",
                "size": 50
            },
            {
                "name": "type",
                "type": "enum"
            },
            {
                "name": "template",
                "type": "id"
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
    "savemetricitem": {
        "name": "SaveMetricItem",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "atom",
                "type": "id"
            },
            {
                "name": "id",
                "type": "id"
            },
            {
                "name": "base",
                "type": "id"
            },
            {
                "name": "no",
                "type": "char",
                "size": 30
            },
            {
                "name": "ex",
                "type": "char",
                "size": 50
            },
            {
                "name": "div",
                "type": "id",
                "ID": "metric",
                "tuid": "metric"
            },
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 9
            },
            {
                "name": "template",
                "type": "id"
            },
            {
                "name": "metricType",
                "type": "enum"
            },
            {
                "name": "metricTemplate",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "metric",
                        "type": "id"
                    },
                    {
                        "name": "atomMetric",
                        "type": "id"
                    }
                ]
            }
        ]
    },
    "saveatommetric": {
        "name": "SaveAtomMetric",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "atom",
                "type": "id"
            },
            {
                "name": "metricItem",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "ID": "atommetric",
                        "tuid": "atommetric"
                    }
                ]
            }
        ]
    },
    "saveatommetricspec": {
        "name": "SaveAtomMetricSpec",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "atomMetric",
                "type": "id"
            },
            {
                "name": "spec",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "ID": "atommetricspec",
                        "tuid": "atommetricspec"
                    }
                ]
            }
        ]
    },
    "getatommetric": {
        "name": "GetAtomMetric",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "base",
                        "type": "id"
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "ex",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "type",
                        "type": "enum"
                    },
                    {
                        "name": "template",
                        "type": "id"
                    }
                ]
            },
            {
                "name": "items",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "base",
                        "type": "id",
                        "ID": "metric",
                        "tuid": "metric"
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "ex",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "div",
                        "type": "id",
                        "ID": "metric",
                        "tuid": "metric"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 9
                    },
                    {
                        "name": "template",
                        "type": "id"
                    }
                ]
            }
        ]
    },
    "searchmetrictemplate": {
        "name": "SearchMetricTemplate",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "key",
                "type": "char",
                "size": 50
            },
            {
                "name": "metricType",
                "type": "enum"
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "base",
                        "type": "id"
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "ex",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "type",
                        "type": "enum"
                    },
                    {
                        "name": "template",
                        "type": "id"
                    }
                ],
                "order": "asc"
            }
        ]
    },
    "getmetricitems": {
        "name": "GetMetricItems",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "id",
                "type": "id",
                "ID": "metric",
                "tuid": "metric"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "base",
                        "type": "id",
                        "ID": "metric",
                        "tuid": "metric"
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "ex",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "div",
                        "type": "id",
                        "ID": "metric",
                        "tuid": "metric"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 9
                    },
                    {
                        "name": "template",
                        "type": "id"
                    }
                ]
            }
        ]
    },
    "getpendsheetfromno": {
        "name": "GetPendSheetFromNo",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "pend",
                "type": "char",
                "size": 200
            },
            {
                "name": "key",
                "type": "char",
                "size": 100
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "base",
                        "type": "id"
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "target",
                        "type": "id"
                    },
                    {
                        "name": "operator",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "sheet",
                        "type": "char",
                        "size": 200
                    }
                ],
                "order": "asc"
            }
        ]
    },
    "getpendsheetfromtarget": {
        "name": "GetPendSheetFromTarget",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "pend",
                "type": "char",
                "size": 200
            },
            {
                "name": "key",
                "type": "char",
                "size": 100
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "base",
                        "type": "id"
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 20
                    },
                    {
                        "name": "target",
                        "type": "id"
                    },
                    {
                        "name": "operator",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "sheet",
                        "type": "char",
                        "size": 200
                    }
                ],
                "order": "asc"
            }
        ]
    },
    "getpenddetailfromitem": {
        "name": "GetPendDetailFromItem",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "pend",
                "type": "char",
                "size": 200
            },
            {
                "name": "key",
                "type": "char",
                "size": 100
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "base",
                        "type": "id"
                    },
                    {
                        "name": "item",
                        "type": "id"
                    },
                    {
                        "name": "target",
                        "type": "id"
                    },
                    {
                        "name": "origin",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "v1",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "v2",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "v3",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "pend",
                        "type": "id"
                    },
                    {
                        "name": "pendValue",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "sheet",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 30
                    }
                ],
                "order": "asc"
            }
        ]
    },
    "getpenddetailfromsheetid": {
        "name": "GetPendDetailFromSheetId",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "pend",
                "type": "char",
                "size": 200
            },
            {
                "name": "sheetId",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id",
                        "null": false
                    },
                    {
                        "name": "base",
                        "type": "id"
                    },
                    {
                        "name": "item",
                        "type": "id"
                    },
                    {
                        "name": "target",
                        "type": "id"
                    },
                    {
                        "name": "origin",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "v1",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "v2",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "v3",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "pend",
                        "type": "id"
                    },
                    {
                        "name": "pendValue",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "sheet",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "no",
                        "type": "char",
                        "size": 30
                    }
                ]
            }
        ]
    },
    "ixbud": {
        "name": "IxBud",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "i",
                "type": "id"
            },
            {
                "name": "x",
                "type": "id"
            }
        ],
        "ixx": false,
        "hasSort": false,
        "xiType": 0
    },
    "bud": {
        "name": "Bud",
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
                "name": "base",
                "type": "id"
            },
            {
                "name": "phrase",
                "type": "id"
            }
        ],
        "keys": [
            {
                "name": "base",
                "type": "id"
            },
            {
                "name": "phrase",
                "type": "id"
            }
        ],
        "global": false,
        "idType": 3,
        "isMinute": false
    },
    "history": {
        "name": "History",
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
                "name": "subject",
                "type": "id"
            },
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "ref",
                "type": "id"
            }
        ],
        "keys": [],
        "global": false,
        "idType": 3,
        "isMinute": true
    },
    "formula": {
        "name": "Formula",
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
                "name": "from",
                "type": "id"
            },
            {
                "name": "tiePhrase",
                "type": "id"
            },
            {
                "name": "to",
                "type": "id"
            },
            {
                "name": "radio",
                "type": "dec",
                "scale": 4,
                "precision": 18
            }
        ],
        "keys": [
            {
                "name": "from",
                "type": "id"
            },
            {
                "name": "tiePhrase",
                "type": "id"
            },
            {
                "name": "to",
                "type": "id"
            }
        ],
        "global": false,
        "idType": 3,
        "isMinute": false
    },
    "atom": {
        "name": "Atom",
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
                "name": "base",
                "type": "id"
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "ex",
                "type": "char",
                "size": 200
            }
        ],
        "keys": [
            {
                "name": "base",
                "type": "id"
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "global": false,
        "idType": 3,
        "isMinute": false
    },
    "sheet": {
        "name": "Sheet",
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
                "name": "base",
                "type": "id"
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            },
            {
                "name": "target",
                "type": "id"
            },
            {
                "name": "operator",
                "type": "id"
            },
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 18
            }
        ],
        "keys": [
            {
                "name": "base",
                "type": "id"
            },
            {
                "name": "no",
                "type": "char",
                "size": 20
            }
        ],
        "global": false,
        "idType": 3,
        "isMinute": true
    },
    "detail": {
        "name": "Detail",
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
                "name": "base",
                "type": "id"
            },
            {
                "name": "item",
                "type": "id"
            },
            {
                "name": "target",
                "type": "id"
            },
            {
                "name": "origin",
                "type": "id"
            },
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "v1",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "v2",
                "type": "dec",
                "scale": 4,
                "precision": 18
            },
            {
                "name": "v3",
                "type": "dec",
                "scale": 4,
                "precision": 18
            }
        ],
        "keys": [],
        "global": false,
        "idType": 3,
        "isMinute": true
    },
    "pend": {
        "name": "Pend",
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
                "name": "base",
                "type": "id"
            },
            {
                "name": "detail",
                "type": "id"
            },
            {
                "name": "value",
                "type": "dec",
                "scale": 4,
                "precision": 18
            }
        ],
        "keys": [],
        "global": false,
        "idType": 3,
        "isMinute": true
    },
    "reportstorage": {
        "name": "ReportStorage",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "key",
                "type": "char",
                "size": 50
            },
            {
                "name": "subject",
                "type": "char",
                "size": 200
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "obj",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "init",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ],
                "order": "asc"
            }
        ]
    },
    "reportstorageatom": {
        "name": "ReportStorageAtom",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "key",
                "type": "char",
                "size": 50
            },
            {
                "name": "subject",
                "type": "char",
                "size": 200
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "obj",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "init",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ],
                "order": "asc"
            }
        ]
    },
    "reportstoragespec": {
        "name": "ReportStorageSpec",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "key",
                "type": "char",
                "size": 50
            },
            {
                "name": "subject",
                "type": "char",
                "size": 200
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "obj",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "init",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ],
                "order": "asc"
            }
        ]
    },
    "historystorage": {
        "name": "HistoryStorage",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "objId",
                "type": "id"
            },
            {
                "name": "subject",
                "type": "char",
                "size": 200
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "ref",
                        "type": "id"
                    },
                    {
                        "name": "sheetNo",
                        "type": "char",
                        "size": 30
                    },
                    {
                        "name": "sheetName",
                        "type": "char",
                        "size": 200
                    },
                    {
                        "name": "sheetCaption",
                        "type": "char",
                        "size": 100
                    }
                ],
                "order": "desc"
            }
        ]
    },
    "$biz": {
        "$user": {
            "name": "$user",
            "type": "$user"
        },
        "$unit": {
            "name": "$unit",
            "type": "$unit"
        },
        "b": {
            "name": "b",
            "type": "atom",
            "props": [
                {
                    "name": "a",
                    "type": "prop",
                    "dataType": "int"
                },
                {
                    "name": "b",
                    "type": "prop",
                    "dataType": "char",
                    "value": 1
                },
                {
                    "name": "c",
                    "type": "prop",
                    "dataType": "char"
                }
            ],
            "assigns": [
                {
                    "name": "流水",
                    "type": "assign",
                    "caption": "下一步",
                    "dataType": "char",
                    "value": "s2"
                }
            ]
        },
        "contact": {
            "name": "contact",
            "jName": "Contact",
            "type": "atom",
            "caption": "往来单位",
            "props": [
                {
                    "name": "a",
                    "type": "prop",
                    "caption": "联系人",
                    "dataType": "int"
                },
                {
                    "name": "b",
                    "type": "prop",
                    "caption": "类型",
                    "dataType": "radio",
                    "items": [
                        [
                            "big",
                            "大",
                            1
                        ],
                        [
                            "中",
                            null,
                            2
                        ],
                        [
                            "small",
                            "小",
                            3
                        ]
                    ]
                },
                {
                    "name": "c",
                    "type": "prop",
                    "caption": "可信度",
                    "dataType": "radio",
                    "items": [
                        [
                            "高",
                            null,
                            null
                        ],
                        [
                            "中",
                            null,
                            null
                        ],
                        [
                            "低",
                            null,
                            null
                        ]
                    ]
                },
                {
                    "name": "d",
                    "type": "prop",
                    "caption": "产品种类",
                    "dataType": "check",
                    "items": [
                        [
                            "中药",
                            null,
                            null
                        ],
                        [
                            "片剂",
                            null,
                            null
                        ],
                        [
                            "水剂",
                            null,
                            null
                        ],
                        [
                            "器械",
                            null,
                            null
                        ]
                    ]
                }
            ],
            "states": [
                {
                    "name": "可用",
                    "type": "atomstate"
                },
                {
                    "name": "禁用",
                    "type": "atomstate"
                },
                {
                    "name": "经理级别可见",
                    "type": "atomstate"
                }
            ]
        },
        "goods": {
            "name": "goods",
            "jName": "Goods",
            "type": "atom",
            "caption": "商品",
            "props": [
                {
                    "name": "厂家",
                    "type": "prop",
                    "dataType": "ID",
                    "atom": "contact"
                }
            ],
            "assigns": [
                {
                    "name": "retailprice",
                    "type": "assign",
                    "caption": "零售价",
                    "dataType": "dec"
                }
            ],
            "metric": "*"
        },
        "toy": {
            "name": "toy",
            "jName": "Toy",
            "type": "atom",
            "caption": "玩具",
            "base": "goods",
            "metric": "count"
        },
        "batchvalid": {
            "name": "batchvalid",
            "jName": "BatchValid",
            "type": "spec",
            "caption": "批次",
            "props": [
                {
                    "name": "效期",
                    "type": "prop",
                    "dataType": "date"
                }
            ],
            "keys": [
                {
                    "name": "no",
                    "type": "key",
                    "caption": "批次",
                    "dataType": "char"
                }
            ]
        },
        "batchvalid1": {
            "name": "batchvalid1",
            "jName": "BatchValid1",
            "type": "spec",
            "caption": "批次生成日期",
            "keys": [
                {
                    "name": "no",
                    "type": "key",
                    "caption": "批次",
                    "dataType": "char"
                },
                {
                    "name": "效期",
                    "type": "key",
                    "dataType": "date"
                }
            ]
        },
        "medicine": {
            "name": "medicine",
            "jName": "Medicine",
            "type": "atom",
            "caption": "药品",
            "props": [
                {
                    "name": "specification",
                    "type": "prop",
                    "caption": "规格",
                    "dataType": "char"
                }
            ],
            "base": "goods",
            "spec": "batchvalid",
            "metric": "count"
        },
        "medicinechinese": {
            "name": "medicinechinese",
            "jName": "MedicineChinese",
            "type": "atom",
            "caption": "中药",
            "props": [
                {
                    "name": "approvalchin",
                    "type": "prop",
                    "caption": "中药批号",
                    "dataType": "char"
                }
            ],
            "base": "medicine"
        },
        "specialmedicinechinese": {
            "name": "specialmedicinechinese",
            "jName": "SpecialMedicineChinese",
            "type": "atom",
            "caption": "中药饮品",
            "props": [
                {
                    "name": "approvalchin",
                    "type": "prop",
                    "caption": "中药批号",
                    "dataType": "char"
                }
            ],
            "base": "medicine",
            "spec": "batchvalid1"
        },
        "medicaldevice": {
            "name": "medicaldevice",
            "jName": "MedicalDevice",
            "type": "atom",
            "caption": "医疗器械",
            "base": "goods",
            "metric": "count"
        },
        "specshoe": {
            "name": "specshoe",
            "jName": "SpecShoe",
            "type": "spec",
            "caption": "型号",
            "keys": [
                {
                    "name": "size",
                    "type": "key",
                    "caption": "尺码",
                    "dataType": "char"
                },
                {
                    "name": "color",
                    "type": "key",
                    "caption": "颜色",
                    "dataType": "char"
                }
            ]
        },
        "shoe": {
            "name": "shoe",
            "jName": "Shoe",
            "type": "atom",
            "caption": "鞋",
            "base": "goods",
            "spec": "specshoe"
        },
        "concactproduct": {
            "name": "concactproduct",
            "jName": "ConcactProduct",
            "type": "tie",
            "caption": "ConcactProduct"
        },
        "departmentmember": {
            "name": "departmentmember",
            "jName": "DepartmentMember",
            "type": "tie",
            "caption": "部门",
            "props": [
                {
                    "name": "director",
                    "type": "prop",
                    "dataType": "int"
                },
                {
                    "name": "senior",
                    "type": "prop",
                    "dataType": "int"
                },
                {
                    "name": "junior",
                    "type": "prop",
                    "dataType": "int"
                }
            ]
        },
        "a菜单": {
            "name": "a菜单",
            "jName": "A菜单",
            "type": "permit",
            "caption": "A菜单",
            "items": [
                {
                    "phrase": "permit.a菜单.i1",
                    "name": "i1"
                },
                {
                    "phrase": "permit.a菜单.i2",
                    "name": "i2"
                },
                {
                    "phrase": "permit.a菜单.i4",
                    "name": "i4"
                }
            ],
            "permits": []
        },
        "销售1": {
            "name": "销售1",
            "type": "permit",
            "items": [
                {
                    "phrase": "permit.销售1.入库",
                    "name": "入库"
                },
                {
                    "phrase": "permit.销售1.发货",
                    "name": "发货"
                },
                {
                    "phrase": "permit.销售1.检验",
                    "name": "检验"
                }
            ],
            "permits": []
        },
        "入库": {
            "name": "入库",
            "type": "permit",
            "items": [
                {
                    "phrase": "permit.入库.上架",
                    "name": "上架"
                },
                {
                    "phrase": "permit.入库.收货",
                    "name": "收货"
                }
            ],
            "permits": []
        },
        "检验": {
            "name": "检验",
            "type": "permit",
            "items": [
                {
                    "phrase": "permit.检验.初检",
                    "name": "初检"
                },
                {
                    "phrase": "permit.检验.复检",
                    "name": "复检"
                }
            ],
            "permits": [
                "入库"
            ]
        },
        "经理": {
            "name": "经理",
            "type": "role"
        },
        "销售部经理": {
            "name": "销售部经理",
            "type": "role"
        },
        "检验员": {
            "name": "检验员",
            "type": "role"
        },
        "accountsetting": {
            "name": "accountsetting",
            "jName": "AccountSetting",
            "type": "setting",
            "caption": "AccountSetting",
            "props": [
                {
                    "name": "name",
                    "type": "prop",
                    "caption": "单位名称",
                    "dataType": "char"
                },
                {
                    "name": "库存上限",
                    "type": "prop",
                    "dataType": "dec"
                }
            ],
            "assigns": [
                {
                    "name": "库存下限",
                    "type": "assign",
                    "dataType": "dec"
                }
            ]
        },
        "personsetting": {
            "name": "personsetting",
            "jName": "PersonSetting",
            "type": "setting",
            "caption": "PersonSetting",
            "props": [
                {
                    "name": "name",
                    "type": "prop",
                    "caption": "名字",
                    "dataType": "char"
                },
                {
                    "name": "工时上限",
                    "type": "prop",
                    "dataType": "int"
                }
            ],
            "assigns": [
                {
                    "name": "工时下限",
                    "type": "assign",
                    "dataType": "int"
                }
            ]
        },
        "price": {
            "name": "price",
            "jName": "Price",
            "type": "setting",
            "caption": "Price",
            "assigns": [
                {
                    "name": "retail",
                    "type": "assign",
                    "dataType": "dec"
                }
            ]
        },
        "mainpurchase": {
            "name": "mainpurchase",
            "jName": "MainPurchase",
            "type": "main",
            "caption": "MainPurchase"
        },
        "detailpurchase": {
            "name": "detailpurchase",
            "jName": "DetailPurchase",
            "type": "detail",
            "caption": "DetailPurchase",
            "main": "mainpurchase"
        },
        "detailpurchasemedicine": {
            "name": "detailpurchasemedicine",
            "jName": "DetailPurchaseMedicine",
            "type": "detail",
            "caption": "DetailPurchaseMedicine",
            "main": "mainpurchase"
        },
        "sheetpurchase": {
            "name": "sheetpurchase",
            "jName": "SheetPurchase",
            "type": "sheet",
            "caption": "采购单",
            "main": "mainpurchase",
            "acts": [
                {
                    "name": "$",
                    "type": "detailAct",
                    "detail": "detailpurchase"
                }
            ]
        },
        "mainstorein": {
            "name": "mainstorein",
            "jName": "MainStoreIn",
            "type": "main",
            "caption": "MainStoreIn"
        },
        "detailstorein": {
            "name": "detailstorein",
            "jName": "DetailStoreIn",
            "type": "detail",
            "caption": "DetailStoreIn",
            "main": "mainstorein"
        },
        "pendstorein": {
            "name": "pendstorein",
            "jName": "PendStoreIn",
            "type": "pend",
            "caption": "待入库",
            "detail": "detailstorein"
        },
        "sheetstorein": {
            "name": "sheetstorein",
            "jName": "SheetStoreIn",
            "type": "sheet",
            "caption": "入库单",
            "main": "mainstorein",
            "acts": [
                {
                    "name": "$",
                    "type": "detailAct",
                    "fromPend": "pendstorein",
                    "detail": "detailstorein"
                }
            ]
        },
        "sheetstoreinmultistorage": {
            "name": "sheetstoreinmultistorage",
            "jName": "SheetStoreInMultiStorage",
            "type": "sheet",
            "caption": "入库单-分仓",
            "main": "mainstorein",
            "acts": [
                {
                    "name": "$",
                    "type": "detailAct",
                    "fromPend": "pendstorein",
                    "detail": "detailstorein"
                }
            ]
        },
        "mainsale": {
            "name": "mainsale",
            "jName": "MainSale",
            "type": "main",
            "caption": "MainSale"
        },
        "sheetsale": {
            "name": "sheetsale",
            "jName": "SheetSale",
            "type": "sheet",
            "caption": "销售单",
            "main": "mainsale",
            "acts": [
                {
                    "name": "$",
                    "type": "detailAct",
                    "detail": "detailsale"
                }
            ]
        },
        "detailsale": {
            "name": "detailsale",
            "jName": "DetailSale",
            "type": "detail",
            "caption": "DetailSale",
            "main": "mainsale"
        },
        "mainstoreout": {
            "name": "mainstoreout",
            "jName": "MainStoreOut",
            "type": "main",
            "caption": "MainStoreOut"
        },
        "detailstoreout": {
            "name": "detailstoreout",
            "jName": "DetailStoreOut",
            "type": "detail",
            "caption": "DetailStoreOut",
            "main": "mainstoreout"
        },
        "pendstoreout": {
            "name": "pendstoreout",
            "jName": "PendStoreOut",
            "type": "pend",
            "caption": "待出库",
            "detail": "detailstorein"
        },
        "sheetstoreout": {
            "name": "sheetstoreout",
            "jName": "SheetStoreOut",
            "type": "sheet",
            "caption": "出库单",
            "main": "mainstoreout",
            "acts": [
                {
                    "name": "$",
                    "type": "detailAct",
                    "fromPend": "pendstoreout",
                    "detail": "detailstoreout"
                }
            ]
        },
        "storage": {
            "name": "storage",
            "type": "subject",
            "caption": "库存",
            "assigns": [
                {
                    "name": "goodsinit",
                    "type": "assign",
                    "dataType": "dec"
                },
                {
                    "name": "goodsbalance",
                    "type": "assign",
                    "dataType": "dec",
                    "history": true
                }
            ]
        },
        "c": {
            "name": "c",
            "type": "subject",
            "assigns": [
                {
                    "name": "流水",
                    "type": "assign",
                    "caption": "下一步",
                    "dataType": "char",
                    "value": "s2"
                }
            ]
        },
        "customertree": {
            "name": "customertree",
            "jName": "CustomerTree",
            "type": "tree",
            "caption": "客户分组"
        },
        "vendortree": {
            "name": "vendortree",
            "jName": "VendorTree",
            "type": "tree",
            "caption": "供应商分组"
        }
    }
};
var EnumAtom;
(function (EnumAtom) {
    EnumAtom["b"] = "b";
    EnumAtom["Contact"] = "contact";
    EnumAtom["Goods"] = "goods";
    EnumAtom["Toy"] = "toy";
    EnumAtom["Medicine"] = "medicine";
    EnumAtom["MedicineChinese"] = "medicinechinese";
    EnumAtom["SpecialMedicineChinese"] = "specialmedicinechinese";
    EnumAtom["MedicalDevice"] = "medicaldevice";
    EnumAtom["Shoe"] = "shoe";
})(EnumAtom = exports.EnumAtom || (exports.EnumAtom = {}));
var EnumSheet;
(function (EnumSheet) {
    EnumSheet["SheetPurchase"] = "sheetpurchase";
    EnumSheet["SheetStoreIn"] = "sheetstorein";
    EnumSheet["SheetStoreInMultiStorage"] = "sheetstoreinmultistorage";
    EnumSheet["SheetSale"] = "sheetsale";
    EnumSheet["SheetStoreOut"] = "sheetstoreout";
})(EnumSheet = exports.EnumSheet || (exports.EnumSheet = {}));
var EnumDetail;
(function (EnumDetail) {
    EnumDetail["DetailPurchase"] = "detailpurchase";
    EnumDetail["DetailPurchaseMedicine"] = "detailpurchasemedicine";
    EnumDetail["DetailStoreIn"] = "detailstorein";
    EnumDetail["DetailSale"] = "detailsale";
    EnumDetail["DetailStoreOut"] = "detailstoreout";
})(EnumDetail = exports.EnumDetail || (exports.EnumDetail = {}));
var EnumSubject;
(function (EnumSubject) {
    EnumSubject["storage"] = "storage";
    EnumSubject["c"] = "c";
})(EnumSubject = exports.EnumSubject || (exports.EnumSubject = {}));
var EnumSetting;
(function (EnumSetting) {
    EnumSetting["AccountSetting"] = "accountsetting";
    EnumSetting["PersonSetting"] = "personsetting";
    EnumSetting["Price"] = "price";
})(EnumSetting = exports.EnumSetting || (exports.EnumSetting = {}));
//# sourceMappingURL=JsTicket.js.map