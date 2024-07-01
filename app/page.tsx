// pages/index.tsx or wherever HomePage is located
import { createClient } from "@/utils/supabase/server";
import Image from 'next/image'
import Link from "next/link";

// shadCn
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Item} from "@/app/utils/interface"


export default async function HomePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if(error) {
    console.log(error)
    // redirect('/auth/login')
  }
  const { data:items, error: itemsError }= await supabase.from('items').select('*').order('id', {ascending: true})
  if(itemsError) {
    console.log(itemsError)
  } 

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4"> Items to Bid on</h2>
      <div className="lg:grid lg:grid-cols-4 lg:gap-5 sm:space-y-0 space-y-8 ">
      {items && items.map((item:Item, index) => (
        <Card key={index} className="flex flex-col items-center overflow-hidden whitespace-nowrap">
          <CardHeader className="mt-4">
            {item.image ? <Image className="rounded-md max-h-[258px]" src={item.image} alt={item.name} width={200} height={200} /> : null} 
          </CardHeader>
          <CardContent>
            {item.name === "Summerland Horseback Rides" ? (<CardTitle className="text-xl">{item.name}</CardTitle>) : <CardTitle>{item.name}</CardTitle>}
            
            <CardDescription>Starting Price ${item.startingPrice}</CardDescription>
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
