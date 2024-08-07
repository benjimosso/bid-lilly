/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/bHQJGKe4S2o
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

interface LoginFormProps {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    phone: string
  ) => Promise<void>;
}

export function SignupShad({ handleSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [optIn, setOptIn] = useState(false);
  console.log(optIn)
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={(e) =>
          handleSubmit(e, email, password, first_name, last_name, phone)
        }
      >
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  required
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  required
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="805-456-7890"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div className="flex gap-3">
                <Checkbox
                    id="opt-in"
                    checked={optIn}
                    onCheckedChange={(checked) => setOptIn(checked === true)}
                  />
                <Label htmlFor="opt-in" className="text-sm">I would like to receive SMS notifications</Label>
                </div>
                
                 
                
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" type="submit">
              Create an account
            </Button>
            {/* <Button className="w-full" variant="outline">
            Sign up with GitHub
          </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link className="underline ml-2" href="/auth/login">
              Sign in
            </Link>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
