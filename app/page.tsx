import { createClient } from "@/utils/supabase/client";


//ShadCn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LogouButton from "@/components/component/logoutButton";
import Link from "next/link";

// async function checkUserSession() {
//   const supabase = createClient();
//   const user = supabase.auth.getUser();
//   return user;

// }

export default async function HomePage() {
  // console.log(userSession);
  // check if user is logged in
 
  // const userSession = await checkUserSession(); 
  // console.log(userSession);
 

  return (
    <main className="container mx-auto m-10">
      {/* {userSession.data.user ? (<LogouButton/>) : (<Button> <Link href="/auth"> Login</Link> </Button>)} */}

      {/* <div className="flex justify-between">
        <LogouButton />
        <Link href="/auth">
          <Button> Login</Button>
        </Link>
      </div> */}
      
    </main>
  );
}
