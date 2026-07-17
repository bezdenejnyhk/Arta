import { useSearchParams } from "react-router";
import { content_ru } from "../constants/content_ru";

export type Lang = "ru";

const SUPPORTED_LANGS: Lang[] = ["ru"];

export function useLang() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawLang = searchParams.get("lang");
  const lang: Lang =
    rawLang && SUPPORTED_LANGS.includes(rawLang as Lang) ? (rawLang as Lang) : "ru";

  const content = lang === "ru" ? content_ru : content_ru;

  const setLang = (newLang: Lang) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("lang", newLang);
        return next;
      },
      { replace: true }
    );
  };

  const buildHref = (path: string): string => {
    if (lang === "ru") return path;
    return `${path}?lang=${lang}`;
  };

  return { lang, content, setLang, buildHref };
}
