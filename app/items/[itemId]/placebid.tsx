"use client";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { start } from "repl";
import { useRouter } from "next/navigation";


export default function PlaceBid({
  itemId,
  currentBid,
  startingPrice,
}: {
  itemId: string;
  currentBid: number;
  startingPrice: number;
}) {
  const [bid, setBid] = useState<number>(
    currentBid ? currentBid + 1 : startingPrice + 1
  );
  //   console.log("current bid: " ,currentBid, "starting Price: " ,startingPrice, "itemId: ", itemId);
  const router = useRouter();



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (bid <= startingPrice) {
      alert("Bid must be higher than the current bid");
      return;
    }
    const supabase = createClient();
    const { data: user, error: userError } = await supabase.auth.getUser();
    // console.log("user", user?.user?.user_metadata?.last_name);
    const { data, error } = await supabase
      .from("bids")
      .insert([
        {
          item_id: itemId,
          amount: bid,
          user_id: user?.user?.id,
          full_name: user?.user?.user_metadata?.full_name,
        },
      ]);
    if (error) {
      console.error(error);
      return;
    }
    const { data: dataUpdate, error: updateError } = await supabase
      .from("items")
      .update({ currentBid: bid })
      .eq("id", itemId)
      .select();
    if (updateError) {
      console.error(updateError);
    }
    console.log("dataUpdate", dataUpdate);
    router.refresh();
  };

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Input
        type="number"
        placeholder="Enter your bid"
        className="w-1/2"
        value={bid}
        onChange={(e) => setBid(parseInt(e.target.value))}
      ></Input>
      <Button type="submit" className="max w-3/6 ">
        Place Bid
      </Button>
    </form>
  );
}
