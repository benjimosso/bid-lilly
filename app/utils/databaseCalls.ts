import { createClient } from "@/utils/supabase/server";
import { Item, Bids } from "@/app/utils/interface";
import twilio from "twilio";

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
export async function emailSent({ itemId }: { itemId: number }) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("update_email_sent_status", {
    p_id: itemId,
  });
  if (error) {
    console.error("Error in emailSent function:", error);
  }
  console.log("Item ID", itemId, "Type:", typeof itemId);
  console.log("EmailSent Function Response:", data);
}

export async function sendMessages({ itemId }: { itemId: number }) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  const message = await client.messages.create({
    body: `You won the bid! follow the link to pay `, // Add link to payment page (twilio is blocking the link)
    from: "+18337745285",
    to: "+18056375758", // Add user phone number with dynamic data
  });
  
  console.log("SMS Sent")
  console.log(message.body);
}

export async function PaymentAmount({ id }: { id: string }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("items")
    .select("currentBid")
    .eq("id", id);
  if (error) {
    console.error("Error in PaymentAmount function:", error);
  }
  console.log("Item ID", id, "Type:", typeof id);
  
  return data
}