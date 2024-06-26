import Image from "next/image";
import { Button } from "../ui/button";
import LogouButton from "./logoutButton";
import Link from "next/link";

export function Header({ user }: { user: any }) {

  console.log(user, "from header")

  return (
    <header className="bg-gray-200 text-black p-4 mb-6 rounded-md">
      <div className=" flex justify-between items-center">
        <div className="flex gap-6">
        <Link href="/" className="hover:underline flex items-center gap-4">
          <Image src="/next.svg" alt="logo" width={100} height={100} />
          Bid For Lilly
        </Link>
        <Link className="hover:underline" href={"/auctions"}>
        <h3>My Auctions</h3>
        </Link>
        </div>
        <div>
          {user ? (
            <div className="flex gap-3 items-center">
             {user.user_metadata.full_name}
            <LogouButton />
            </div>
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
