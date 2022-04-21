import { Web } from "tonwa-core";
import { TsTemplate } from "./TsTemplate";

export abstract class UqBuildContext {
	readonly web: Web;
	readonly uqTsSrcPath: string;
	readonly tsTemplate: TsTemplate;

	constructor(web: Web, uqTsSrcPath: string) {
		this.web = web;
		this.uqTsSrcPath = uqTsSrcPath;
		this.tsTemplate = new TsTemplate(this);
	}

	abstract get uiPlatform(): string;
	abstract get uiPlatformUpper(): string;
	abstract get uiPlatformCamel(): string;
	abstract get element(): string;
}
