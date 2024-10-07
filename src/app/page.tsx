import React from "react";
import Image from "next/image";
import homeImage from "../assets/home.jpg";
import { Metadata } from "next";
import Trending from "@/components/trending";
export const metadata: Metadata = {
  title: "Home | Stock Market News & Advanced Signals",
  description:
    "Discover the most accurate stock trading signals powered by advanced algorithms, along with the latest US stock market news and insights.",
  keywords:
    "stock signals, US stock market news, trading signals, stock market insights, financial analysis, stock data",
};

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
          Trending Stocks
        </h2>
        <Trending />
      </section>

      <section className="mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Why Us
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              We follow advanced algorithms to deliver the most accurate stock
              signals, giving you a competitive edge in the market. Plus, we
              provide comprehensive information about any US stock you&apos;re
              interested in. Also, you will stay informed with the latest news
              and articles about the US stock market. We aggregate real-time
              updates from reliable sources so you never miss out on important
              market changes.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-xl shadow-2xl">
              <Image
                src={homeImage}
                alt="Stock market graph"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          About Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-[#1877F2]">
              Who We Are
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              We&apos;re a team of finance experts and technologists passionate
              about making stock trading more accessible and data-driven.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-[#1877F2]">
              Our Mission
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              To empower traders of all levels with the tools and insights they
              need to make informed, confident decisions in the stock market.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-[#1877F2]">
              Why We Started
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              We saw a need for more accurate signals and comprehensive
              information for retail investors, so we built this platform to
              offer both reliability and clarity.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-[#1877F2]">
              Core Values
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Transparency, accuracy, and innovation in everything we do.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
