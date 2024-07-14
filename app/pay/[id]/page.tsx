import { createClient } from "@/utils/supabase/server";
import { PaymentAmount } from "@/app/utils/databaseCalls";

export default async function PaymentPage({
  params: { id },
}: {
  params: { id: string };
}) {

  console.log("Item ID", id, "Type:", typeof id)

   const amount = await PaymentAmount({ id });
   console.log("Amount", amount, typeof amount); 
   
  return <div>
    <h1>Payment Page</h1>
    {amount && amount[0]?.currentBid
      ? <p>Payment Amount: {amount[0]?.currentBid}</p>
      : <p>Nothing to pay here.</p>
    }
    
  </div>;
}
