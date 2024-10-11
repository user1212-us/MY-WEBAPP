import React from "react";
import { Rubik } from "next/font/google";

// Import Rubik with Arabic subset
const rubik = Rubik({
  weight: ["400"], // Define font weights
  subsets: ["arabic"], // Include Arabic subset
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${rubik.className} m-0 p-0`}>{children}</div>;
}
