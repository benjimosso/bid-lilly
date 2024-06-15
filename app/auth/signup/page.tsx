"use client";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// shadcn components
import { SignupShad } from "@/components/component/signup-shad";

export default function Singup() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
    first_name: string,
    last_name: string
  ) => {
    e.preventDefault();
    // console.log("Email: ", email, "Password: ", password);
    const supabase = createClient();
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // emailRedirectTo: `${location.origin}/api/auth/callback`,
        data: {
          first_name,
          last_name,
        },
      },
    });

    if (error) {
      setError(error.message);
      return;
    }

    if (!error) {
      router.push("/auth/verify");
    }
  };

  return (
    <div className="flex-1 flex items-center flex-col mt-16">
      {/* <h1 className="text-2xl pb-4 font-bold">Signup</h1> */}
      {/* <AuthForm handleSubmit={handleSubmit} /> */}
      <SignupShad handleSubmit={handleSubmit} />
      {error && <p>{error}</p>}
    </div>
  );
}
