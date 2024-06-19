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

interface Item {
  id: number;
  name: string;
  created_at: string;
  user_id: string; // UUIDs are typically represented as strings
  image: string;
  startingPrice: number;
  description: string;
}

export default async function HomePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if(error) {
    console.log(error)
    // redirect('/auth/login')
  }
  const { data:items, error: itemsError }= await supabase.from('items').select('*')
  if(itemsError) {
    console.log(itemsError)
  } 

  return (
    <div className="container mx-auto">
     
      
      <h2 className="text-2xl font-bold mb-4"> Items to Bid on</h2>
      <div className="lg:grid lg:grid-cols-4 lg:gap-5 sm:space-y-0 space-y-8 ">
      {items && items.map((item:Item, index) => (
        <Card key={index} className="flex flex-col items-center">
          <CardHeader className="mt-4">
            {item.image ? <Image className="rounded-md" src={item.image} alt={item.name} width={200} height={200} /> : null} 
          </CardHeader>
          <CardContent>
            <CardTitle>{item.name}</CardTitle>
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
