"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsTemplate = void 0;
class TsTemplate {
    constructor(buildContext) {
        this.buildContext = buildContext;
        this.tsHeader = `//=== UqApp builder created on ${new Date()} ===//`;
    }
    get tsApp() {
        return `${this.tsHeader}
import { NavView, start, nav } from 'tonwa-${this.buildContext.uiPlatform}';
import { CApp } from './CApp';
import { appConfig } from './appConfig';

export const App: React.FC = () => {
    nav.setSettings(appConfig);
    const onLogined = async (isUserLogin?:boolean) => {
        await start(CApp, appConfig, isUserLogin);
    }
    return <NavView onLogined={onLogined} />;
}

`;
    }
    get tsCApp() {
        return `${this.tsHeader}
import { CUqApp } from "./CBase";
import { res } from "./res";
import { VMain } from "./VMain";
import { setUI } from "./uqs";

const gaps = [10, 3,3,3,3,3,5,5,5,5,5,5,5,5,10,10,10,10,15,15,15,30,30,60];

export class CApp extends CUqApp {
    protected async internalStart(isUserLogin: boolean) {
        this.setRes(res);
        setUI(this.uqs);
        
        this.openVPage(VMain, undefined, this.dispose);
    }

    private timer:any;
    protected onDispose() {
        clearInterval(this.timer);
        this.timer = undefined;
    }

    private tick = 0;
    private gapIndex = 0;
    private callTick = async () => {
        try {
            if (!this.user) return;
            ++this.tick;
            if (this.tick<gaps[this.gapIndex]) return;
            this.tick = 0;
            if (this.gapIndex < gaps.length - 1) ++this.gapIndex;
            let ret = await this.uqs.BzHelloTonwa.$poked.query(undefined, false);
            let v = ret.ret[0];
            if (v === undefined) return;
            if (!v.poke) return;
            this.gapIndex = 1;

            // 数据服务器提醒客户端刷新，下面代码重新调入的数据
            //this.cHome.refresh();
        }
        catch {
        }
    }
}
`;
    }
    get tsCBase() {
        return `${this.tsHeader}
import { CSub, CBase, CAppBase, IConstructor } from 'tonwa-${this.buildContext.uiPlatform}';
import { UQs } from './uqs';
import { CApp } from './CApp';

export abstract class CUqBase extends CBase<CApp, UQs> {
    protected async internalStart(param?:any, ...params:any[]):Promise<void> {}
}

export abstract class CUqSub<A extends CAppBase<U>, U, T extends CBase<A,U>> extends CSub<A, U, T> {
}

export abstract class CUqApp extends CAppBase<UQs> {
    newC<T extends CUqBase>(type: IConstructor<T>, ...param:any[]): T {
        let c = new type(this);
        c.internalInit(...param);
        return c;
    }
}
`;
    }
}
exports.TsTemplate = TsTemplate;
//# sourceMappingURL=TsTemplate.js.map