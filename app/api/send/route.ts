import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';
import * as React from 'react';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST({name, itemName, email, itemId, itemImage, amount}: {name: string, itemName: string, email: string, itemId: number, itemImage: string, amount: number}) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Bid For Lilly <onboarding@resend.dev>',
      to: [email],
      subject: 'You Won The Bid!',
      react: EmailTemplate({ name, itemName, itemId, itemImage, amount})as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}