"use server"
import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Winners as WinnersInterface } from "../utils/interface";
import SendMessages from "./sendmessages";
import {emailSent, sendEmail, sendSMS} from "@/app/utils/databaseCalls";

async function getWinners() {
  const supabase = createClient();
  const { data: winners, error: winnersError } = await supabase
    .from("winners")
    .select("*, items(*)")
    .order("created_at", { ascending: true });
  if (winnersError) {
    console.log(winnersError);
  }
  return (winners as WinnersInterface[]) || [];
}

export default async function Winners() {
  const winners = await getWinners();
  

  return (
    <div>
        <h1 className="text-4xl font-bold">Winners</h1>
        {winners.length === 0 ? (
            <div>No winners yet</div>
        ) : (
            <div className="grid grid-cols-4 gap-6">
            {winners.map((winner, index) => (
                <div key={index} className="border-2 border-black p-5">
                <h2 className="text-red-600">{winner.items.name}</h2>
                <p>Winning Price: ${winner.items.currentBid}</p>
                <p>Winner: {winner.first_name} {winner.last_name}</p>
                <p>Email: {winner.email}</p>
                <p>Phone: {winner.phone_number}</p>
                {winner.items.emailSent ? (
                    <p className="text-green-500">Email Sent</p>
                ) : (
                    <p className="text-red-400">Email Not Sent</p>
                )}
                {winner.items.sms_sent ? (
                    <p className="text-green-500">SMS Sent</p>
                ) : (
                    <p className="text-red-400">SMS Not Sent</p>
                )}
                </div>
            ))}
            </div>
        )}
        <div className="pt-8">
        <SendMessages winners={winners}/>
        </div>
    </div>
  );
}
