import { sendEmail, sendSMS, emailSent } from "@/app/utils/databaseCalls"; // Adjust the path to your server utilities
import { NextRequest, NextResponse } from "next/server";
import { Winners } from "@/app/utils/interface";

export async function POST(req: NextRequest) {
  const { winners } = await req.json();

  try {
    await Promise.all(
      winners.map(async (winner: Winners) => {
        if (winner.items.emailSent) {
            console.log("Email already sent");
            return;
          }
        const email = await sendEmail(
          winner.first_name,
          winner.items.name,
          winner.email,
          winner.items.id,
          winner.items.image,
          winner.items.currentBid,
          winner.phone_number
        );
        const sms = await sendSMS({
          itemId: winner.items.id,
          phone_number: winner.phone_number,
        });

        if (email && sms) {
          console.log("Email and SMS sent");
          await emailSent({ itemId: winner.items.id });
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
