"use client";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { start } from "repl";
import { useRouter } from "next/navigation";
import {Item, Bids} from "@/app/utils/interface";




export default function PlaceBid({
  currentBid,
  startingPrice,
  handleSubmit,
}: {
  currentBid: number;
  startingPrice: number;
  handleSubmit: any;
}) {
  const [bid, setBid] = useState<number>(
    currentBid ? currentBid + 1 : startingPrice + 1
  );

  
  
  //   console.log("current bid: " ,currentBid, "starting Price: " ,startingPrice, "itemId: ", itemId);
  const router = useRouter();

  
  return (
    <>
    <form
      className="flex flex-col gap-5"
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit(bid);
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
    {/* <div className="mt-7">
      <Button onClick={async () => {handleSubmit(bid)}}>PRESS ME</Button>
    </div> */}
    </>
  );
}
