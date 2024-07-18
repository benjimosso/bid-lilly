'use client'
import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function Return() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`/api/checkout_session?session_id=${sessionId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === 'open') {
    return (
      redirect('/')
    )
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <div className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-gray-800 to-gray-300">
       <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">You helped us a lot to raise money for Lilly.</h2>
        <h1 className="text-2xl">We will send you an email to {customerEmail} with your payment details.</h1>
        
      </div>
    </div>
      </section>
    )
  }

  return null;
}