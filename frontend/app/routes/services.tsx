import type { Route } from "./+types/services";
import { content_ru } from "../constants/content_ru";
import { BASE_URL } from "~/settings";
import { ServicesPage } from "~/pages/ServicesPage/ServicesPage";

export function meta({ location }: Route.MetaArgs) {
  const pathname = location.pathname;
  const siteUrl = `${BASE_URL}${pathname}`;
  const { pages } = content_ru;
  const { services } = pages;

  return [
    { title: services.meta.title },
    { name: "description", content: services.meta.description },
    { property: "og:title", content: "Услуги ARTA — веб-разработка, CRM/ERP и highload" },
    {
      property: "og:description",
      content:
        "Разработка сайтов, корпоративных платформ, CRM/ERP и инфраструктуры для высоких нагрузок.",
    },
    { property: "og:url", content: siteUrl },
    { property: "og:image", content: `${BASE_URL}/og-image.png` },
    { name: "twitter:card", content: "summary_large_image" },
    { rel: "canonical", href: siteUrl },
  ];
}

export default function Services() {
  return <ServicesPage />;
}
