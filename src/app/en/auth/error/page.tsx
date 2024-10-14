import { Metadata } from "next";
import ErrorComp from "@/components/auth/en/errorComp";

export const metadata: Metadata = {
  title: "Error | US Stock Hub",
};

export default function LoginPage() {
  return <ErrorComp />;
}
