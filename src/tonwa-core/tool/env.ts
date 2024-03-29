import { from62 } from './62';
import { LocalMap } from './localDb';
import { envGlobal } from './envGlobal';

export const env = (function () {
	let { unit, testing, params, lang, district, timeZone, isMobile } = initEnv();
	return {
		unit,
		testing,
		buildingUq: false,
		params,
		lang,
		district,
		timeZone,
		browser: detectBrowser(),
		isDevelopment: process.env.NODE_ENV === 'development',
		isMobile,
		localDb: new LocalMap(testing === true ? '$$' : '$'),
		setTimeout: (tag: string, callback: (...args: any[]) => void, ms: number, ...args: any[]): NodeJS.Timer => {
			return global.setTimeout(callback, ms, ...args);
		},
		clearTimeout: (handle: NodeJS.Timer): void => {
			global.clearTimeout(handle);
		},
		setInterval: (callback: (...args: any[]) => void, ms: number, ...args: any[]): NodeJS.Timer => {
			return global.setInterval(callback, ms, ...args);
		},
		clearInterval: (handle: NodeJS.Timer): void => {
			global.clearInterval(handle);
		}
	}
}());

function initEnv(): {
	unit: number;
	testing: boolean;
	params: { [key: string]: string };
	lang: string;
	district: string;
	timeZone: number;
	isMobile: boolean;
} {
	if (!(global as any).window) return {} as any;
	let pl = /\+/g,  // Regex for replacing addition symbol with a space
		search = /([^&=]+)=?([^&]*)/g,
		decode = function (s: any) { return decodeURIComponent(s.replace(pl, " ")); };
	let query: string = undefined;
	if ((global as any).window) {
		let win = (global as any).window;
		query = win.location.search.substring(1);
	}
	let params: { [key: string]: string } = {};
	for (; ;) {
		if (!query) break;
		let match = search.exec(query);
		if (!match) break;
		params[decode(match[1])] = decode(match[2]);
	}

	let testing: boolean; // = isTesting();
	let unit: number;

	let sUnit = params['u'] || params['unit'];
	if (sUnit) {
		let p = sUnit.indexOf('-');
		if (p >= 0) {
			let tc = sUnit.charCodeAt(p + 1);
			const tt = 'tT';
			testing = tc === tt.charCodeAt(0) || tc === tt.charCodeAt(1);
			sUnit = sUnit.substr(0, p);
		}
		else {
			testing = false;
		}
		if (sUnit[0] === '0') {
			unit = Number(sUnit);
		}
		else {
			unit = from62(sUnit);
		}
		if (isNaN(unit) === true) unit = undefined;
	}
	else {
		let { document } = envGlobal;
		// 下面都是为了兼容以前的操作。
		// 整个url上，只要有test作为独立的字符串出现，就是testing
		testing = /(\btest\b)/i.test(document.location.href);
		let unitName: string;
		let el = document.getElementById('unit');
		if (el) {
			unitName = el.innerText;
		}
		else {
			el = document.getElementById('unit.json');
			if (el) {
				let json = el.innerHTML;
				if (json) {
					let res = JSON.parse(json);
					unitName = res?.unit;
				}
			}
		}
		if (!unitName) {
			unitName = process.env.REACT_APP_UNIT;
		}

		if (unitName) {
			unit = Number.parseInt(unitName);
			if (Number.isInteger(unit) === false) {
				if (unitName === '百灵威') {
					unit = 24;
				}
			}
		}
		if (!unit) unit = 0;
	}
	let lang: string, district: string;
	let { navigator } = envGlobal;
	let language = (navigator.languages && navigator.languages[0])  // Chrome / Firefox
		|| navigator.language; // ||   // All browsers
	//navigator.userLanguage; // IE <= 10
	if (!language) {
		lang = 'zh';
		district = 'CN';
	}
	else {
		let parts = language.split('-');
		lang = parts[0];
		if (parts.length > 1) district = parts[1].toUpperCase();
	}
	let timeZone = -new Date().getTimezoneOffset() / 60;
	const regEx = new RegExp('Android|webOS|iPhone|iPad|' +
		'BlackBerry|Windows Phone|' +
		'Opera Mini|IEMobile|Mobile',
		'i');
	const isMobile = regEx.test(navigator.userAgent);
	return { unit, testing, params, lang, district, timeZone, isMobile };
}

function detectBrowser() {
	let { navigator, document } = envGlobal;
	if (!navigator) return;
	if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) >= 0)
		return 'Opera';
	if (navigator.userAgent.indexOf("Chrome") >= 0)
		return 'Chrome';
	if (navigator.userAgent.indexOf("Safari") >= 0)
		return 'Safari';
	if (navigator.userAgent.indexOf("Firefox") >= 0)
		return 'Firefox';
	if ((navigator.userAgent.indexOf("MSIE") >= 0) || (!!(document as any).documentMode === true))
		return 'IE'; //crap
	return 'Unknown';
}
