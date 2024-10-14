import { Metadata } from "next";
import ForgotPasswordComp from "@/components/auth/ar/forgetComp";
export const metadata: Metadata = {
  title: "نسيت كلمة المرور | US Stock Hub",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordComp />;
}
