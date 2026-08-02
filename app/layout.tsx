import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aura | نموذج حجوزات البيلاتس واليوغا",
  description:
    "نموذج تفاعلي لتطبيق Aura لحجز جلسات البيلاتس واليوغا في المراكز القريبة.",
  openGraph: {
    title: "Aura",
    description:
      "نموذج تفاعلي حديث لتطبيق حجوزات مراكز البيلاتس واليوغا.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#111714" },
  ],
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
