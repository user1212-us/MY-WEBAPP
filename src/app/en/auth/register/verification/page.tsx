import VerificationComp from "@/components/auth/en/verificationComp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verification | US Stock Hub",
};

export default function ResetPasswordPage() {
  return <VerificationComp />;
}
