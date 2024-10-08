"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const countryCodes = [
  { name: "Select Country Code", code: "" },
  { name: "United States", code: "+1" },
  { name: "Canada", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "Australia", code: "+61" },
  // Add more countries here
];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validate password length
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Post request to the registration API
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.countryCode + formData.phoneNumber,
          password: formData.password,
        }),
      });

      if (res.ok) {
        // Redirect to the verification page and pass the email as a query parameter
        setSuccess(true);
        router.push(`/auth/register/verification?email=${formData.email}`);
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-[#003E77]">Register</CardTitle>
        </CardHeader>
        <CardContent>
          {success ? (
            <p className="text-center text-green-500 mt-4">
              Registered Successfully redirecting to verification page
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4 flex gap-4">
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
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
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {/* Country code and phone number */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="phone"
                >
                  Phone Number <span className="text-xs">(optional)</span>
                </label>
                <div className="flex">
                  {/* Country code dropdown */}
                  <select
                    className="mr-2 p-2 border rounded text-sm"
                    value={formData.countryCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        countryCode: e.target.value,
                      })
                    }
                  >
                    {countryCodes.map((code) => (
                      <option key={code.code} value={code.code}>
                        {code.name}{" "}
                        {code.code.length != 0 ? `(${code.code})` : ""}
                      </option>
                    ))}
                  </select>

                  {/* Phone number input */}
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="flex-grow"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-[#1877F2] hover:bg-[#166FE5]"
              >
                Register
              </Button>
            </form>
          )}

          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
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
