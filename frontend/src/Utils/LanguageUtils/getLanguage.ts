import {translate} from "./translate.ts";

export function getLanguage(key: string): string {
    const saved = localStorage.getItem('lang');
    const lang = saved === 'ua' || saved === 'en' || saved === 'ru' ? saved : 'ua';

    return translate(lang, key);
}