import { createClient } from "@/utils/supabase/server";
import { Knock } from "@knocklabs/node";

const knock = new Knock(process.env.KNOCK_SECRET_KEY || "");

export async function getItems({itemId}: {itemId: string}) {
  const supabase = createClient();
  const { data, error } = await supabase.from("items").select("*").eq("id", itemId).single();
  if (error) {
    console.error(error);
  }
  return data;
}

export async function getBids({itemId}: {itemId: string}) {
  const supabase = createClient();
  const { data, error } = await supabase.from("bids").select("*").eq("item_id", itemId).order("amount", {ascending: false});
  if (error) {
    console.error(error);
  }
  return data;
}

// TODO: send notifications to all bidders when a new bid is placed
