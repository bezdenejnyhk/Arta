import type { Route } from "./+types/portfolio";
import { content_ru } from "../constants/content_ru";
import { BASE_URL } from "~/settings";
import { PortfolioPage } from "~/pages/PortfolioPage/PortfolioPage";

export function meta({ location }: Route.MetaArgs) {
  const pathname = location.pathname;
  const siteUrl = `${BASE_URL}${pathname}`;
  const { pages } = content_ru;
  const { portfolio } = pages;

  return [
    { title: portfolio.meta.title },
    { name: "description", content: portfolio.meta.description },
    { property: "og:title", content: "Портфолио ARTA — кейсы по веб-разработке и автоматизации" },
    {
      property: "og:description",
      content:
        "Изучите кейсы проектов ARTA: сайты, клиентские порталы, CRM/ERP и digital-платформы.",
    },
    { property: "og:url", content: siteUrl },
    { property: "og:image", content: `${BASE_URL}/og-image.png` },
    { name: "twitter:card", content: "summary_large_image" },
    { rel: "canonical", href: siteUrl },
  ];
}
export default function Portfolio() {
  return <PortfolioPage />;
}
