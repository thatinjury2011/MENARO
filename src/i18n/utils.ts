import { defaultLang, locales, type Lang } from './config';

export function getLangFromUrl(url: URL): Lang {
  const segment = url.pathname.split('/')[1];
  return (locales as readonly string[]).includes(segment) ? (segment as Lang) : defaultLang;
}

/** 把站内路径本地化：中文留在根路径，英文加 /en 前缀 */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  return clean === '/' ? '/en' : `/en${clean}`;
}

/** 当前路径在另一种语言下的对应地址（用于语言切换） */
export function alternateLangHref(url: URL, target: Lang): string {
  const segments = url.pathname.split('/').filter(Boolean);
  const current = getLangFromUrl(url);
  const rest = current === defaultLang ? segments : segments.slice(1);
  const path = rest.length ? `/${rest.join('/')}` : '/';
  return localizePath(path, target);
}
