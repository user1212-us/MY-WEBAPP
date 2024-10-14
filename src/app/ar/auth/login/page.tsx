import { Metadata } from "next";
import LoginComp from "@/components/auth/ar/logInComp";

export const metadata: Metadata = {
  title: "تسجيل الدخول | US Stock Hub",
};

export default function LoginPage() {
  return <LoginComp />;
}
