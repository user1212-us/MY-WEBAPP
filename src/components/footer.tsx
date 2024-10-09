"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { usePathname } from "next/navigation";
import { Rubik } from "@next/font/google";

// Import Rubik with Arabic subset
const rubik = Rubik({
  weight: ["400"], // Define font weights
  subsets: ["arabic"], // Include Arabic subset
});

const Footer = () => {
  const pathName = usePathname();
  const langPrefix = pathName.split("/")[1];
  const isArabic = langPrefix === "ar";

  const quickLinks = isArabic
    ? [
        { href: "/ar", label: "الصفحة الرئيسية" },
        { href: "/ar/news", label: "الأخبار" },
        { href: "/ar/signals", label: "التوصيات" },
        { href: "/ar/history", label: "النتائج" },
        { href: "/ar/ask-about-stock", label: "اسأل عن سهم" },
      ]
    : [
        { href: "/en", label: "Home" },
        { href: "/en/news", label: "News" },
        { href: "/en/signals", label: "Signals" },
        { href: "/en/history", label: "History" },
        { href: "/en/ask-about-stock", label: "Ask About Stock" },
      ];

  return (
    <div
      className={`container mx-auto px-4 ${
        isArabic ? `dir-rtl text-right ${rubik.className}` : ""
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">US Stock Hub</h3>
          <p className="text-sm">
            {isArabic
              ? "مصدرك الموثوق للحصول على رؤى وتحليلات سوق الأسهم."
              : "Your trusted source for stock market insights and analysis."}
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">
            {isArabic ? "روابط سريعة" : "Quick Links"}
          </h4>
          <ul className="text-sm space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-[#D9E8FB] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">
            {isArabic ? "اتصل بنا" : "Contact Us"}
          </h4>
          <p className="text-sm mb-2">
            {isArabic
              ? "info@usstockhub.com : البريد الإلكتروني "
              : "Email: info@usstockhub.com"}
          </p>
          {/*          <p className="text-sm mb-2">
            {isArabic
              ? "الهاتف: +1 (123) 456-7890"
              : "Phone: +1 (123) 456-7890"}
          </p> */}
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">
            {isArabic ? "تابعنا" : "Follow US"}
          </h4>
          <div className={`flex space-x-4 ${isArabic ? "justify-end " : ""}`}>
            <a
              href="#"
              className="text-white hover:text-[#D9E8FB] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-white hover:text-[#D9E8FB] transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-white hover:text-[#D9E8FB] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-[#D9E8FB] pt-8 text-sm text-center">
        <p>
          {isArabic
            ? `© ${new Date().getFullYear()} US Stock Hub. جميع الحقوق محفوظة.`
            : `© ${new Date().getFullYear()} US Stock Hub. All rights reserved.`}
        </p>
      </div>
    </div>
  );
};

export default Footer;
