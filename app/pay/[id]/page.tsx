import { PaymentAmount } from "@/app/utils/databaseCalls";
import PaymentClientPage from "./paymentClientPage";

export default async function PaymentPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const amount = await PaymentAmount({ id });

  return (
    <div>
      <h1>Payment Page</h1>
      {amount && amount[0]?.currentBid ? (
        <PaymentClientPage amount={amount[0]?.currentBid} />
      ) : (
        <p>Nothing to pay here.</p>
      )}
    </div>
  );
}
