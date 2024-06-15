// pages/index.tsx or wherever HomePage is located
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import LogouButton from "@/components/component/logoutButton";
import Link from "next/link";
import AddItemForm from "@/components/component/AddItemForm";
import { redirect } from "next/navigation";
import { Header } from "@/components/component/header";

// async function checkUserSession() {
//   const supabase = createClient();
  
//   const { data, error } = await supabase.auth.getUser()
//   if (error || !data?.user) {
//     redirect('/auth/login')
//   } else {
//     console.log(data.user)
//   }
// }

export default async function HomePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if(error) {
    console.log(error)
    // redirect('/auth/login')
  }


  return (
    <main className="container mx-auto">
      <Header user={data.user}/>
      
      <AddItemForm />
    </main>
  );
}
