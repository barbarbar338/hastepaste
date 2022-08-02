import en from "@locales/en.yaml";
import tr from "@locales/tr.yaml";
import ru from "@locales/ru.yaml";
import constants from "@locales/constants.yaml";

const locales = { en, tr, ru };

export interface LooseObject {
	[param: string]: unknown;
}

export class LocaleParser {
	private locale: string;
	constructor(locale: string) {
		this.locale = locale;
	}
	public get(
		name: string,
		args?: { [param: string]: string },
	): string | string[] {
		const locale = locales[this.locale] as { [prop: string]: string | string[] };
		// eslint-disable-next-line no-prototype-builtins
		let str = Object(locale).hasOwnProperty(name) ? locale[name] : null;
		if (!str) return `${name} not found in ${this.locale}`;
		for (const constant in constants as { [param: string]: string }) {
			const regToken = new RegExp(`%{${constant}}`, "gm");
			if (Array.isArray(str)) {
				str = str.map((s) =>
					s.replace(regToken, (constants as { [param: string]: string })[constant]),
				);
			} else {
				str = str.replace(
					regToken,
					(constants as { [param: string]: string })[constant],
				);
			}
		}
		if (args) {
			for (const arg in args) {
				const regToken = new RegExp(`%{${arg}}`, "gm");
				if (Array.isArray(str)) {
					str = str.map((s) => s.replace(regToken, args[arg]));
				} else {
					str = str.replace(regToken, args[arg]);
				}
			}
		}
		return str;
	}
}
