'use client'
import React, { useEffect } from 'react'
import { Winners } from '../utils/interface'
import Image from 'next/image'
import ValidatePayment from './validatePayment'
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'


export default function DisplayWinners({ winners, handleMessages, handlePayment, user }: { winners: Winners[], handleMessages: any, handlePayment: any, user: any }) {

    const [loading, setLoading] = React.useState(false);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const channel = supabase.channel('realtime-winners').on('postgres_changes',{
            event: '*',
            schema: 'public',
            table: 'winners'
        }, () => {
            router.refresh();
        }).subscribe()

        return () => {
           supabase.removeChannel(channel)
        }
    }, [supabase, router]);


  return (
      <div>
      <h1 className="text-4xl font-bold">Winners</h1>
      {winners.length === 0 ? (
        <div>No winners yet</div>
      ) : (
        <div className="grid lg:grid-cols-4 gap-6">
          {winners.map((winner, index) => (
            <div
              key={index}
              className="border-2 rounded-md border-black p-5 space-y-3"
            >
              <Image
                src={winner.items.image}
                width={120}
                height={120}
                alt="item image"
              />
              <h2 className="text-red-600 text-xl">{winner.items.name}</h2>
              <p>Winning Price: ${winner.items.currentBid}</p>
              <p>
                Winner: {winner.first_name} {winner.last_name}
              </p>
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
              {winner.pay_status ? (
                <p className="text-green-500">Payment Complete</p>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="text-red-400">Payment Pending</p>
                  {user?.user && (
                    <ValidatePayment
                      handlePayment={handlePayment}
                      WinnerId={winner.id}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className='pt-6'>
      <Button onClick={() => handleMessages(winners)} disabled={loading}>
      {loading ? "Sending..." : "Send Messages"}{" "}
    </Button>
    </div>
    </div>
  )
}
