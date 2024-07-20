"use server";
import React from "react";
import { getWinners, sendEmailandSMS, UpdatePaymentStatus } from "./actions";
import { revalidatePath } from "next/cache";
import { Winners as WinnerInterface } from "../utils/interface";
import { getUser } from "../utils/databaseCalls";
import DisplayWinners from "./displaywinners";

export default async function Winners() {
  const winners = await getWinners();
  const user = await getUser();
  let loading = false;

  const handlePayment = async (WinnerId: number) => {
    "use server";
    await UpdatePaymentStatus({ WinnerId });
    revalidatePath("/winners");
  };

  const handleMessages = async (winners: WinnerInterface[]) => {
    "use server";
    const emailandtext = await sendEmailandSMS(winners);
    console.log("Email and Text Sent", emailandtext);
    if (emailandtext) {
      revalidatePath("/winners");
      return true;
    } else {
      return false;
    }
  };

  return (
    <DisplayWinners winners={winners} handleMessages={handleMessages} handlePayment={handlePayment} user={user}/>
    // <div>
    //   <h1 className="text-4xl font-bold">Winners</h1>
    //   {winners.length === 0 ? (
    //     <div>No winners yet</div>
    //   ) : (
    //     <div className="grid lg:grid-cols-4 gap-6">
    //       {winners.map((winner, index) => (
    //         <div
    //           key={index}
    //           className="border-2 rounded-md border-black p-5 space-y-3"
    //         >
    //           <Image
    //             src={winner.items.image}
    //             width={120}
    //             height={120}
    //             alt="item image"
    //           />
    //           <h2 className="text-red-600 text-xl">{winner.items.name}</h2>
    //           <p>Winning Price: ${winner.items.currentBid}</p>
    //           <p>
    //             Winner: {winner.first_name} {winner.last_name}
    //           </p>
    //           <p>Email: {winner.email}</p>
    //           <p>Phone: {winner.phone_number}</p>
    //           {winner.items.emailSent ? (
    //             <p className="text-green-500">Email Sent</p>
    //           ) : (
    //             <p className="text-red-400">Email Not Sent</p>
    //           )}
    //           {winner.items.sms_sent ? (
    //             <p className="text-green-500">SMS Sent</p>
    //           ) : (
    //             <p className="text-red-400">SMS Not Sent</p>
    //           )}
    //           {winner.pay_status ? (
    //             <p className="text-green-500">Payment Complete</p>
    //           ) : (
    //             <div className="flex flex-col gap-3">
    //               <p className="text-red-400">Payment Pending</p>
    //               {user?.user && (
    //                 <ValidatePayment
    //                   handlePayment={handlePayment}
    //                   WinnerId={winner.id}
    //                 />
    //               )}
    //             </div>
    //           )}
    //         </div>
    //       ))}
    //     </div>
    //   )}
      // <div className="pt-8">
      //   <SendMessages winners={winners} handleMessages={handleMessages} />
      // </div>
    // </div>
  );
}
