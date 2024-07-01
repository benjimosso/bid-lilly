import { createClient } from "@/utils/supabase/server";
import { Item, Bids } from "@/app/utils/interface";
import { Knock } from "@knocklabs/node";
import React from "react";



export async function getItems({itemId}: {itemId: string}) {
  const supabase = createClient();
  const { data, error } = await supabase.from("items").select("*").eq("id", itemId).single();
  if (error) {
    console.error(error);
  }
  return data as Item;
}

export async function getBids({itemId}: {itemId: string}) {
  const supabase = createClient();
  const { data, error } = await supabase.from("bids").select("*").eq("item_id", itemId).order("amount", {ascending: false});
  if (error) {
    console.error(error);
  }
  return data as Bids[];
}

export async function getUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error(error);
  }
  return data;
}

export async function createBidAuction({e,bids, items, user, bid}: {bids: Bids[], items: Item, user: any, bid: number, e: React.FormEvent<HTMLFormElement>}): Promise<void> {

  e.preventDefault();
    if (bid <= items.startingPrice) {
      alert("Bid must be higher than the current bid");
      return;
    }
    const supabase = createClient();
    console.log("user", user?.user?.user_metadata?.last_name);
    const { data, error } = await supabase
      .from("bids")
      .insert([
        {
          item_id: items.id,
          amount: bid,
          user_id: user?.user?.id,
          full_name: user?.user?.user_metadata?.full_name,
          email: user?.user?.email,
        },
      ]);
    if (error) {
      console.error(error);
      return;
    }
    const { data: dataUpdate, error: updateError } = await supabase
      .from("items")
      .update({ currentBid: bid })
      .eq("id", items.id)
      .select();
    if (updateError) {
      console.error(updateError);
    }
    console.log("dataUpdate", dataUpdate);

    const knock = new Knock(process.env.KNOCK_SECRET_KEY || "");
  
  const recipients: {
    id: string;
    name: string;
    email: string;
  }[] = [];

  if (bids) {
    for (const bid of bids) {
      console.log("here!!!", bid.user_id, user?.user?.id);
      if (
        bid.user_id !== user?.user?.id &&
        !recipients.find((recipient) => recipient.id === bid.user_id)
      ) {
        recipients.push({
          id: bid.user_id,
          name: bid.full_name ?? "Unknown",
          email: bid.email ?? "Unknown",
        });
      }
    }
  }

  if (recipients.length > 0) {
    await knock.workflows.trigger("user-place-bid", {
      actor: {
        id: user?.user?.id ?? "Unknown",
        name: user?.user?.user_metadata?.full_name ?? "Unknown",
        email: user?.user?.email ?? "Unknown",
        collection: "users",
      },
      recipients,
      data: {
        item_id: items?.id,
        item_name: items?.name,
        bid_amount: items?.currentBid,
      },
    });
  }
  console.log("RECIPIENTS ARRAY", recipients);
}


// TODO: send notifications to all bidders when a new bid is placed
export async function sendNotifications({user, bids, items}: { user: any, bids: Bids[], items: Item}) {
  const knock = new Knock(process.env.KNOCK_SECRET_KEY || "");
  
  const recipients: {
    id: string;
    name: string;
    email: string;
  }[] = [];

  if (bids) {
    for (const bid of bids) {
      console.log("here!!!", bid.user_id, user?.user?.id);
      if (
        bid.user_id !== user?.user?.id &&
        !recipients.find((recipient) => recipient.id === bid.user_id)
      ) {
        recipients.push({
          id: bid.user_id,
          name: bid.full_name ?? "Unknown",
          email: bid.email ?? "Unknown",
        });
      }
    }
  }

  if (recipients.length > 0) {
    await knock.workflows.trigger("user-place-bid", {
      actor: {
        id: user?.user?.id ?? "Unknown",
        name: user?.user?.user_metadata?.full_name ?? "Unknown",
        email: user?.user?.email ?? "Unknown",
        collection: "users",
      },
      recipients,
      data: {
        item_id: items?.id,
        item_name: items?.name,
        bid_amount: items?.currentBid,
      },
    });
  }
  console.log("RECIPIENTS ARRAY", recipients);
}