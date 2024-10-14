import { Metadata } from "next";
import ResetPasswordComp from "@/components/auth/en/resetPass";

export const metadata: Metadata = {
  title: "Reset Password | US Stock Hub",
};

export default function ResetPasswordPage() {
  return <ResetPasswordComp />;
}
