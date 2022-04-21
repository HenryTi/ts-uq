//=== UqApp builder created on Fri Feb 25 2022 11:38:12 GMT-0500 (北美东部标准时间) ===//
import { NavView, start, nav } from 'tonwa-react';
import { CApp } from './CApp';
import { appConfig } from './appConfig';

export const App: React.FC = () => {
    nav.setSettings(appConfig);
    const onLogined = async (isUserLogin?:boolean) => {
        await start(CApp, appConfig, isUserLogin);
    }
    return <NavView onLogined={onLogined} />;
}

