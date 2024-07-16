import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/component/header";
// supabase
import { createClient } from "@/utils/supabase/server";
import { AppKnockProviders } from "./knock-providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Auction For Lilly",
  description: "Auction website to raise money for Lilly's medical bills",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <main>
          <AppKnockProviders user={user.user}>
            <Header user={user.user} />
            <div className="container mx-auto py-12">{children}</div>
          </AppKnockProviders>
        </main>
      </body>
    </html>
  );
}
