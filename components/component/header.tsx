"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import LogouButton from "./logoutButton";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";

export function Header({ user }: { user: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);


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
        <div className="flex  gap-5">
          <div>
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
          />
          </div>
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
