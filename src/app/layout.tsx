import React from "react";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { NavigationMenu } from "@/components/ui/NavigationMenu";

export const metadata: Metadata = {
  title: "EduTech - פיתוח דור העתיד בטכנולוגיה",
  description: "קורסים, סדנאות ומחנות המותאמים לילדים, נוער, מבוגרים ואנשי חינוך",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={`${GeistSans.variable}`}>
      <body>
        <NavigationMenu />
        {children}
      </body>
    </html>
  );
}
