//=== UqApp builder created on Thu Apr 14 2022 12:04:11 GMT-0400 (北美东部夏令时间) ===//
import { CSub, CBase, CAppBase, IConstructor } from 'tonwa-react';
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
