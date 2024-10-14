import LoginComp from "@/components/auth/en/logInComp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | US Stock Hub",
};

export default function ResetPasswordPage() {
  return <LoginComp />;
}
