import { createClient } from "@/utils/supabase/server";
import { Item, Bids } from "@/app/utils/interface";
import twilio from "twilio";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

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

export async function smsSent({ itemId }: { itemId: number }) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("sms_sent_status", {
    p_id: itemId,
  });
  if (error) {
    console.error("Error in smsSent function:", error);
  }
  console.log("SMS_Sent Function Response:", data);
}

export async function sendSMS({
  itemId,
  phone_number,
  itemName,
  amount,
  first_name,
  SSM_image,
}: {
  itemId: number;
  phone_number: string;
  itemName: string;
  amount: number;
  first_name: string;
  SSM_image: string;
}) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  const message = await client.messages.create({
    body: `Congratulations! You won the bid of $${amount} for ${itemName}. 

Pay via Venmo: https://venmo.com/u/Lillian-Luu-4
or GoFundMe: https://www.gofundme.com/lilys-stage-four-cancer-update

Please screenshot your payment confirmation and show to silent auction staff to finalize your purchase.

Thank you for your donation to Lilly's treatment fund! We are eternally grateful for your support. 🙏🙏🙏
`,


    from: "+18337745285",
    mediaUrl:[SSM_image],
    to: phone_number, // Add user phone number with dynamic data
  });
  if (message.errorCode) {
    console.error("Error in sendSMS function:", message.errorCode);
  }
  if (message) {
    console.log("SMS Sent", message);
    await smsSent({ itemId });
  }
  return message;
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

  return data;
}

export async function getSingleItem({ itemId }: { itemId: string }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("id", itemId)
    .single();
  if (error) {
    console.error(error);
  }
  return data as Item;
}

export async function sendEmail(
  name: string,
  itemName: string,
  email: string,
  itemId: number,
  itemImage: string,
  amount: number,
  phone_number: string
) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: "Bid For Lilly <team@bid-lilly.online>",
      to: [email],
      subject: "You Won The Bid!",
      react: EmailTemplate({
        name,
        itemName,
        itemId,
        itemImage,
        amount,
      }) as React.ReactElement,
    });
    if (error) {
      console.error("Error sending email:", error);
      return false;
    }

    if (data) {
      console.log("Email Sent", data);
      await emailSent({ itemId });
      return true;
    }
  } catch (error) {
    console.error("Error in sendEmail function:", error);
    return false;
  }
}
