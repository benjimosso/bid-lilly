"use client";
import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "@/components/component/paymentform";
import convertToSubcurrency from "@/app/utils/convertToSubcurrency";

export default function PaymentClientPage({ amount }: { amount: number }) {
    const [stripePromise, setStripePromise] = useState(() => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!));

  return (
    <div className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-gray-800 to-gray-300">
         <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">You won the auction!</h1>
        <h2 className="text-2xl">
          Amount to pay:
          <span className="font-bold"> ${amount}</span>
        </h2>
      </div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <PaymentForm amount={amount} />
      </Elements>
    </div>
  );
}
