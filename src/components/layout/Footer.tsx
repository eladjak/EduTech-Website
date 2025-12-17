"use client";

import * as React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "he";
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/activities", label: t("nav.activities") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/careers", label: t("nav.careers") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const tracks = [
    { id: "ai", label: t("home.tracks.ai.title") },
    { id: "kids", label: t("home.tracks.kids.title") },
    { id: "pro", label: t("home.tracks.pro.title") },
    { id: "edu", label: t("home.tracks.edu.title") },
    { id: "camp", label: t("home.tracks.camp.title") },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/edutech", label: "Facebook" },
    {
      icon: Instagram,
      href: "https://instagram.com/edutech",
      label: "Instagram",
    },
    { icon: Linkedin, href: "https://linkedin.com/company/edutech", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com/@edutech", label: "YouTube" },
  ];

  const legalLinks = [
    { href: "/legal/terms", label: t("footer.legal.terms") },
    { href: "/legal/privacy", label: t("footer.legal.privacy") },
    { href: "/legal/accessibility", label: t("footer.legal.accessibility") },
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setEmail("");
        alert("נרשמת בהצלחה לניוזלטר!");
      } else {
        const data = await response.json();
        alert(data.error || "משהו השתבש");
      }
    } catch (error) {
      alert("משהו השתבש, אנא נסה שנית");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="font-bold text-xl text-white">EduTech</span>
            </div>
            <p className="text-sm">{t("footer.description")}</p>

            {/* Contact Info */}
            <div className="space-y-2">
              <a
                href="mailto:info@edu-tech.co.il"
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>info@edu-tech.co.il</span>
              </a>
              <a
                href="tel:+972501234567"
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>050-123-4567</span>
              </a>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  {locale === "he"
                    ? "תל אביב, ישראל"
                    : "Tel Aviv, Israel"}
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tracks */}
          <div>
            <h3 className="font-bold text-white mb-4">{t("nav.tracks")}</h3>
            <ul className="space-y-2">
              {tracks.map((track) => (
                <li key={track.id}>
                  <Link
                    href={`/${locale}/tracks/${track.id}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {track.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-white mb-2">
              {t("footer.newsletter.title")}
            </h3>
            <p className="text-sm mb-4">{t("footer.newsletter.subtitle")}</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.newsletter.placeholder")}
                required
                className={cn(
                  "w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700",
                  "text-white placeholder:text-gray-500",
                  "focus:outline-none focus:border-blue-500 transition-colors",
                  isRTL && "text-right"
                )}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium",
                  "hover:bg-blue-700 transition-colors",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {isSubmitting ? t("common.loading") : t("footer.newsletter.button")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              {t("footer.copyright", { year: currentYear })}
            </p>
            <div className="flex gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
