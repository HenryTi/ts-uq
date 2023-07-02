//=== UqApp builder created on Sat Jul 01 2023 22:39:03 GMT-0400 (Eastern Daylight Time) ===//
import * as UqDefault from './UqDefault';
import * as JsTicket from './JsTicket';

export interface UQs {
	UqDefault: UqDefault.UqExt;
	JsTicket: JsTicket.UqExt;
}

export const uqsSchema = {
	"百灵威系统工程部/product": UqDefault.uqSchema,
	"jksoft/jksoft-mini-jxc-trial": JsTicket.uqSchema,
}

export * as UqDefault from './UqDefault';
export * as JsTicket from './JsTicket';
