import { createClient } from "@/utils/supabase/server";
import { Item, Bids } from "@/app/utils/interface";
import { Type } from "lucide-react";

export async function getItems() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.error(error);
  }
  return data as Item[];
}

export async function getBids() {
  const supabase = createClient();
  const { data, error } = await supabase.from("bids").select("*");
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
export async function emailSent({ itemId }: { itemId: number}) {
    const supabase = createClient();
    const {data, error} = await supabase.rpc('update_email_sent_status', {p_id: itemId});
    if (error) {
        console.error("Error in emailSent function:", error);
    }
    console.log("Item ID", itemId, "Type:", typeof itemId)
    console.log("EmailSent Function Response:", data);
}