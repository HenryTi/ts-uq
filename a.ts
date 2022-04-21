//=== UqApp builder created on Tue Jan 12 2021 23:14:51 GMT-0500 (GMT-05:00) ===//
// import { AppConfig } from "tonwa";
// import { DevConfig } from 'tonwa-core';

const bz: any /* DevConfig*/ = {
    name: 'bizdev',
    alias: 'bz',
}

export const appConfig: any /*AppConfig*/ = {
    version: '0.1.0',
    app: undefined,
    uqs: [
        {
            dev: bz,
            name: 'workshop',
            alias: 'Workshop',
            version: '0.1.0',
        },
        {
            dev: bz,
            name: 'workshop-bus-test',
            alias: 'WorkshopBusTest',
            version: '0.1.0',
        },
    ],
    noUnit: true,
    oem: undefined,
    htmlTitle: 'Timeschange Workshop',
};
