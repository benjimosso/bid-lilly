import { sendEmail, sendSMS, emailSent } from "@/app/utils/databaseCalls"; // Adjust the path to your server utilities
import { NextRequest, NextResponse } from "next/server";
import { Winners } from "@/app/utils/interface";

export async function POST(req: NextRequest) {
  const { winners } = await req.json();

  try {
    await Promise.all(
      winners.map(async (winner: Winners) => {
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
    return NextResponse.json({
      status: 200,
      message: "Messages sent successfully",
    });
  } catch (error) {
    console.error("Error checking Winners:", error);
    return NextResponse.json({
      status: 500,
      error: "Error executing checkWinners function",
    });
  }
}
