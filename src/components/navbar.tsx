"use client";

import Link from "next/link";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // If using Radix UI
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "./langSwitch";
import logo from "../assets/us-stock-hub-high-resolution-logo-transparent.png";
import { useMediaQuery } from "@/hooks/useMediaQuery"; // Add this import

export default function Navbar() {
  const { status } = useSession(); // Access the session data
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const langPrefix = pathName.split("/")[1];
  const isArabic = langPrefix === "ar";
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const handleAuth = async () => {
    if (status === "authenticated") {
      await signOut();
      router.push("/" + langPrefix + "/auth/login");
    } else {
      router.push("/" + langPrefix + "/auth/login");
    }
  };

  const navItems = isArabic
    ? [
        { href: "/ar/history", label: "النتائج" },
        { href: "/ar/signals", label: "التوصيات" },
        { href: "/ar/news", label: "الأخبار" },
        { href: "/ar/ask-about-stock", label: "اسأل عن سهم" },
        { href: "/ar", label: "الصفحة الرئيسية" },
      ]
    : [
        { href: "/en", label: "Home" },
        { href: "/en/ask-about-stock", label: "Ask About Stock" },
        { href: "/en/news", label: "News" },
        { href: "/en/signals", label: "Signals" },
        { href: "/en/history", label: "History" },
      ];
  const menuNav = isArabic ? navItems.slice().reverse() : navItems;
  return (
    <div className={`container mx-auto px-4 ${isArabic ? "dir-rtl" : ""}`}>
      <nav className={`flex justify-between items-center py-4`}>
        <div className="flex items-center ">
          <Image
            src={logo}
            alt="Logo"
            height={isMobile ? 30 : 50}
            className={`mr-4 w-auto h-auto `}
          />
        </div>

        <ul className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = pathName === item.href;
            const color = isActive ? "text-[#1877F2]" : "text-gray-600";
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${color} hover:text-[#1877F2] hover:bg-gray-100 px-2 py-1 rounded transition duration-300 ease-in-out ${
                    isTablet ? "text-sm" : "text-base"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center space-x-4">
          {!isMobile && (
            <LanguageSwitcher
              lang={isArabic ? "ar" : "en"}
              isMobile={isMobile}
            />
          )}

          {!isTablet && (
            <Button
              onClick={handleAuth}
              className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold px-4 py-2 rounded h-10"
            >
              {status === "authenticated"
                ? isArabic
                  ? "تسجيل الخروج"
                  : "Logout"
                : isArabic
                ? "تسجيل الدخول"
                : "Login"}
            </Button>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">
                {isArabic ? "فتح القائمة" : "Open menu"}
              </span>
            </Button>
          </SheetTrigger>
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle>{isArabic ? "القائمة" : "Menu"}</SheetTitle>
              <SheetDescription>
                {isArabic
                  ? "هذه قائمة للتنقل بين صفحات التطبيق."
                  : "This is a menu to navigate through the web app pages."}
              </SheetDescription>
            </SheetHeader>
          </VisuallyHidden>
          <SheetContent
            side={isArabic ? "right" : "left"}
            className="bg-gray-50 w-full sm:max-w-md transition-transform duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center mb-4">
              <h2 className="text-lg font-semibold">
                {isArabic ? "القائمة" : "Menu"}
              </h2>
            </div>
            <nav className="flex flex-col space-y-4">
              {menuNav.map((item) => {
                const isActive = pathName === item.href;
                const color = isActive ? "text-[#1877F2]" : "text-gray-600";
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${color} hover:text-[#1877F2] hover:bg-gray-100 px-2 py-1 rounded transition duration-300 ease-in-out ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {isMobile && (
                <LanguageSwitcher
                  lang={isArabic ? "ar" : "en"}
                  isMobile={isMobile}
                />
              )}

              {isTablet && (
                <Button
                  onClick={() => {
                    handleAuth();
                    setOpen(false);
                  }}
                  className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold px-4 py-2 rounded h-10 w-full"
                >
                  {status === "authenticated"
                    ? isArabic
                      ? "تسجيل الخروج"
                      : "Logout"
                    : isArabic
                    ? "تسجيل الدخول"
                    : "Login"}
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
