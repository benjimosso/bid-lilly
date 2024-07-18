import twilio from "twilio";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
import { sendSMS } from "../utils/databaseCalls";

  // send emails

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
        // await emailSent({ itemId });
        await sendSMS({ itemId, phone_number });
        return true;
      }
      
    } catch (error) {
      console.error("Error in sendEmail function:", error);
      return false;
    }
  }