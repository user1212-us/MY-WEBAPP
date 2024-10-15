"use client";
import { useState } from "react";
import { Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TwitterPostForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const twitterPost = async function () {
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/postTweet-2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        console.error("Failed to post tweet.");
      }
    } catch (error) {
      setStatus("error");
      console.error("Error posting tweet:", error);
    }
  };

  return (
    <div m-0 p-0>
      <Button
        className="w-full md:w-auto"
        onClick={twitterPost}
        disabled={status === "loading"}
      >
        <Twitter className="w-4 h-4 mr-2" />
        {status === "loading" ? "Posting..." : "Post News"}
      </Button>
      {status === "success" && (
        <p className="text-green-500 mt-2">Tweet posted successfully!</p>
      )}
      {status === "error" && (
        <p className="text-red-500 mt-2">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
