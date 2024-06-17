// pages/index.tsx or wherever HomePage is located
import { createClient } from "@/utils/supabase/server";
import Image from 'next/image'
import LogouButton from "@/components/component/logoutButton";
import Link from "next/link";
import AddItemForm from "@/components/component/AddItemForm";
import { redirect } from "next/navigation";
import { Header } from "@/components/component/header";
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
    <main className="container mx-auto">
      <Header user={data.user}/>
      
      <h2 className="text-2xl font-bold mb-4"> Items to Bid on</h2>
      <div className="grid grid-cols-4 gap-5">
      {items && items.map((item, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>
              {item.created_at}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            {item.image ? <Image src={item.image} alt={item.name} width={100} height={100} /> : null}
            
          </CardContent>
          <CardFooter>
            <Button>
              <Link href={`/items/${item.id}`}>View Item</Link>
            </Button>
          </CardFooter>
        </Card>
        ))}
      </div>
      
    </main>
  );
}
