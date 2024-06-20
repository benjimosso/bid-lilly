import React from "react";
import { createClient } from "@/utils/supabase/server";
import EmptyState from "./empty-state";

export default async function MyAuctionPage() {
  const supabase = createClient();
  //get user
  const { data: user, error: userError } = await supabase.auth.getUser();
  // get items posted by user
  const { data: items, error: itemsError } = await supabase
    .from("items")
    .select("*")
    .eq("user_id", user.user?.id);
  if (userError) {
    console.log(userError);
  }
  if (itemsError) {
    console.log(itemsError);
  }
  console.log(items?.length);
  // console.log(user, items, "from my auctions")
  return (
    <main className="space-y-8">
      <h1 className="text-4xl font-bold">Your Current Auctions</h1>
      {items?.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {items &&
            items.map((item: any, index: number) => (
              <div key={index} className="border-2 border-black">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>Starting Price: ${item.startingPrice}</p>
              </div>
            ))}
        </div>
      )}
    </main>
  );
}
