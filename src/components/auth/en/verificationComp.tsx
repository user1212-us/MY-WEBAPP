"use client";
import React, { useState, Suspense, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter, useSearchParams } from "next/navigation";

function VerificationForm() {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (verificationCode.length !== 6) {
      setError("Please enter a 6-letter verification code.");
      return;
    }

    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      const data = await response.json();
      if (response.ok) {
        // Redirect after successful verification
        router.push("/auth/login");
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error verifying the code:", error);
      setError("Error verifying the code.");
    }
  };

  const [resendTimer, setResendTimer] = useState(0); // Timer in seconds

  const handleResend = async () => {
    try {
      const res = await fetch("/api/auth/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setResendTimer(60); // Set the timer for 1 minute (60 seconds)
      } else {
        setError(data.error || "Error resending the verification code.");
      }
    } catch (error) {
      console.log("An error occurred. Please try again.", error);
    }
  };

  // Decrease the resend timer every second
  useEffect(() => {
    if (resendTimer > 0) {
      const intervalId = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId); // Clear interval when component unmounts or timer changes
    }
  }, [resendTimer]);

  return (
    <Card className="max-w-md mx-auto mt-10 ">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-[#003E77]">
          Verify Your Email
        </CardTitle>
        <CardDescription className="text-center">
          We've sent a 6-letter verification code to your {email}. Please enter
          it below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="verificationCode"
            >
              Verification Code
            </label>
            <Input
              id="verificationCode"
              name="verificationCode"
              type="text"
              placeholder="Enter 6-letter code"
              value={verificationCode}
              onChange={(e) =>
                setVerificationCode(e.target.value.toUpperCase())
              }
              maxLength={6}
              className="text-center text-2xl tracking-widest"
              required
            />
          </div>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold"
          >
            Verify
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Didn't receive the code?{" "}
          <button
            className={`text-[#1877F2] hover:text-[#166FE5] ${
              resendTimer > 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleResend}
            disabled={resendTimer > 0}
          >
            {resendTimer > 0
              ? `Resend (${resendTimer} seconds)`
              : "Resend Verification Code"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </p>
      </CardContent>
    </Card>
  );
}

export default function VerificationComp() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <VerificationForm />
      </Suspense>
    </>
  );
}
