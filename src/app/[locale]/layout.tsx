import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { GeistSans } from "geist/font/sans";
import { notFound } from "next/navigation";
import { locales } from "../../../i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/Toast";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const direction = locale === "he" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction} className={GeistSans.variable}>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
