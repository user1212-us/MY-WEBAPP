import { Metadata } from "next";
import ResetPasswordComp from "@/components/auth/ar/resetPass";

export const metadata: Metadata = {
  title: "اعادة نغيين كلمة المرور | US Stock Hub",
};

export default function ResetPasswordPage() {
  return <ResetPasswordComp />;
}
