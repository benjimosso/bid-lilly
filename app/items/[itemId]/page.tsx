"use server";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {getBids, getItems, getUser } from "./actions";
import PlaceBid from "./placebid";
import { Knock } from "@knocklabs/node";
import { formatDate } from "@/app/utils/timeformat";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

function BidOver(endDate: string) {
  return endDate < new Date().toISOString();
}

export default async function ItemPage({
  params: { itemId },
}: {
  params: { itemId: string };
}) {
  const items = await getItems({ itemId });
  const bids = await getBids({ itemId });
  const user = await getUser();

  const handleSubmit = async (bid:number) => {
    'use server'

    if (bid <= items.startingPrice) {
      alert("Bid must be higher than the current bid");
      return;
    }
    const supabase = createClient();
    const { data, error } = await supabase
      .from("bids")
      .insert([
        {
          item_id: items.id,
          amount: bid,
          user_id: user?.user?.id,
          full_name: user?.user?.user_metadata?.full_name,
          email: user?.user?.email,
        },
      ]);
    if (error) {
      console.error(error);
      return;
    }
    const { data: dataUpdate, error: updateError } = await supabase
      .from("items")
      .update({ currentBid: bid })
      .eq("id", items.id)
      .select();
    if (updateError) {
      console.error(updateError);
    }
    console.log("dataUpdate", dataUpdate);

    const knock = new Knock(process.env.KNOCK_SECRET_KEY || "");
  
  const recipients: {
    id: string;
    name: string;
    email: string;
  }[] = [];

  if (bids) {
    for (const bid of bids) {
      console.log("here!!!", bid.user_id, user?.user?.id);
      if (
        bid.user_id !== user?.user?.id &&
        !recipients.find((recipient) => recipient.id === bid.user_id)
      ) {
        recipients.push({
          id: bid.user_id,
          name: bid.full_name ?? "Unknown",
          email: bid.email ?? "Unknown",
        });
      }
    }
  }

  if (recipients.length > 0) {
    await knock.workflows.trigger("user-place-bid", {
      actor: {
        id: user?.user?.id ?? "Unknown",
        name: user?.user?.user_metadata?.full_name ?? "Unknown",
        email: user?.user?.email ?? "Unknown",
        collection: "users",
      },
      recipients,
      data: {
        item_id: items?.id,
        item_name: items?.name,
        bid_amount: bid,
      },
    });
  }
  console.log("RECIPIENTS ARRAY", recipients);
  revalidatePath(`/items/${items.id}`);
  }

  
  if (!items) {
    return (
      <div className="space-y-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Item Not Found</h1>

        <Image
          src="/undraw_taken_re_yn20.svg"
          alt="empty state"
          width={200}
          height={200}
        />

        <p>
          Sorry, we couldn&apos;t find the item you&apos;re looking for. Please
          seatch for a different auction item.
        </p>
        <Button asChild>
          <Link href="/">View Auctions</Link>
        </Button>
      </div>
    );
  }
  return (
    <main className=" space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">{items.name}</h1>
        <div className="lg:grid lg:grid-cols-2 lg:gap-5 ">
          <div>
            <Image
              src={items.image}
              alt={items.name}
              width={500}
              height={500}
              className="rounded-md"
            />
            <div>
              <div className="mt-7 text-xl">
                Starting Price:
                <span className="bold ml-2">${items.startingPrice}</span>
              </div>
              {items.currentBid ? (
                <div className="mt-7 text-xl">
                  Current Bid:
                  <span className="bold ml-2">${items.currentBid}</span>
                </div>
              ) : (
                <p className="mt-7 text-xl">No Bids yet</p>
              )}
              {BidOver(items.endDate) ? (
                <p>Auction is over!</p>
              ) : (
                <p className="text-lg">
                  This Auction Ends On: {format(items.endDate, "eeee M/dd/yy")}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6 mt-6 lg:mt-0">
            <p>{items.description}</p>
            {/* <div>Starting Price: <span className="bold">${items.startingPrice}</span></div> */}
            {user.user && !BidOver(items.endDate) ? ( <PlaceBid
              handleSubmit={handleSubmit}
              currentBid={items.currentBid}
              startingPrice={items.startingPrice}
            />) : null}
           
           
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-bold">Current Bids: </h1>
        <div>
          {bids?.map((bid: any, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-md mt-5"
            >
              <div>
                <p className="text-xl">
                  Bid Amount: <span className="bold">${bid.amount}</span>
                </p>
                <p>Bidder: {bid.full_name}</p>
              </div>
              <div>
                <p>{formatDate(bid.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
