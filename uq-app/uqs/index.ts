//=== UqApp builder created on Wed Aug 17 2022 21:04:55 GMT-0400 (北美东部夏令时间) ===//
import * as BzUShop from './BzUShop';

export interface UQs {
	BzUShop: BzUShop.UqExt;
}

export const uqsSchema = {
	"bizdev/ushop": BzUShop.uqSchema,
}

export * as BzUShop from './BzUShop';
