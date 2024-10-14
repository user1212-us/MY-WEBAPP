import { Metadata } from "next";
import VerificationComp from "@/components/auth/ar/verificationComp";

export const metadata: Metadata = {
  title: "تتحقق من بريدك الالكتروني | US Stock Hub",
};

export default function VerificationPage() {
  return <VerificationComp />;
}
