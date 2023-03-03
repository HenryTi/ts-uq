//=== UqApp builder created on Fri Mar 03 2023 16:09:59 GMT-0500 (Eastern Standard Time) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqQuery, UqAction, UqTuid, UqMap, UqIDX, UqIX } from "tonwa-uq";
// eslint-disable-next-line @typescript-eslint/no-unused-vars


//===============================;
//======= UQ 百灵威系统工程部/product ========;
//===============================';

export interface ID {
    id?: number;
}

export interface IDX {
    id: number;
}

export interface IX {
    ix: number;
    xi: number;
}

export interface Param$role_My {
}
export interface Return$role_MyAdmins {
	id: number;
	unit: number;
	admin: number;
	entity: string;
	assigned: string;
}
export interface Return$role_MyRoles {
	unit: number;
	role: string;
}
export interface Return$role_MyUnitProps {
	unit: number;
	props: string;
}
export interface Result$role_My {
	admins: Return$role_MyAdmins[];
	roles: Return$role_MyRoles[];
	unitProps: Return$role_MyUnitProps[];
}

export interface Param$role_Unit_Users {
	unit: number;
}
export interface Return$role_Unit_UsersUsers {
	id: number;
	user: number;
	admin: number;
	assigned: string;
	name: string;
	nick: string;
	icon: string;
	addBy: number;
}
export interface Return$role_Unit_UsersRoles {
	user: number;
	role: string;
}
export interface Result$role_Unit_Users {
	users: Return$role_Unit_UsersUsers[];
	roles: Return$role_Unit_UsersRoles[];
}

export interface Param$role_Unit_Add_Admin {
	unit: number;
	user: number;
	admin: number;
	assigned: string;
}
export interface Result$role_Unit_Add_Admin {
}

export interface Param$role_Unit_Del_Admin {
	unit: number;
	user: number;
	admin: number;
}
export interface Result$role_Unit_Del_Admin {
}

export interface Param$role_Unit_Add_User {
	unit: number;
	user: number;
	assigned: string;
}
export interface Result$role_Unit_Add_User {
}

export interface Param$role_Unit_User_Role {
	unit: number;
	user: number;
	action: string;
	role: string;
}
export interface Result$role_Unit_User_Role {
}

