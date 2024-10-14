import RegisterComp from "@/components/auth/en/registerCompt";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registeration | US Stock Hub",
};

export default function ResetPasswordPage() {
  return <RegisterComp />;
}
