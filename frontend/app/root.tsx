import { AnimatePresence } from "framer-motion";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { BASE_URL } from "./settings";

import type { Route } from "./+types/root";
import "./styles/reset.scss";
import "./styles/global.scss";

import "./styles/responsive.scss";

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ModalForm } from "./components/ModalForm/ModalForm";
import { ContactModalProvider, useContactModal } from "./hooks/useContactModal";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const siteUrl = BASE_URL;

  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="ARTA — студия веб-разработки и digital-решений: сайты, CRM/ERP, высоконагруженные платформы и автоматизация бизнеса."
        />
        <meta name="theme-color" content="#0f0f0f" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ARTA" />
        <meta property="og:title" content="ARTA — веб-разработка и digital-решения" />
        <meta
          property="og:description"
          content="Создаём современные сайты, корпоративные платформы и CRM/ERP-системы под задачи бизнеса."
        />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ARTA — веб-разработка и digital-решения" />
        <meta
          name="twitter:description"
          content="Сайты, CRM/ERP, highload и digital-решения под ключ."
        />
        <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
        <link rel="canonical" href={siteUrl} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function AppContent() {
  const { isOpen, closeModal } = useContactModal();

  return (
    <div className="appWrapper">
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <Outlet />
      </AnimatePresence>
      <ModalForm isOpen={isOpen} onClose={closeModal} />
    </div>
  );
}

export default function App() {
  return (
    <ContactModalProvider>
      <AppContent />
    </ContactModalProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
