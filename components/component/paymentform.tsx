"use client";
import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import convertToSubcurrency from "@/app/utils/convertToSubcurrency";

export default function PaymentForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [succeeded, setSucceeded] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string | null>("");

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => {
        console.log("Response.json from stripe: ",res);
        return res.json();
      })
      .then((data) => {
        console.log("Data from Stripe: ",data);
        setClientSecret(data.clientSecret);
      });
  }, [amount]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        if (!stripe || !elements) {
            return;
        }
    
       const { error: submitError} = await elements.submit();
        if (submitError) {
            setError(submitError?.message || null);
            setLoading(false);
            return;
        }

        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret: clientSecret as string,
            confirmParams: {
                return_url: `${window.location.origin}/payment-success?amount=${amount}`,
            },
        });

        if (error) {
            setError(error.message || null);
            // Payment failed -- do something here setLoading(false);
            return;
    
        } else {
            // Payment has been processed!
        }
        setLoading(false);
    }

    if (!clientSecret || !stripe || !elements) {
        return (
          <div className="flex items-center justify-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        );
      }
  return (
    <form onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}

      {error && <div>{error}</div>}
      <Button 
      disabled={!stripe || loading}
      className="mt-8">
        {loading ? "Processing..." : `Pay $${amount}`}
      </Button>
    </form>
  );
}
