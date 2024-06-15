import Image from "next/image";
import { Button } from "../ui/button";
import LogouButton from "./logoutButton";
import Link from "next/link";

export function Header({ user }: { user: any }) {
  return (
    <header className="bg-gray-200 text-black p-4">
      <div className="container flex justify-between items-center">
        <Link href="/" className="hover:underline flex items-center gap-4">
          <Image src="/next.svg" alt="logo" width={100} height={100} />
          Bid For Lilly
        </Link>

        <div>
          {user ? (
            <LogouButton />
          ) : (
            <Button>
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
