//=== UqApp builder created on Tue Feb 22 2022 17:37:36 GMT-0500 (北美东部标准时间) ===//
import { VPage, Page } from 'tonwa-react';
import { CApp } from './CApp';

export class VMain extends VPage<CApp> {
    header() { return 'TEST'; }
    content() {
        return <div className="m-3">
            <div>{this.renderMe()}</div>
            <div className="mb-5">同花样例主页面</div>
        </div>;
    }
}
