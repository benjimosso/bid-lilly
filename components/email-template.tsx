import * as React from "react";
import Image from "next/image";

interface EmailTemplateProps {
  name: string;
  itemName: string;
  itemId: number;
  itemImage: string;
  amount: number;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  itemId,
  itemName,
  itemImage,
  amount,
}) => (
  <div>
    <h1>Hi!, {name}!</h1>
    <p>
      You have won the bid for {itemName} with an amount of ${amount}. Please
      click the link below to pay for the item.
      <a href={`https://bid-lilly.vercel.app/stripe-checkout/${itemId}`}> Pay Now</a> 
      </p>
    
    <img src={itemImage} alt={itemName} width={300} height={300} />
  </div>
);
 