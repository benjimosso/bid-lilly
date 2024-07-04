// pages/index.tsx or wherever HomePage is located
import {
  getItems,
  getBids,
  getUser,
  emailSent,
} from "@/app/utils/databaseCalls";
import Image from "next/image";
import Link from "next/link";
import { Item as itemInterface, Bids } from "@/app/utils/interface";
// shadCn
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Item } from "@/app/utils/interface";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

export default async function HomePage() {
  const items = await getItems();
  const bids = await getBids();
  const user = await getUser();

  async function sendEmail(
    name: string,
    itemName: string,
    email: string,
    itemId: number,
    itemImage: string,
    amount: number
  ) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'Bid For Lilly <team@bid-lilly.online>',
      to: [email],
      subject: 'You Won The Bid!',
      react: EmailTemplate({ name, itemName, itemId, itemImage, amount})as React.ReactElement,
    });
    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    console.log(data);
    emailSent({ itemId: itemId}); 
  }

  let finalItems: {
    name: string;
    amount: number;
    item: itemInterface;
    email: string;
  }[] = [];

  await Promise.all(
    items.map(async (item: Item) => {
      if (item.endDate < new Date().toISOString()) {
        console.log(item.name, "Item is over");
        await Promise.all(
          bids?.map(async (bid: Bids) => {
            if (
              item.id === bid.item_id &&
              item.currentBid === bid.amount &&
              !item.emailSent
            ) {
              finalItems.push({
                name: bid.full_name,
                amount: bid.amount,
                item: item,
                email: bid.email,
              });
              await sendEmail(bid.full_name, item.name, bid.email, item.id, item.image, bid.amount);
            } 
          })
        );
      }
    })
  );
  console.log(finalItems);
  if (!user.user?.phone){
    console.log("Please add your phone number to your account to receive notifications");
  }
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4"> Items to Bid on</h2>
      <div className="lg:grid lg:grid-cols-4 lg:gap-5 sm:space-y-0 space-y-8 ">
        {items &&
          items.map((item: Item, index) => (
            <Card
              key={index}
              className="flex flex-col items-center overflow-hidden whitespace-nowrap"
            >
              <CardHeader className="mt-4">
                {item.image ? (
                  <Image
                    className="rounded-md max-h-[258px]"
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                  />
                ) : null}
              </CardHeader>
              <CardContent>
                {item.name === "Summerland Horseback Rides" ? (
                  <CardTitle className="text-xl">{item.name}</CardTitle>
                ) : (
                  <CardTitle>{item.name}</CardTitle>
                )}

                <CardDescription>
                  Starting Price ${item.startingPrice}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button>
                  <Link href={`/items/${item.id}`}>Bid on Item</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