export interface Param$role_Unit_Quit_Owner {
	unit: number;
}
export interface Result$role_Unit_Quit_Owner {
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface Param$setMyTimezone {
	_timezone: number;
}
export interface Result$setMyTimezone {
}

export interface Param$getUnitTime {
}
export interface Return$getUnitTimeRet {
	timezone: number;
	unitTimeZone: number;
	unitBizMonth: number;
	unitBizDate: number;
}
export interface Result$getUnitTime {
	ret: Return$getUnitTimeRet[];
}

export interface TuidLot {
	id?: number;
	lotnumber: string;
	product: number;
}



export interface ParamGetLotByLotnumber {
	lotnumber: string;
	origin: string;
}
export interface ReturnGetLotByLotnumberRet {
	id: number;
	product: number;
}
export interface ResultGetLotByLotnumber {
	ret: ReturnGetLotByLotnumberRet[];
}

export interface ParamGetProductLotNumber {
	product: number;
}
export interface ReturnGetProductLotNumberRet {
	id: number;
	product: number;
	lotnumber: string;
}
export interface ResultGetProductLotNumber {
	ret: ReturnGetProductLotNumberRet[];
}

export interface TuidChemical {
	id?: number;
	CAS: string;
}

export interface TuidSalesRegion {
	id?: number;
	name: string;
	currency: number;
	no: string;
}

export interface TuidCurrency {
	id?: number;
	name: string;
	suffix: string;
}

export interface TuidPackType {
	id?: number;
	name: string;
	description: string;
}

export interface TuidLanguage {
	id?: number;
	no: string;
	description: string;
}

export interface TuidResearch {
	id?: number;
}

export interface ParamSearchPointProduct {
	keyWord: string;
	salesRegion: number;
}
export interface ReturnSearchPointProduct$page {
	seq: number;
	id: number;
	product: number;
	origin: string;
	description: string;
	descriptionC: string;
	imageUrl: string;
	radiox: number;
	radioy: number;
	unit: string;
	retail: number;
}
export interface ResultSearchPointProduct {
	$page: ReturnSearchPointProduct$page[];
}

export interface ParamGetPointProductMoreBySource {
	pack: number;
	salesRegion: number;
}
export interface ReturnGetPointProductMoreBySourceRet {
	id: number;
	product: number;
	origin: string;
	description: string;
	descriptionC: string;
	imageUrl: string;
	radiox: number;
	radioy: number;
	unit: string;
	retail: number;
}
export interface ResultGetPointProductMoreBySource {
	ret: ReturnGetPointProductMoreBySourceRet[];
}



export interface TuidBrand {
	id?: number;
	name: string;
	no: string;
}





export interface TuidStuff {
	id?: number;
	name: string;
	packType: number;
}



export interface TuidProductX {
	id?: number;
	brand: number;
	origin: string;
	description: string;
	descriptionC: string;
	imageUrl: string;
	no: string;
	isValid: number;
}













export interface TuidPackSalesLevel {
	id?: number;
	name: string;
	no: string;
}

export interface Product2c extends IDX {
	id: number;
	createDate?: any;
	$act?: number;
}export interface ActParamProduct2c {
	id: number|IDXValue;
	createDate?: any|IDXValue;
	$act?: number;
}

export interface TuidProductCategory {
	id?: number;
	no: number;
	parent: number;
	isLeaf: number;
	orderWithinParent: number;
}









export interface ProductCategoryResearchDomain extends IX {
}

export interface ParamGetRootCategories {
	salesRegion: number;
	language: number;
}
export interface ReturnGetRootCategoriesRet {
	productCategory: number;
	name: string;
	total: number;
}
export interface ResultGetRootCategories {
	ret: ReturnGetRootCategoriesRet[];
}

export interface ParamGetRootCategory {
	salesRegion: number;
	language: number;
}
export interface ReturnGetRootCategoryFirst {
	productCategory: number;
	name: string;
	total: number;
}
export interface ReturnGetRootCategorySecend {
	productCategory: number;
	parent: number;
	name: string;
	total: number;
}
export interface ReturnGetRootCategoryThird {
	productCategory: number;
	parent: number;
	name: string;
	total: number;
}
export interface ResultGetRootCategory {
	first: ReturnGetRootCategoryFirst[];
	secend: ReturnGetRootCategorySecend[];
	third: ReturnGetRootCategoryThird[];
}

export interface ParamGetChildrenCategory {
	parent: number;
	salesRegion: number;
	language: number;
}
export interface ReturnGetChildrenCategoryFirst {
	productCategory: number;
	parent: number;
	name: string;
	total: number;
}
export interface ReturnGetChildrenCategorySecend {
	productCategory: number;
	parent: number;
	name: string;
	total: number;
}
export interface ResultGetChildrenCategory {
	first: ReturnGetChildrenCategoryFirst[];
	secend: ReturnGetChildrenCategorySecend[];
}

export interface ParamSearchProductByCategory {
	productCategory: number;
	salesRegion: number;
	language: number;
}
export interface ReturnSearchProductByCategory$page {
	seq: number;
	id: number;
	no: string;
	brand: number;
	origin: string;
	description: string;
	descriptionC: string;
	imageUrl: string;
	chemical: number;
	CAS: string;
	purity: string;
	molecularFomula: string;
	molecularWeight: string;
}
export interface ResultSearchProductByCategory {
	$page: ReturnSearchProductByCategory$page[];
}

export interface ParamCountProductCategoryInclusion {
}
export interface ResultCountProductCategoryInclusion {
}

export interface ParamAddResearchProductCategory {
	research: number;
	productCategory: number;
}
export interface ResultAddResearchProductCategory {
}

export interface ParamDeleteResearchProductCategory {
	research: number;
	productCategory: number;
}
export interface ResultDeleteResearchProductCategory {
}

export interface ParamGetResearchByProductCategory {
	productCategory: number;
}
export interface ReturnGetResearchByProductCategoryRet {
	productCategory: number;
	research: number;
}
export interface ResultGetResearchByProductCategory {
	ret: ReturnGetResearchByProductCategoryRet[];
}













export interface ParamGetProductByOrigin {
	origin: string;
	salesRegion: number;
}
export interface ReturnGetProductByOriginRet {
	id: number;
}
export interface ResultGetProductByOrigin {
	ret: ReturnGetProductByOriginRet[];
}

export interface ParamGetProductPackByOrigin {
	origin: string;
	salesRegion: number;
}
export interface ReturnGetProductPackByOriginRet {
	product: number;
	pack: number;
}
export interface ResultGetProductPackByOrigin {
	ret: ReturnGetProductPackByOriginRet[];
}

export interface ParamGetAvailableProductById {
	product: number;
	salesRegion: number;
}
export interface ReturnGetAvailableProductByIdRet {
	id: number;
	brand: number;
	origin: string;
	description: string;
	descriptionC: string;
	imageUrl: string;
	no: string;
	isValid: number;
}
export interface ResultGetAvailableProductById {
	ret: ReturnGetAvailableProductByIdRet[];
}

export interface ParamGetFutureDeliveryTime {
	product: number;
	salesRegion: number;
}
export interface ReturnGetFutureDeliveryTimeRet {
	minValue: number;
	maxValue: number;
	unit: string;
	deliveryTimeDescription: string;
}
export interface ResultGetFutureDeliveryTime {
	ret: ReturnGetFutureDeliveryTimeRet[];
}

export interface ParamSearchProduct {
	keyWord: string;
	salesRegion: number;
}
export interface ReturnSearchProduct$page {
	seq: number;
	id: number;
	no: string;
	brand: number;
	origin: string;
	description: string;
	descriptionC: string;
	imageUrl: string;
	chemical: number;
	CAS: string;
	purity: string;
	gradeCN: string;
	molecularFomula: string;
	molecularWeight: string;
}
export interface ResultSearchProduct {
	$page: ReturnSearchProduct$page[];
}

export interface ParamGetPack {
	brandName: string;
	origin: string;
	radiox: number;
	radioy: number;
	unit: string;
}
export interface ReturnGetPackRet {
	product: number;
	pack: number;
	jkcat: string;
}
export interface ResultGetPack {
	ret: ReturnGetPackRet[];
}

export interface ParamGetProductPrices {
	product: number;
	salesRegion: number;
}
export interface ReturnGetProductPricesRet {
	product: number;
	pack: number;
	salesRegion: number;
	retail: number;
	expireDate: any;
	discountinued: number;
	salesLevel: number;
}
export interface ResultGetProductPrices {
	ret: ReturnGetProductPricesRet[];
}

export interface ParamGetProductByPackId {
	pack: number;
}
export interface ReturnGetProductByPackIdRet {
	product: number;
	origin: string;
	description: string;
	descriptionC: string;
	brand: number;
	brandName: string;
}
export interface ResultGetProductByPackId {
	ret: ReturnGetProductByPackIdRet[];
}



export interface ParamPriceXquery {
	product: number;
	pack: number;
	salesRegion: number;
}
export interface ReturnPriceXqueryRet {
	product: number;
	pack: number;
	salesRegion: number;
	expireDate: any;
	discountinued: number;
	retail: number;
}
export interface ResultPriceXquery {
	ret: ReturnPriceXqueryRet[];
}

export interface ParamActs {
	product2c?: ActParamProduct2c[];
	productCategoryResearchDomain?: ProductCategoryResearchDomain[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;
	SQL: Uq;
    Role: { [key: string]: string[] };

	$role_My: UqQuery<Param$role_My, Result$role_My>;
	$role_Unit_Users: UqQuery<Param$role_Unit_Users, Result$role_Unit_Users>;
	$role_Unit_Add_Admin: UqAction<Param$role_Unit_Add_Admin, Result$role_Unit_Add_Admin>;
	$role_Unit_Del_Admin: UqAction<Param$role_Unit_Del_Admin, Result$role_Unit_Del_Admin>;
	$role_Unit_Add_User: UqAction<Param$role_Unit_Add_User, Result$role_Unit_Add_User>;
	$role_Unit_User_Role: UqAction<Param$role_Unit_User_Role, Result$role_Unit_User_Role>;
	$role_Unit_Quit_Owner: UqAction<Param$role_Unit_Quit_Owner, Result$role_Unit_Quit_Owner>;
	$poked: UqQuery<Param$poked, Result$poked>;
	$setMyTimezone: UqAction<Param$setMyTimezone, Result$setMyTimezone>;
	$getUnitTime: UqQuery<Param$getUnitTime, Result$getUnitTime>;
	Lot: UqTuid<TuidLot>;
	COA: UqMap;
	GetLotByLotnumber: UqQuery<ParamGetLotByLotnumber, ResultGetLotByLotnumber>;
	GetProductLotNumber: UqQuery<ParamGetProductLotNumber, ResultGetProductLotNumber>;
	Chemical: UqTuid<TuidChemical>;
	SalesRegion: UqTuid<TuidSalesRegion>;
	Currency: UqTuid<TuidCurrency>;
	PackType: UqTuid<TuidPackType>;
	Language: UqTuid<TuidLanguage>;
	Research: UqTuid<TuidResearch>;
	SearchPointProduct: UqQuery<ParamSearchPointProduct, ResultSearchPointProduct>;
	GetPointProductMoreBySource: UqQuery<ParamGetPointProductMoreBySource, ResultGetPointProductMoreBySource>;
	AgentPrice: UqMap;
	Brand: UqTuid<TuidBrand>;
	BrandSalesRegion: UqMap;
	BrandDeliveryTime: UqMap;
	Stuff: UqTuid<TuidStuff>;
	ProductStuff: UqMap;
	ProductX: UqTuid<TuidProductX>;
	PriceX: UqMap;
	ProductChemical: UqMap;
	ProductSalesRegion: UqMap;
	ProductLegallyProhibited: UqMap;
	ProductDeliveryTime: UqMap;
	ProductCache: UqMap;
	PackSalesLevel: UqTuid<TuidPackSalesLevel>;
	Product2c: UqIDX<any>;
	ProductCategory: UqTuid<TuidProductCategory>;
	ProductProductCategory: UqMap;
	ProductCategoryInclusion: UqMap;
	ProductProductCategoryCache: UqMap;
	ProductCategoryLeafCache: UqMap;
	ProductCategoryResearchDomain: UqIX<any>;
	GetRootCategories: UqQuery<ParamGetRootCategories, ResultGetRootCategories>;
	GetRootCategory: UqQuery<ParamGetRootCategory, ResultGetRootCategory>;
	GetChildrenCategory: UqQuery<ParamGetChildrenCategory, ResultGetChildrenCategory>;
	SearchProductByCategory: UqQuery<ParamSearchProductByCategory, ResultSearchProductByCategory>;
	CountProductCategoryInclusion: UqAction<ParamCountProductCategoryInclusion, ResultCountProductCategoryInclusion>;
	AddResearchProductCategory: UqAction<ParamAddResearchProductCategory, ResultAddResearchProductCategory>;
	DeleteResearchProductCategory: UqAction<ParamDeleteResearchProductCategory, ResultDeleteResearchProductCategory>;
	GetResearchByProductCategory: UqQuery<ParamGetResearchByProductCategory, ResultGetResearchByProductCategory>;
	ProductMSDSFile: UqMap;
	ProductSpecFile: UqMap;
	ProductUserManualFile: UqMap;
	ProductEmbargo: UqMap;
	ProductExtention: UqMap;
	ProductStandardSample: UqMap;
	GetProductByOrigin: UqQuery<ParamGetProductByOrigin, ResultGetProductByOrigin>;
	GetProductPackByOrigin: UqQuery<ParamGetProductPackByOrigin, ResultGetProductPackByOrigin>;
	GetAvailableProductById: UqQuery<ParamGetAvailableProductById, ResultGetAvailableProductById>;
	GetFutureDeliveryTime: UqQuery<ParamGetFutureDeliveryTime, ResultGetFutureDeliveryTime>;
	SearchProduct: UqQuery<ParamSearchProduct, ResultSearchProduct>;
	GetPack: UqQuery<ParamGetPack, ResultGetPack>;
	GetProductPrices: UqQuery<ParamGetProductPrices, ResultGetProductPrices>;
	GetProductByPackId: UqQuery<ParamGetProductByPackId, ResultGetProductByPackId>;
	ProductSalesRank: UqMap;
	PriceXquery: UqQuery<ParamPriceXquery, ResultPriceXquery>;
}


export const uqSchema={
    "$role_my": {
        "name": "$role_my",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
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
        "returns": [] as any
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
        "returns": [] as any
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
        "returns": [] as any
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
        "returns": [] as any
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
        "returns": [] as any
    },
    "$poked": {
        "name": "$poked",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
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
        "returns": [] as any
    },
    "$getunittime": {
        "name": "$getUnitTime",
        "type": "query",
        "private": false,
        "sys": true,
        "fields": [] as any,
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
        "search": [] as any,
        "main": [] as any
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
        "search": [] as any,
        "main": [] as any
    },
    "research": {
        "name": "Research",
        "type": "tuid",
        "private": false,
        "sys": true,
        "fields": [] as any,
        "from": {
            "owner": "百灵威系统工程部",
            "uq": "customer"
        },
        "global": false,
        "sync": false,
        "id": "id",
        "search": [] as any,
        "main": [] as any
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
        "fields": [] as any,
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
        "fields": [] as any,
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
        "fields": [] as any,
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
        "fields": [] as any,
        "returns": [] as any
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
        "returns": [] as any
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
        "returns": [] as any
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
}