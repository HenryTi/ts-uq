//=== UqApp builder created on Fri Mar 03 2023 16:09:59 GMT-0500 (Eastern Standard Time) ===//
import * as JkProduct from './JkProduct';
import * as JsTicket from './JsTicket';

export interface UQs {
	JkProduct: JkProduct.UqExt;
	JsTicket: JsTicket.UqExt;
}

export const uqsSchema = {
	"百灵威系统工程部/product": JkProduct.uqSchema,
	"jksoft/ticket": JsTicket.uqSchema,
}

export * as JkProduct from './JkProduct';
export * as JsTicket from './JsTicket';
