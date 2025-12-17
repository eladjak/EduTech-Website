"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const subBrands = [
  {
    id: "ai",
    color: "from-purple-500 to-pink-500",
    textColor: "text-purple-600",
    bgHover: "hover:bg-purple-50",
  },
  {
    id: "kids",
    color: "from-blue-500 to-cyan-500",
    textColor: "text-blue-600",
    bgHover: "hover:bg-blue-50",
  },
  {
    id: "pro",
    color: "from-orange-500 to-red-500",
    textColor: "text-orange-600",
    bgHover: "hover:bg-orange-50",
  },
  {
    id: "edu",
    color: "from-green-500 to-emerald-500",
    textColor: "text-green-600",
    bgHover: "hover:bg-green-50",
  },
  {
    id: "camp",
    color: "from-yellow-500 to-amber-500",
    textColor: "text-yellow-600",
    bgHover: "hover:bg-yellow-50",
  },
];

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [tracksMenuOpen, setTracksMenuOpen] = React.useState(false);

  const isRTL = locale === "he";

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/activities", label: t("nav.activities") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/careers", label: t("nav.careers") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const switchLocale = () => {
    const newLocale = locale === "he" ? "en" : "he";
    const currentPath = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${newLocale}${currentPath}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <div className={cn("flex flex-col", isRTL && "items-end")}>
              <span className="font-bold text-lg leading-none">EduTech</span>
              <span className="text-xs text-muted-foreground">
                {t("footer.description")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === `/${locale}${item.href}`
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* Tracks Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setTracksMenuOpen(true)}
              onMouseLeave={() => setTracksMenuOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                {t("nav.tracks")}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    tracksMenuOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {tracksMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "absolute top-full mt-2 w-[500px] bg-white rounded-lg shadow-lg border p-4",
                      isRTL ? "right-0" : "left-0"
                    )}
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {subBrands.map((brand) => (
                        <Link
                          key={brand.id}
                          href={`/${locale}/tracks/${brand.id}`}
                          className={cn(
                            "block p-4 rounded-lg transition-all duration-200",
                            brand.bgHover,
                            "border border-transparent hover:border-gray-200"
                          )}
                        >
                          <div
                            className={cn(
                              "font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent",
                              brand.color
                            )}
                          >
                            {t(`home.tracks.${brand.id}.title`)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {t(`home.tracks.${brand.id}.description`)}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={switchLocale}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Switch language"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">
                {locale === "he" ? "EN" : "עב"}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t overflow-hidden"
            >
              <div className="py-4 space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-2 rounded-lg transition-colors",
                      pathname === `/${locale}${item.href}`
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-gray-100"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile Tracks */}
                <div className="px-4 py-2">
                  <div className="font-semibold mb-2 text-sm text-muted-foreground">
                    {t("nav.tracks")}
                  </div>
                  <div className="space-y-2">
                    {subBrands.map((brand) => (
                      <Link
                        key={brand.id}
                        href={`/${locale}/tracks/${brand.id}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block p-3 rounded-lg transition-all",
                          brand.bgHover
                        )}
                      >
                        <div
                          className={cn(
                            "font-bold text-sm bg-gradient-to-r bg-clip-text text-transparent",
                            brand.color
                          )}
                        >
                          {t(`home.tracks.${brand.id}.title`)}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
