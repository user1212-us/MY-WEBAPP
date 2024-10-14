import { Metadata } from "next";
import ErrorComp from "@/components/auth/ar/errorComp";

export const metadata: Metadata = {
  title: "حدث خطأ ما | US Stock Hub",
};

export default function LoginPage() {
  return <ErrorComp />;
}
