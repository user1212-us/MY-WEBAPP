import React from "react";
import SessionWrapper from "@/components/sessionWrapper";
import Footer from "@/components/footer";
import "./globals.css"; // Import the global CSS
import Navbar from "@/components/navbar";

export const metadata = {
  metadataBase: new URL("https://usstockhub.com"), // Replace with your actual domain

  title: "Stock Market News & Signals | US Stock Hub",
  description:
    "Stay updated with the latest stock market news, signals, and comprehensive stock analysis. Get accurate trading signals powered by advanced algorithms.",
  keywords:
    "stock market, trading signals, stock news, US stock market, financial data, stock analysis, trading insights",
  charset: "UTF-8",
  openGraph: {
    title: "US Stock Hub",
    url: "https://usstockhub.com",
    siteName: "Us",
    images: [
      {
        width: 1200,
        height: 630,
        alt: "US Stockhub Logo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-black">
        <header className="bg-background shadow-md">
          <SessionWrapper>
            <Navbar />
          </SessionWrapper>
        </header>
        <main className="flex-grow container mx-auto px-4 py-8">
          <SessionWrapper>{children}</SessionWrapper>
        </main>
        <footer className="bg-[#1877F2] text-white py-8">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
