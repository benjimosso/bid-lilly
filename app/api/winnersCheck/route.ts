import { NextResponse } from "next/server";
import { Resend } from "resend";
import { emailSent, getBids, getItems, sendMessages } from "../../utils/databaseCalls";
import { EmailTemplate } from "../../../components/email-template";
import { Item, Bids } from "../../utils/interface";

async function sendEmail(
  name: string,
  itemName: string,
  email: string,
  itemId: number,
  itemImage: string,
  amount: number
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
      await sendMessages();
      return true;
    }
  } catch (error) {
    console.error("Error in sendEmail function:", error);
    return false;
  }
}

export async function GET() {

  try {
    const items = await getItems();
    const bids = await getBids();

    const sendEmailPromises = items.map((item: Item) => {
      if (item.endDate < new Date().toISOString()) {
        return bids?.map((bid: Bids) => {
          if (
            item.id === bid.item_id &&
            item.currentBid === bid.amount &&
            !item.emailSent
          ) {
            return sendEmail(
              bid.full_name,
              item.name,
              bid.email,
              item.id,
              item.image,
              item.currentBid
            );
          }
        });
      }
    });

    await Promise.all(sendEmailPromises);

    console.log("checkWinners function executed successfully");
    return NextResponse.json({
      message: "checkWinners function executed successfully",
    });
  } catch (error) {
    console.error("Error executing checkWinners function:", error);
    return NextResponse.json({
      error: "Error executing checkWinners function",
    });
  }
}
