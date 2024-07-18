import React from 'react'
import { getSingleItem } from '@/app/utils/databaseCalls';
import CheckoutEmbeded from './checkOutStripe';

export default async function IndexStripePayment({
    params: { id },
  }: {
    params: { id: string };
  }) {
    
    const item = await getSingleItem({itemId: id});
    console.log("Item:", item.name);
  return (
    <div>
        <CheckoutEmbeded item={item.stripe_Price_id} />
    </div>
  )
}

