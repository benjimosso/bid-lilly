"use server";
import { createClient } from "@/utils/supabase/server";
import { Winners as WinnersInterface } from "../utils/interface";
import { sendEmail, sendSMS } from "../utils/databaseCalls";

export async function UpdatePaymentStatus({ WinnerId }: { WinnerId: number }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("winners")
    .update({ pay_status: true })
    .eq("id", WinnerId)
    .single();
  if (error) {
    console.error("Error in UpdatePaymentStatus function:", error);
  }
  if (data) {
    console.log("Payment Updated");
    console.log("Winner ID:", WinnerId);
    console.log("UpdatePaymentStatus Function Response:", data);
  }
}

export async function getWinners() {
  const supabase = createClient();
  const { data: winners, error: winnersError } = await supabase
    .from("winners")
    .select("*, items(*)")
    .order("created_at", { ascending: true });
  if (winnersError) {
    console.log(winnersError);
  }
  return (winners as WinnersInterface[]) || [];
}

export async function sendEmailandSMS(winners: WinnersInterface[]) {
    try {
        await Promise.all(
          winners.map(async (winner: WinnersInterface) => {
            // if there is no phone numner or email
            if (!winner.email && !winner.phone_number) {
              console.log(`No email or phone number for ${winner.first_name}`);
              return;
            }
            // if no email but phone number exists
            if (!winner.email && winner.phone_number && !winner.items.sms_sent) {
              console.log(`No email for ${winner.first_name}`);
              console.log(`Sending SMS to ${winner.first_name}`);
              await sendSMS({
                itemId: winner.items.id,
                phone_number: winner.phone_number,
                itemName: winner.items.name,
                amount: winner.items.currentBid,
                first_name: winner.first_name,
                SSM_image: winner.items.MMS_image,
              });
              return;
            }
            // if no phone number but email exists
            if (!winner.phone_number && winner.email && !winner.items.emailSent) {
              console.log(`No phone number for ${winner.first_name}`);
              console.log(`Sending email to ${winner.first_name}`);
              await sendEmail(
                winner.first_name,
                winner.items.name,
                winner.email,
                winner.items.id,
                winner.items.image,
                winner.items.currentBid,
                winner.phone_number
              );
              return;
            }

            // If both email and SMS have been sent
            if (winner.items.emailSent && winner.items.sms_sent) {
              console.log(`Messages already sent for ${winner.first_name}`);
              return;
            }
      
            // If neither email nor SMS have been sent
            if (!winner.items.emailSent && !winner.items.sms_sent) {
              console.log(`Sending email and SMS to ${winner.first_name}`);
              await sendEmail(
                winner.first_name,
                winner.items.name,
                winner.email,
                winner.items.id,
                winner.items.image,
                winner.items.currentBid,
                winner.phone_number
              );
              await sendSMS({
                itemId: winner.items.id,
                phone_number: winner.phone_number,
                itemName: winner.items.name,
                amount: winner.items.currentBid,
                first_name: winner.first_name,
                SSM_image: winner.items.MMS_image,
              });
              return;
            }
      
            // If email has been sent but SMS has not been sent
            if (winner.items.emailSent && !winner.items.sms_sent) {
              console.log(`Email already sent to ${winner.first_name}, sending SMS`);
              await sendSMS({
                itemId: winner.items.id,
                phone_number: winner.phone_number,
                itemName: winner.items.name,
                amount: winner.items.currentBid,
                first_name: winner.first_name,
                SSM_image: winner.items.MMS_image,
              });
              return;
            }
      
            // If SMS has been sent but email has not been sent
            if (!winner.items.emailSent && winner.items.sms_sent) {
              console.log(`SMS already sent to ${winner.first_name}, sending email`);
              await sendEmail(
                winner.first_name,
                winner.items.name,
                winner.email,
                winner.items.id,
                winner.items.image,
                winner.items.currentBid,
                winner.phone_number
              );
              return;
            }
          })
        );
       
      }
 catch (error) {
    console.error(error);
  }
}