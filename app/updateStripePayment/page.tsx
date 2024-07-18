'use client'; // Add this directive to indicate it's a client component
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import ButtonSubmit from "./buttonSubmit";
import convertToSubcurrency from "../utils/convertToSubcurrency";

async function UpdateProductPrice(productId: string, newPrice: number) {
  const response = await fetch(`/api/update-price`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, newPrice: convertToSubcurrency(newPrice) }),
  });
  if (response.ok) {
    const data = await response.json();
    console.log("Price updated:", data);
  } else {
    const errorData = await response.json();
    console.error("Error updating price:", errorData.error);
  }
}

export default function UpdateStripePrice() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("items").select("currentBid, stripe_Price_id");
      if (error) {
        console.error(error);
      } else {
        console.log("Data from Supabase:", data);
        setData(data);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    data.map(async (item) => {
      if (item.stripe_Price_id) {
        await UpdateProductPrice(item.stripe_Price_id, item.currentBid);
        console.log("Price updated:", item.currentBid);
        console.log("Price ID:", item.stripe_Price_id);
      }
    });
    console.log("Price handle submit instance");
  };

  return (
    <div>
      <ButtonSubmit handleSubmit={handleSubmit} />
    </div>
  );
}