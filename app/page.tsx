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
  const supabase = createClient();
  supabase.auth.getUser().then((user) => {
    user.data.user ? console.log("User is logged in") : console.log("User is not logged in")
    console.log("HERE!",user);
  });

  return (
    <main className="container mx-auto m-10">
      {/* {userSession.data.user ? (<LogouButton/>) : (<Button> <Link href="/auth"> Login</Link> </Button>)} */}

      {/* <div className="flex justify-between">
        <LogouButton />
        <Link href="/auth">
          <Button> Login</Button>
        </Link>
      </div> */}
       <LogouButton />
    </main>
  );
}
