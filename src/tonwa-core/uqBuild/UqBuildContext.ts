import { Web } from "tonwa-core";

export abstract class UqBuildContext {
    readonly web: Web;
    readonly uqTsSrcPath: string;

    constructor(web: Web, uqTsSrcPath: string) {
        this.web = web;
        this.uqTsSrcPath = uqTsSrcPath;
    }

    abstract get uiPlatform(): string;
    abstract get uiPlatformUpper(): string;
    abstract get uiPlatformCamel(): string;
    abstract get element(): string;
}
