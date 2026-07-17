import type { Route } from "./+types/home";
import { content_ru } from "../constants/content_ru";
import { BASE_URL } from "~/settings";
import { HomePage } from "~/pages/HomePage/HomePage";

export function meta({ location }: Route.MetaArgs) {
  const pathname = location.pathname;
  const siteUrl = `${BASE_URL}${pathname}`;
  const { pages } = content_ru;
  const { home } = pages;

  return [
    { title: home.meta.title },
    { name: "description", content: home.meta.description },
    { property: "og:title", content: "ARTA — разработка сайтов и digital-решений" },
    {
      property: "og:description",
      content: "Создаём сайты, CRM/ERP, highload-платформы и автоматизируем бизнес-процессы.",
    },
    { property: "og:url", content: siteUrl },
    { property: "og:image", content: `${BASE_URL}/og-image.png` },
    { name: "twitter:card", content: "summary_large_image" },
    { rel: "canonical", href: siteUrl },
  ];
}
export default function Home() {
  return <HomePage />;
}
