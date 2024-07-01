import { createClient } from "@/utils/supabase/server";
import { LoginShadcn } from "@/components/component/login-shadcn";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function LoginPage() {

  let loginError = null;

  const LoginEmail = async function (
    email: string,
    password: string,
  ) {
    'use server'
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Error logging in:", error.message);
      loginError = error.message;
    } else {
      revalidatePath("/");
      redirect("/");
    }
  };

  const LoginGoogle = async function () {
    'use server'
    const supabase = createClient();
    const {data, error} = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });
    if (data.url) {
      redirect(data.url);
    }
  };

  return (
    <>
      <LoginShadcn
        LoginEmail={LoginEmail}
        LoginGoogle={LoginGoogle}
      ></LoginShadcn>
     {loginError && <div>{loginError}</div>}
    </>
  );
}
