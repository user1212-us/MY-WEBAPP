"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // This effect runs only once when the component mounts
    const searchParams = new URLSearchParams(window.location.search);
    const msg = searchParams.get("message");
    const errorParam = searchParams.get("error");

    if (msg) {
      setError(decodeURIComponent(msg));
    } else if (errorParam) {
      setError("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.");
    }

    // Clear the URL parameters
    if (msg || errorParam) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset the error before making the request.

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error); // Display error if authentication fails.
    } else if (result?.ok) {
      // Redirect to the home page after successful login.
      setSuccess(true);
      router.push("/ar");

      window.location.reload(); // Forces a full page reload
    }
  };

  return (
    <>
      {error && error === "Please log in to access this page" && (
        <div
          className="w-full max-w-md mx-auto mb-4 p-4 rounded-md bg-blue-50 border border-blue-200 "
          dir="rtl"
        >
          <p className="text-[#003E77] text-sm font-medium">{error}</p>
        </div>
      )}
      <Card className="max-w-md mx-auto mt-10" dir="rtl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#003E77]">
            تسجيل الدخول
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success ? (
            <p className="text-center text-green-500 mt-4">
              تم تسجيل الدخول بنجاح! جارٍ إعادة التوجيه...
            </p>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="email"
                  >
                    البريد الإلكتروني
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="password"
                  >
                    كلمة المرور
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && error !== "Please log in to access this page" && (
                  <p className="text-red-500 text-sm mb-4">{error}</p>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto mb-4 sm:mb-0 bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold"
                  >
                    تسجيل الدخول
                  </Button>
                  <Link
                    href="/ar/auth/forgot-password"
                    className="text-sm text-[#1877F2] hover:text-[#166FE5] font-bold"
                  >
                    هل نسيت كلمة المرور؟
                  </Link>
                </div>
              </form>
              <div className="flex flex-col space-y-4 mt-4">
                <Button
                  className="flex items-center justify-center w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2"
                  onClick={() => signIn("google")}
                >
                  تسجيل الدخول باستخدام جوجل
                  <FaGoogle className="mr-2" />
                </Button>
              </div>
              <p className="mt-4 text-center text-xs text-gray-500">
                ليس لديك حساب؟{" "}
                <Link
                  href="/ar/auth/register"
                  className="text-[#1877F2] hover:text-[#166FE5]"
                >
                  سجل هنا
                </Link>
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
