"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function ForgotPasswordComp() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, lang: "en" }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset email sent. Please check your inbox.");
      } else {
        setError(data.message || "An error occurred.");
      }
    } catch (error) {
      setError("Failed to send password reset email. Please try again later.");
      console.log(error);
    }
  };
  return (
    <>
      <Card className="max-w-md mx-auto mt-10 ">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#003E77]">
            Forgot Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold"
            >
              Reset Password
            </Button>
          </form>
          {message && <p className="mt-4 text-green-600">{message}</p>}
          {error && <p className="mt-4 text-red-600">{error}</p>}
          <p className="mt-4 text-center text-sm text-gray-500">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="text-[#1877F2] hover:text-[#166FE5]"
            >
              Login here
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
}
