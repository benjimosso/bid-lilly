import { NextRequest } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { productId, newPrice } = await request.json();
    console.log("Product ID from Route:", productId);
    const price = await stripe.prices.create({
      product: productId,
      unit_amount: newPrice,
      currency: "usd",
      nickname: "higher bid",
    });
    console.log("Price updated:", price);
    return new Response(JSON.stringify(price), { status: 200 });
    
  } catch (error) {
    console.error("Error in createPaymentIntent function:", error);
    return new Response("Error in createPaymentIntent function:", {
      status: 500,
    });
  }
}
