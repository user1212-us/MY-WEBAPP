import { Metadata } from "next";
import RegisterComp from "@/components/auth/ar/registerComp";

export const metadata: Metadata = {
  title: "انشاء حساب جديد | US Stock Hub",
};

export default function RegisterationPage() {
  return <RegisterComp />;
}
