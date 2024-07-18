import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
   const headersList = headers();
   console.log("Headers List:", headersList.get("origin"));
    try {
        // check stripePayment id from the request body
        const stripePaymentId  = await req.json();
        console.log("Stripe Payment Id from Route:", stripePaymentId);
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          ui_mode: 'embedded',
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of
              // the product you want to sell
              price: stripePaymentId,
              quantity: 1,
            },
          ],
          mode: 'payment',
          return_url:
            `${headersList.get("origin")}/return?session_id={CHECKOUT_SESSION_ID}`,
          automatic_tax: {enabled: true},
        });
        console.log("Session ID:", session);
      return NextResponse.json({clientSecret: session.client_secret});
       
      } catch (err) {
        return new NextResponse("Error in Checkout Session function:", {
            status: 500,
          });
      }
}

export async function GET(req: NextRequest) {

  const url = req.nextUrl;
  console.log("URL:", url); 
  const sessionParam = url.searchParams.get('session_id');

    console.log('SESSION ID FROM QUERY',sessionParam);
    try {
        const session =
          await stripe.checkout.sessions.retrieve(sessionParam);
          console.log("Session Status:", session.status);
          console.log("Customer Email:", session.customer_details.email);
          console.log("Session : ", session); 
          return NextResponse.json({
            status: session.status,
            customer_email: session.customer_details.email,
          });
    }
    catch (err) {
        return new NextResponse("Error in Checkout Session function:", {
            status: 500,
          });
    }
}