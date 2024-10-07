"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Error() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div dir="rtl">
      <h1>حدث خطأ</h1>
      {error && <p>{error}</p>} {/* Display the error message */}
      <a href="ar/auth/login">العودة إلى تسجيل الدخول</a>
    </div>
  );
}
export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Error />
    </Suspense>
  );
}
