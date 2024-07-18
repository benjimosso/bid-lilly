import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
   const headersList = headers();
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
              price: {stripePaymentId},
              quantity: 1,
            },
          ],
          mode: 'payment',
          return_url:
            `${headersList.get("origin")}/return?session_id={CHECKOUT_SESSION_ID}`,
          automatic_tax: {enabled: true},
        });

       return NextResponse.json({clientSecret: session.client_secret});
       
      } catch (err) {
        return new NextResponse("Error in Checkout Session function:", {
            status: 500,
            
            
          });
      }
}

export async function GET(req: NextRequest & { query: { session_id: string } }) {
    try {
        const session =
          await stripe.checkout.sessions.retrieve(req.query.session_id);
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