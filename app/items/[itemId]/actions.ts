import { createClient } from "@/utils/supabase/server";
import { Item, Bids } from "@/app/utils/interface";




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


