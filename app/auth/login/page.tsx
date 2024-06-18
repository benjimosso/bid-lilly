"use client";
import { createClient } from "@/utils/supabase/client";
import { LoginShadcn } from "@/components/component/login-shadcn";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const LoginEmail = async function (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) {
    const supabase = createClient();
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      router.refresh();
      router.push("/");
    }

  };

  const LoginGoogle = async function () {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `http://localhost:3000/auth/callback`,
        },
      })
};

  return (
  <>
  <LoginShadcn LoginEmail={LoginEmail} LoginGoogle={LoginGoogle}></LoginShadcn>;
  {error && <p>{error}</p>}
  </>
  );
}
