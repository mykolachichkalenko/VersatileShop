import ua from './locals/ua.json';
import en from './locals/en.json';
import ru from './locals/ru.json';

export const translations = { ua, en,ru } as const;

export type Lang = 'ua' | 'en' | 'ru';

export const translate = (lang: Lang, key: string): string => {
    const parts = key.split('.');
    let current: any = translations[lang];

    for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
            current = current[part];
        } else {
            return key;
        }
    }

    return typeof current === 'string' ? current : key;
};