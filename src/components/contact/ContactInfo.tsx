"use client";

import { useTranslations } from "next-intl";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

export function ContactInfo() {
  const t = useTranslations("contact.info");

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/edutech",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/edutech",
      label: "Instagram",
      color: "hover:text-pink-600",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/edutech",
      label: "LinkedIn",
      color: "hover:text-blue-700",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/@edutech",
      label: "YouTube",
      color: "hover:text-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Contact Details Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">{t("address")}</h2>
        <div className="space-y-4">
          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">{t("address")}</h3>
              <p className="text-gray-600">
                רחוב הרצל 123
                <br />
                תל אביב, 6801234
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">{t("phone")}</h3>
              <a
                href="tel:+972501234567"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                050-123-4567
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">{t("email")}</h3>
              <a
                href="mailto:info@edu-tech.co.il"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                info@edu-tech.co.il
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">{t("hours")}</h3>
              <p className="text-gray-600">
                ראשון - חמישי: 9:00 - 18:00
                <br />
                שישי: 9:00 - 14:00
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="font-bold text-lg mb-4">עקבו אחרינו</h3>
        <div className="flex gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center transition-all ${social.color} hover:scale-110`}
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-gray-200 rounded-xl overflow-hidden h-64">
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          <MapPin className="w-12 h-12" />
        </div>
      </div>
    </div>
  );
}
