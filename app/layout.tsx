import type { Metadata } from "next";
import { Jost, Golos_Text, Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";

const display = Jost({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700"], variable: "--font-display", display: "swap" });
const body = Golos_Text({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700", "800"], variable: "--font-body", display: "swap" });
const georgian = Noto_Sans_Georgian({ subsets: ["georgian"], weight: ["400", "600", "700", "800"], variable: "--font-georgian", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mikava.vercel.app"),
  title: "MIKAVA estate — недвижимость в Батуми: продажа, аренда, сделки под ключ",
  description: "Агентство недвижимости MIKAVA estate в Батуми: квартиры и дома от $35 000, долгосрочная аренда, новостройки от застройщиков, сделка под ключ с доверенностью и регистрацией. 5.0 по 54 отзывам в Google. Офис: ул. Мазниашвили, 68.",
  openGraph: {
    title: "MIKAVA estate — недвижимость в Батуми",
    description: "Квартиры, дома и долгосрочная аренда в Батуми. Сделка под ключ. 5.0 в Google по 54 отзывам.",
    url: "https://mikava.vercel.app",
    siteName: "MIKAVA estate",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/images/skyline-sunset.webp", width: 1600, height: 1200 }],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <head><link rel="preload" as="image" href="/video/hero-poster.jpg" /></head>
      <body className={`${display.variable} ${body.variable} ${georgian.variable}`}>{children}</body>
    </html>
  );
}
