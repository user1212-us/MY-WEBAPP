import ForgotPasswordComp from "@/components/auth/en/forgetComp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | US Stock Hub",
};

export default function ResetPasswordPage() {
  return <ForgotPasswordComp />;
}
