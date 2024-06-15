/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/mhH5srKVuz7
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
'use client'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { login } from "@/app/auth/login/actions"

interface LoginFormProps {
  LoginEmail: (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => Promise<void>;
  LoginGoogle: () => Promise<void>;
}

export function LoginShadcn({LoginEmail, LoginGoogle}: LoginFormProps) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Card className="mx-auto max-w-sm mt-10">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => LoginEmail(e, email, password)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@example.com" required type="email" 
            onChange={(e) => setEmail(e.target.value)}
            value={email}/>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link className="ml-auto inline-block text-sm underline" href="#">
                Forgot your password&lsquo;?
              </Link>
            </div>
            <Input id="password" required type="password" 
            onChange={(e) => setPassword(e.target.value)}
            value={password}/>
          </div>
          <Button className="w-full" type="submit" >
            Login
          </Button>
          <Button
          
           className="w-full" variant="outline" onClick={LoginGoogle}>
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&rsquo;t have an account?
          <Link className="underline" href="/auth/signup">
            Sign up
          </Link>
        </div>
        </form>
      </CardContent>
    </Card>
  )
}