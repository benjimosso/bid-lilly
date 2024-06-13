"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

//ShadCn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LogouButton from "@/components/component/logoutButton";
import Link from "next/link";



export default function HomePage() {
  const [bid, setBid] = useState<number>(0);
  const [userSession, setUserSession] = useState<any>(null);
  const supabase = createClient();
  console.log(userSession)
  // check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const user = supabase.auth.getUser();
      setUserSession(user);
    };
    checkUser();
  }, [supabase.auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // check if user is logged in
    // since I don't have a user set yet, it does not allow me to insert. I will need to add a user to the insert
    const { data, error } = await supabase
      .from("bids")
      .insert([{ bidnumber: bid }]);
    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  };

  return (
    <main className="container mx-auto m-10">

      {userSession ? (<LogouButton/>) : (<Button> <Link href="/auth"> Login</Link> </Button>)}

      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="number"
          name="bid"
          placeholder="bid"
          value={bid}
          onChange={(e) => setBid(Number(e.target.value))}
        />
        <Button className="mt-6" type="submit">
          Submit{" "}
        </Button>
      </form>
    </main>
  );
}
