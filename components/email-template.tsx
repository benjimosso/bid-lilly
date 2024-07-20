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
  <div className="font-sans bg-gray-100 p-5 rounded-lg shadow-md max-w-lg mx-auto text-gray-800">
    <h1 className="text-2xl text-blue-600 mb-4">Hi, {name}!</h1>
    <p className="text-lg mb-4">
      Congratulations! You won the bid of <strong>${amount}</strong> for <strong>{itemName}</strong>. Please make your payment via Venmo or GoFundMe using the links below:
    </p>
    <p className="text-lg mb-4">
      Venmo: <a href="https://venmo.com/u/Lillian-Luu-4" className="text-blue-600 underline">https://venmo.com/u/Lillian-Luu-4</a><br />
      GoFundMe: <a href="https://www.gofundme.com/lilys-stage-four-cancer-update" className="text-blue-600 underline">https://www.gofundme.com/lilys-stage-four-cancer-update</a>
    </p>
    <p className="text-lg mb-4">
      Please screenshot your payment confirmation and show it to the silent auction staff to finalize your purchase.
    </p>
    <p className="text-lg mb-4">
      Thank you for your donation to Lilly&rsquo;s treatment fund! We are eternally grateful for your support. 🙏🙏🙏
    </p>
    <img src={itemImage} alt={itemName} width={300} height={300} className="rounded-lg mt-4" />
  </div>
);