"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/signals", label: "Signals" },
  { href: "/admin/management", label: "Management" },
];
const newsDropdownItems = [
  { href: "/admin/news/sentiment", label: "Sentiment News" },
  { href: "/admin/news/upgrades-downgrades", label: "Upgrades/Downgrades" },
  { href: "/admin/news/price-targets", label: "Price Targets" },
];
export default function AdminTopNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNewsDropdownOpen, setIsNewsDropdownOpen] = useState(false);

  const isNewsSection = pathname.startsWith("/news");

  return (
    <nav className="bg-[#003E77] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <BarChart2 className="h-6 w-6" />
            <span className="text-xl font-bold">Stocks</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? "bg-[#1877F2] text-white"
                    : "text-gray-300 hover:bg-[#1877F2] hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={() => setIsNewsDropdownOpen(!isNewsDropdownOpen)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isNewsSection
                    ? "bg-[#1877F2] text-white"
                    : "text-gray-300 hover:bg-[#1877F2] hover:text-white"
                }`}
              >
                News <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isNewsDropdownOpen && (
                <div className="absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {newsDropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-2 text-sm ${
                          pathname === item.href
                            ? "bg-gray-100 text-[#003E77]"
                            : "text-gray-700 hover:bg-gray-100 hover:text-[#003E77]"
                        }`}
                        onClick={() => setIsNewsDropdownOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#1877F2] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? "bg-[#1877F2] text-white"
                    : "text-gray-300 hover:bg-[#1877F2] hover:text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={() => setIsNewsDropdownOpen(!isNewsDropdownOpen)}
                className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium ${
                  isNewsSection
                    ? "bg-[#1877F2] text-white"
                    : "text-gray-300 hover:bg-[#1877F2] hover:text-white"
                }`}
              >
                News <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isNewsDropdownOpen && (
                <div className="mt-2 space-y-1">
                  {newsDropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block pl-6 pr-3 py-2 rounded-md text-base font-medium ${
                        pathname === item.href
                          ? "bg-[#1877F2] text-white"
                          : "text-gray-300 hover:bg-[#1877F2] hover:text-white"
                      }`}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsNewsDropdownOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

//side bar

{
  /* <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-[#003E77] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between p-4">
          <Link href="/admin" className="flex items-center space-x-2">
            <BarChart2 className="h-8 w-8" />
            <span className="text-xl font-bold">US Stock Hub</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-[#1877F2]"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-8 px-4">
          {navItems.map((item) => (
            <TooltipProvider key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 mt-2 text-sm rounded-lg transition-colors ${
                      pathName === item.href
                        ? "bg-[#1877F2] text-white"
                        : "text-gray-300 hover:bg-[#1877F2] hover:text-white"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </aside> */
}
