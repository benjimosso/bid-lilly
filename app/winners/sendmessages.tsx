"use client";
import React from "react";
import { Winners } from "../utils/interface";
import { Button } from "@/components/ui/button";

export default function SendMessages({ winners }: { winners: Winners[] }) {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({winners}),
      });

      if (!response.ok) {
        throw new Error("Failed to send messages");
      }

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleSubmit} disabled={loading}>
      {loading ? "Sending..." : "Send Messages"}{" "}
    </Button>
  )
}
