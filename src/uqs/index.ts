//=== UqApp builder created on Wed Mar 08 2023 19:43:53 GMT-0500 (Eastern Standard Time) ===//
import * as JkProduct from './JkProduct';
import * as JsTicket from './JsTicket';

export interface UQs {
	JkProduct: JkProduct.UqExt;
	JsTicket: JsTicket.UqExt;
}

export const uqsSchema = {
	"百灵威系统工程部/product": JkProduct.uqSchema,
	"jksoft/jksoft-mini-jxc-trial": JsTicket.uqSchema,
}

export * as JkProduct from './JkProduct';
export * as JsTicket from './JsTicket';
