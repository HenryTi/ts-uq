"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uqSchema = exports.JkOrderTest = exports.OrderType = exports.EnumRoleOp = exports.EnumRole = exports.Const_Sleep_Time = exports.EnumAccount = exports.EnumObjectType = exports.MaxActionRows = exports.EnumCurrency = exports.OrderReady = exports.EnumBizOpType = exports.Post = exports.Item = void 0;
var Item;
(function (Item) {
    Item[Item["orderDeliver"] = 1010] = "orderDeliver";
    Item[Item["orderAmount"] = 1011] = "orderAmount";
    Item[Item["orderProfit"] = 1012] = "orderProfit";
    Item[Item["orderFee"] = 1013] = "orderFee";
    Item[Item["orderSaleTransferIn"] = 1014] = "orderSaleTransferIn";
    Item[Item["orderFactoryTransferIn"] = 1015] = "orderFactoryTransferIn";
    Item[Item["orderSaleTransferOut"] = 1016] = "orderSaleTransferOut";
    Item[Item["orderFactoryTransferOut"] = 1017] = "orderFactoryTransferOut";
    Item[Item["orderReturn"] = 1020] = "orderReturn";
    Item[Item["orderReceive"] = 1030] = "orderReceive";
    Item[Item["receiveSaleTransferOut"] = 1036] = "receiveSaleTransferOut";
    Item[Item["receiveFactoryTransferOut"] = 1037] = "receiveFactoryTransferOut";
    Item[Item["orderReceiveReturn"] = 1040] = "orderReceiveReturn";
    Item[Item["returnPoint"] = 1041] = "returnPoint";
    Item[Item["profitFee"] = 1110] = "profitFee";
    Item[Item["couponFee"] = 1111] = "couponFee";
    Item[Item["couponCoSalesFee"] = 1113] = "couponCoSalesFee";
    Item[Item["returnPointFee"] = 1112] = "returnPointFee";
    Item[Item["amountFee"] = 1120] = "amountFee";
    Item[Item["supervisorFee"] = 1210] = "supervisorFee";
    Item[Item["customerPoint"] = 2010] = "customerPoint";
    Item[Item["pickupPoint"] = 3010] = "pickupPoint";
    Item[Item["cashOut"] = 5010] = "cashOut";
    Item[Item["cashAdjust"] = 5011] = "cashAdjust";
})(Item = exports.Item || (exports.Item = {}));
var Post;
(function (Post) {
    Post[Post["sys"] = 0] = "sys";
    Post[Post["staff"] = 1010] = "staff";
    Post[Post["staffSales"] = 1100] = "staffSales";
    Post[Post["topSales"] = 1101] = "topSales";
    Post[Post["staffSupervisor"] = 1102] = "staffSupervisor";
    Post[Post["staffCoSales"] = 1103] = "staffCoSales";
    Post[Post["manager"] = 2010] = "manager";
    Post[Post["managerIT"] = 2100] = "managerIT";
    Post[Post["saleBranch"] = 3000] = "saleBranch";
    Post[Post["factoryBranch"] = 3001] = "factoryBranch";
    Post[Post["sellerBranch"] = 3002] = "sellerBranch";
    Post[Post["agent"] = 7010] = "agent";
    Post[Post["agentSales"] = 7100] = "agentSales";
    Post[Post["distributor"] = 7500] = "distributor";
    Post[Post["distributorSales"] = 7501] = "distributorSales";
    Post[Post["customer"] = 8010] = "customer";
})(Post = exports.Post || (exports.Post = {}));
var EnumBizOpType;
(function (EnumBizOpType) {
    EnumBizOpType[EnumBizOpType["booking"] = 0] = "booking";
    EnumBizOpType[EnumBizOpType["orderDeliverDone"] = 101] = "orderDeliverDone";
    EnumBizOpType[EnumBizOpType["orderReceiveDone"] = 102] = "orderReceiveDone";
    EnumBizOpType[EnumBizOpType["orderReturn"] = 103] = "orderReturn";
    EnumBizOpType[EnumBizOpType["pickupDone"] = 104] = "pickupDone";
    EnumBizOpType[EnumBizOpType["salaryPaid"] = 105] = "salaryPaid";
    EnumBizOpType[EnumBizOpType["returnPointDone"] = 106] = "returnPointDone";
    EnumBizOpType[EnumBizOpType["salaryAdjust"] = 107] = "salaryAdjust";
})(EnumBizOpType = exports.EnumBizOpType || (exports.EnumBizOpType = {}));
var OrderReady;
(function (OrderReady) {
    OrderReady[OrderReady["sheet"] = 1] = "sheet";
    OrderReady[OrderReady["margin"] = 4] = "margin";
})(OrderReady = exports.OrderReady || (exports.OrderReady = {}));
var EnumCurrency;
(function (EnumCurrency) {
    EnumCurrency[EnumCurrency["BASE"] = 5] = "BASE";
    EnumCurrency[EnumCurrency["GBP"] = 2] = "GBP";
    EnumCurrency[EnumCurrency["HKD"] = 3] = "HKD";
    EnumCurrency[EnumCurrency["JPY"] = 4] = "JPY";
    EnumCurrency[EnumCurrency["RMB"] = 5] = "RMB";
    EnumCurrency[EnumCurrency["AUD"] = 6] = "AUD";
    EnumCurrency[EnumCurrency["CAD"] = 7] = "CAD";
    EnumCurrency[EnumCurrency["CHF"] = 8] = "CHF";
    EnumCurrency[EnumCurrency["EUR"] = 9] = "EUR";
    EnumCurrency[EnumCurrency["USD"] = 10] = "USD";
})(EnumCurrency = exports.EnumCurrency || (exports.EnumCurrency = {}));
exports.MaxActionRows = {};
var EnumObjectType;
(function (EnumObjectType) {
    EnumObjectType[EnumObjectType["none"] = 0] = "none";
    EnumObjectType[EnumObjectType["user"] = 1] = "user";
    EnumObjectType[EnumObjectType["customer"] = 2] = "customer";
    EnumObjectType[EnumObjectType["staff"] = 3] = "staff";
    EnumObjectType[EnumObjectType["agent"] = 4] = "agent";
    EnumObjectType[EnumObjectType["distributor"] = 5] = "distributor";
    EnumObjectType[EnumObjectType["post"] = 6] = "post";
    EnumObjectType[EnumObjectType["branch"] = 7] = "branch";
})(EnumObjectType = exports.EnumObjectType || (exports.EnumObjectType = {}));
var EnumAccount;
(function (EnumAccount) {
    EnumAccount[EnumAccount["commission"] = 10] = "commission";
    EnumAccount[EnumAccount["supervisor"] = 11] = "supervisor";
})(EnumAccount = exports.EnumAccount || (exports.EnumAccount = {}));
exports.Const_Sleep_Time = {};
var EnumRole;
(function (EnumRole) {
    EnumRole[EnumRole["all"] = 1] = "all";
    EnumRole[EnumRole["dev"] = 2] = "dev";
    EnumRole[EnumRole["mainUser"] = 3] = "mainUser";
    EnumRole[EnumRole["promotionAdmin"] = 4] = "promotionAdmin";
})(EnumRole = exports.EnumRole || (exports.EnumRole = {}));
var EnumRoleOp;
(function (EnumRoleOp) {
    EnumRoleOp[EnumRoleOp["test"] = 1] = "test";
})(EnumRoleOp = exports.EnumRoleOp || (exports.EnumRoleOp = {}));
var OrderType;
(function (OrderType) {
    OrderType[OrderType["Customer"] = 1] = "Customer";
    OrderType[OrderType["Distributor"] = 11] = "Distributor";
    OrderType[OrderType["SaleBranch"] = 21] = "SaleBranch";
    OrderType[OrderType["FactoryBranch"] = 22] = "FactoryBranch";
})(OrderType = exports.OrderType || (exports.OrderType = {}));
exports.JkOrderTest = {
    id: 31195716,
    detail1: 31195717,
    detail2: 31195718,
    detail3: 31195719,
    itemId: "JKItem-2021-08-03-0001"
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
    "createpromotionsalesmanratio": {
        "name": "createPromotionSalesmanRatio",
        "type": "proc",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "salesman",
                "type": "id"
            },
            {
                "name": "start",
                "type": "date"
            },
            {
                "name": "end",
                "type": "date"
            },
            {
                "name": "ratio",
                "type": "dec",
                "scale": 2,
                "precision": 6
            }
        ],
        "returns": []
    },
    "promotions": {
        "name": "Promotions",
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
                "size": 100
            },
            {
                "name": "description",
                "type": "char",
                "size": 500
            },
            {
                "name": "start",
                "type": "date"
            },
            {
                "name": "end",
                "type": "date"
            },
            {
                "name": "isValid",
                "type": "tinyint"
            },
            {
                "name": "creator",
                "type": "id"
            },
            {
                "name": "createDate",
                "type": "datetime"
            }
        ],
        "keys": [],
        "nameNoVice": [
            "name"
        ],
        "global": false,
        "idType": 12,
        "isMinute": false
    },
    "promotionproducts": {
        "name": "PromotionProducts",
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
                "name": "main",
                "type": "id",
                "ID": "promotions",
                "tuid": "promotions"
            },
            {
                "name": "product",
                "type": "id"
            }
        ],
        "keys": [],
        "global": false,
        "idType": 12,
        "isMinute": false
    },
    "promotionsalesman": {
        "name": "PromotionSalesman",
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
                "name": "main",
                "type": "id",
                "ID": "promotions",
                "tuid": "promotions"
            },
            {
                "name": "salesman",
                "type": "id"
            }
        ],
        "keys": [],
        "global": false,
        "idType": 12,
        "isMinute": false
    },
    "promotionsalesmanratio": {
        "name": "PromotionSalesmanRatio",
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
                "name": "promotionSalesman",
                "type": "id"
            },
            {
                "name": "bizOpType",
                "type": "enum"
            },
            {
                "name": "post",
                "type": "enum"
            },
            {
                "name": "item",
                "type": "enum"
            },
            {
                "name": "ratio",
                "type": "dec",
                "scale": 2,
                "precision": 6
            }
        ],
        "keys": [
            {
                "name": "promotionSalesman",
                "type": "id"
            },
            {
                "name": "bizOpType",
                "type": "enum"
            },
            {
                "name": "post",
                "type": "enum"
            },
            {
                "name": "item",
                "type": "enum"
            }
        ],
        "global": false,
        "idType": 12,
        "isMinute": false
    },
    "procsetbizbooking": {
        "name": "ProcSetBizBooking",
        "type": "proc",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "biz",
                "type": "id"
            },
            {
                "name": "bizOpType",
                "type": "enum"
            },
            {
                "name": "stamp",
                "type": "int"
            }
        ],
        "returns": []
    },
    "item": {
        "name": "Item",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "orderDeliver": 1010,
            "orderAmount": 1011,
            "orderProfit": 1012,
            "orderFee": 1013,
            "orderSaleTransferIn": 1014,
            "orderFactoryTransferIn": 1015,
            "orderSaleTransferOut": 1016,
            "orderFactoryTransferOut": 1017,
            "orderReturn": 1020,
            "orderReceive": 1030,
            "receiveSaleTransferOut": 1036,
            "receiveFactoryTransferOut": 1037,
            "orderReceiveReturn": 1040,
            "returnPoint": 1041,
            "profitFee": 1110,
            "couponFee": 1111,
            "couponCoSalesFee": 1113,
            "returnPointFee": 1112,
            "amountFee": 1120,
            "supervisorFee": 1210,
            "customerPoint": 2010,
            "pickupPoint": 3010,
            "cashOut": 5010,
            "cashAdjust": 5011
        }
    },
    "post": {
        "name": "Post",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "sys": 0,
            "staff": 1010,
            "staffSales": 1100,
            "topSales": 1101,
            "staffSupervisor": 1102,
            "staffCoSales": 1103,
            "manager": 2010,
            "managerIT": 2100,
            "saleBranch": 3000,
            "factoryBranch": 3001,
            "sellerBranch": 3002,
            "agent": 7010,
            "agentSales": 7100,
            "distributor": 7500,
            "distributorSales": 7501,
            "customer": 8010
        }
    },
    "enumbizoptype": {
        "name": "EnumBizOpType",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "booking": 0,
            "orderDeliverDone": 101,
            "orderReceiveDone": 102,
            "orderReturn": 103,
            "pickupDone": 104,
            "salaryPaid": 105,
            "returnPointDone": 106,
            "salaryAdjust": 107
        }
    },
    "orderready": {
        "name": "OrderReady",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "sheet": 1,
            "margin": 4
        }
    },
    "enumcurrency": {
        "name": "EnumCurrency",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "BASE": 5,
            "GBP": 2,
            "HKD": 3,
            "JPY": 4,
            "RMB": 5,
            "AUD": 6,
            "CAD": 7,
            "CHF": 8,
            "EUR": 9,
            "USD": 10
        }
    },
    "getitemtitles": {
        "name": "GetItemTitles",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
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
                        "name": "title",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "unit",
                        "type": "char",
                        "size": 10
                    },
                    {
                        "name": "fixed",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    },
    "getposttitles": {
        "name": "GetPostTitles",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
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
                        "name": "title",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 100
                    }
                ]
            }
        ]
    },
    "getaccounttitles": {
        "name": "GetAccountTitles",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
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
                        "name": "title",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "vice",
                        "type": "char",
                        "size": 100
                    },
                    {
                        "name": "unit",
                        "type": "char",
                        "size": 10
                    },
                    {
                        "name": "fixed",
                        "type": "tinyint"
                    }
                ]
            }
        ]
    },
    "procqueuebizmain": {
        "name": "ProcQueueBizMain",
        "type": "proc",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "bizMain",
                "type": "id"
            }
        ],
        "returns": []
    },
    "getmonthsumproduct": {
        "name": "GetMonthSumProduct",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "item",
                "type": "enum"
            },
            {
                "name": "id",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "month",
                        "type": "int"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "amount",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "profit",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "receive",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "return",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ],
                "order": "desc"
            }
        ]
    },
    "getproductsumbymonth": {
        "name": "GetProductSumByMonth",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "item",
                "type": "enum"
            },
            {
                "name": "month",
                "type": "int"
            },
            {
                "name": "count",
                "type": "int"
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
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "amount",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "profit",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "receive",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "return",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getmonthsumcustomer": {
        "name": "GetMonthSumCustomer",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "item",
                "type": "enum"
            },
            {
                "name": "id",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "$page",
                "fields": [
                    {
                        "name": "month",
                        "type": "int"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "amount",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "profit",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "receive",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "return",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ],
                "order": "desc"
            }
        ]
    },
    "getcustomersumbymonth": {
        "name": "GetCustomerSumByMonth",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "item",
                "type": "enum"
            },
            {
                "name": "month",
                "type": "int"
            },
            {
                "name": "count",
                "type": "int"
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
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "amount",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "profit",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "receive",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "return",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "maxactionrows": {
        "name": "maxActionRows",
        "type": "const",
        "private": false,
        "sys": true,
        "fields": [],
        "values": {}
    },
    "enumobjecttype": {
        "name": "EnumObjectType",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "none": 0,
            "user": 1,
            "customer": 2,
            "staff": 3,
            "agent": 4,
            "distributor": 5,
            "post": 6,
            "branch": 7
        }
    },
    "enumaccount": {
        "name": "EnumAccount",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "commission": 10,
            "supervisor": 11
        }
    },
    "userobjectpostitem": {
        "name": "UserObjectPostItem",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "object",
                        "type": "id"
                    },
                    {
                        "name": "post",
                        "type": "enum"
                    },
                    {
                        "name": "item",
                        "type": "enum"
                    }
                ]
            }
        ]
    },
    "getobjectpostitem": {
        "name": "GetObjectPostItem",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "object",
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
                        "name": "object",
                        "type": "id"
                    },
                    {
                        "name": "post",
                        "type": "enum"
                    },
                    {
                        "name": "item",
                        "type": "enum"
                    }
                ]
            }
        ]
    },
    "getuserobjectaccount": {
        "name": "GetUserObjectAccount",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "object",
                "type": "id"
            }
        ],
        "proxy": "proxycheck",
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "objectAccount",
                        "type": "id"
                    },
                    {
                        "name": "object",
                        "type": "id"
                    },
                    {
                        "name": "post",
                        "type": "enum"
                    },
                    {
                        "name": "account",
                        "type": "enum"
                    },
                    {
                        "name": "balance",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getuserobjectitemperiodsum": {
        "name": "GetUserObjectItemPeriodSum",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "from",
                "type": "date"
            },
            {
                "name": "to",
                "type": "date"
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
                        "name": "object",
                        "type": "id"
                    },
                    {
                        "name": "post",
                        "type": "enum"
                    },
                    {
                        "name": "item",
                        "type": "enum"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getcouponfeeradio": {
        "name": "GetCouponFeeRadio",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "from",
                "type": "date"
            },
            {
                "name": "to",
                "type": "date"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "employee",
                        "type": "id"
                    },
                    {
                        "name": "radio",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getobjectitemperiodsum": {
        "name": "GetObjectItemPeriodSum",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "object",
                "type": "id",
                "ID": "object",
                "tuid": "object"
            },
            {
                "name": "from",
                "type": "date"
            },
            {
                "name": "to",
                "type": "date"
            }
        ],
        "auth": "authcheck",
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "object",
                        "type": "id"
                    },
                    {
                        "name": "post",
                        "type": "enum"
                    },
                    {
                        "name": "item",
                        "type": "enum"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getobjectitemhistory": {
        "name": "GetObjectItemHistory",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "objectPostItem",
                "type": "id",
                "ID": "objectpostitem",
                "tuid": "objectpostitem"
            },
            {
                "name": "from",
                "type": "date"
            },
            {
                "name": "to",
                "type": "date"
            }
        ],
        "auth": "authcheck",
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "biz",
                        "type": "id"
                    },
                    {
                        "name": "bizMainNo",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "bizOp",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "memo",
                        "type": "char",
                        "size": 200
                    }
                ]
            }
        ]
    },
    "getsheetopihistory": {
        "name": "GetSheetOpiHistory",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "bizMain",
                "type": "id"
            },
            {
                "name": "objectPostItem",
                "type": "id",
                "ID": "objectpostitem",
                "tuid": "objectpostitem"
            }
        ],
        "auth": "authcheck",
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "biz",
                        "type": "id"
                    },
                    {
                        "name": "bizMainNo",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "bizOp",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "memo",
                        "type": "char",
                        "size": 200
                    }
                ]
            }
        ]
    },
    "getobjectitemperiodhistory": {
        "name": "GetObjectItemPeriodHistory",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "objectPostItem",
                "type": "id",
                "ID": "objectpostitem",
                "tuid": "objectpostitem"
            },
            {
                "name": "from",
                "type": "date"
            },
            {
                "name": "to",
                "type": "date"
            },
            {
                "name": "period",
                "type": "tinyint"
            }
        ],
        "auth": "authcheck",
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "date",
                        "type": "date"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "proxycheck": {
        "name": "ProxyCheck",
        "type": "sysproc",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "proxy",
                "type": "id"
            },
            {
                "name": "ok",
                "type": "tinyint"
            }
        ],
        "returns": []
    },
    "authcheck": {
        "name": "AuthCheck",
        "type": "sysproc",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ok",
                "type": "tinyint"
            }
        ],
        "returns": []
    },
    "getobjectaccounthistory": {
        "name": "GetObjectAccountHistory",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "objectAccount",
                "type": "id"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "date",
                        "type": "date"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "post",
                        "type": "enum"
                    },
                    {
                        "name": "item",
                        "type": "enum"
                    }
                ]
            }
        ]
    },
    "getsuperviseobjects": {
        "name": "GetSuperviseObjects",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "from",
                "type": "date"
            },
            {
                "name": "to",
                "type": "date"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "opi",
                        "type": "id"
                    },
                    {
                        "name": "object",
                        "type": "id"
                    },
                    {
                        "name": "post",
                        "type": "enum"
                    },
                    {
                        "name": "item",
                        "type": "enum"
                    },
                    {
                        "name": "staff",
                        "type": "id"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "ratioValue",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getobjects": {
        "name": "GetObjects",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "type",
                        "type": "enum"
                    }
                ]
            }
        ]
    },
    "getdistributors": {
        "name": "GetDistributors",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "distributor",
                        "type": "id"
                    }
                ]
            }
        ]
    },
    "getagents": {
        "name": "GetAgents",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "agent",
                        "type": "id"
                    }
                ]
            }
        ]
    },
    "getstaffs": {
        "name": "GetStaffs",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "opi",
                        "type": "id"
                    },
                    {
                        "name": "item",
                        "type": "enum"
                    },
                    {
                        "name": "obj",
                        "type": "id"
                    },
                    {
                        "name": "staff",
                        "type": "id"
                    },
                    {
                        "name": "valueToday",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "valueThisMonth",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "valueLastMonth",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getposts": {
        "name": "GetPosts",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "opi",
                        "type": "id"
                    },
                    {
                        "name": "obj",
                        "type": "id"
                    },
                    {
                        "name": "post",
                        "type": "enum"
                    },
                    {
                        "name": "item",
                        "type": "enum"
                    },
                    {
                        "name": "amountThisMonth",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "amountLastMonth",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getusersuperviseitem": {
        "name": "GetUserSuperviseItem",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "item",
                        "type": "enum"
                    }
                ]
            }
        ]
    },
    "getitemperiodsum": {
        "name": "GetItemPeriodSum",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "date",
                "type": "date"
            },
            {
                "name": "days",
                "type": "int"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "item",
                        "type": "enum"
                    },
                    {
                        "name": "opi",
                        "type": "id",
                        "ID": "objectpostitem",
                        "tuid": "objectpostitem"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getitemsumdays": {
        "name": "GetItemSumDays",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "item",
                "type": "enum"
            },
            {
                "name": "date",
                "type": "date"
            },
            {
                "name": "days",
                "type": "int"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "date",
                        "type": "date"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getitemsummonths": {
        "name": "GetItemSumMonths",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "item",
                "type": "enum"
            },
            {
                "name": "date",
                "type": "date"
            },
            {
                "name": "months",
                "type": "int"
            }
        ],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "date",
                        "type": "date"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ]
    },
    "getitemhistory": {
        "name": "GetItemHistory",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "item",
                "type": "enum"
            },
            {
                "name": "from",
                "type": "date"
            },
            {
                "name": "to",
                "type": "date"
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
                        "name": "biz",
                        "type": "id"
                    },
                    {
                        "name": "bizMainNo",
                        "type": "char",
                        "size": 50
                    },
                    {
                        "name": "bizOp",
                        "type": "id"
                    },
                    {
                        "name": "item",
                        "type": "enum"
                    },
                    {
                        "name": "value",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "memo",
                        "type": "char",
                        "size": 100
                    }
                ],
                "order": "desc"
            }
        ]
    },
    "getaccounts": {
        "name": "GetAccounts",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "id",
                        "type": "id"
                    },
                    {
                        "name": "object",
                        "type": "id"
                    },
                    {
                        "name": "account",
                        "type": "enum"
                    },
                    {
                        "name": "balance",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    },
                    {
                        "name": "objectType",
                        "type": "enum"
                    },
                    {
                        "name": "objectTo",
                        "type": "id"
                    }
                ]
            }
        ]
    },
    "sumitemhistory": {
        "name": "SumItemHistory",
        "type": "proc",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "itemHistoryId",
                "type": "id"
            }
        ],
        "returns": []
    },
    "calcdateitemhistorygroup": {
        "name": "CalcDateItemHistoryGroup",
        "type": "proc",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": []
    },
    "calcdateopihistorygroup": {
        "name": "CalcDateOpiHistoryGroup",
        "type": "proc",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": []
    },
    "exportitemhistory": {
        "name": "ExportItemHistory",
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
                "name": "itemHistoryId",
                "type": "id",
                "ID": "itemhistory",
                "tuid": "itemhistory"
            }
        ],
        "keys": [],
        "create": true,
        "global": false,
        "idType": 12,
        "isMinute": false
    },
    "group": {
        "name": "Group",
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
        "isMinute": false
    },
    "getgroups": {
        "name": "GetGroups",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "ret",
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
            }
        ]
    },
    "getgroupobjects": {
        "name": "GetGroupObjects",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "group",
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
                        "name": "type",
                        "type": "enum"
                    }
                ]
            }
        ]
    },
    "const_sleep_time": {
        "name": "Const_Sleep_Time",
        "type": "const",
        "private": false,
        "sys": true,
        "fields": [],
        "values": {}
    },
    "enumrole": {
        "name": "EnumRole",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "all": 1,
            "dev": 2,
            "mainUser": 3,
            "promotionAdmin": 4
        }
    },
    "enumroleop": {
        "name": "EnumRoleOp",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "test": 1
        }
    },
    "userrole": {
        "name": "UserRole",
        "type": "ix",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "ix",
                "type": "id",
                "ID": "$user",
                "tuid": "$user"
            },
            {
                "name": "xi",
                "type": "id",
                "ID": "$local",
                "tuid": "$local"
            }
        ],
        "ixxx": false,
        "ixx": false,
        "hasSort": false,
        "xiType": 12
    },
    "meuser": {
        "name": "MeUser",
        "type": "idx",
        "private": false,
        "sys": true,
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
        ],
        "update": true
    },
    "roleops": {
        "name": "RoleOps",
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
    "getroleops": {
        "name": "GetRoleOps",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [],
        "returns": [
            {
                "name": "ret",
                "fields": [
                    {
                        "name": "role",
                        "type": "enum"
                    },
                    {
                        "name": "op",
                        "type": "enum"
                    }
                ]
            }
        ]
    },
    "ordertype": {
        "name": "OrderType",
        "type": "enum",
        "private": false,
        "sys": true,
        "values": {
            "Customer": 1,
            "Distributor": 11,
            "SaleBranch": 21,
            "FactoryBranch": 22
        }
    },
    "jkordertest": {
        "name": "JkOrderTest",
        "type": "const",
        "private": false,
        "sys": true,
        "fields": [],
        "values": {
            "id": 31195716,
            "detail1": 31195717,
            "detail2": 31195718,
            "detail3": 31195719,
            "itemId": "JKItem-2021-08-03-0001"
        }
    },
    "bustestboundstaffsales": {
        "name": "BusTestBoundStaffSales",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "orderMain",
                "type": "id"
            }
        ],
        "returns": []
    },
    "procbustest": {
        "name": "ProcBusTest",
        "type": "proc",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "orderMain",
                "type": "id"
            }
        ],
        "returns": []
    },
    "donedeliver": {
        "name": "DoneDeliver",
        "type": "action",
        "private": false,
        "sys": true,
        "fields": [
            {
                "name": "customer",
                "type": "id"
            },
            {
                "name": "contact",
                "type": "id"
            },
            {
                "name": "warehouse",
                "type": "id"
            }
        ],
        "arrs": [
            {
                "name": "detail",
                "fields": [
                    {
                        "name": "orderDetail",
                        "type": "id"
                    },
                    {
                        "name": "quantity",
                        "type": "dec",
                        "scale": 4,
                        "precision": 18
                    }
                ]
            }
        ],
        "returns": []
    }
};
//# sourceMappingURL=JkMe.js.map