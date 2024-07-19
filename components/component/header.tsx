"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import LogouButton from "./logoutButton";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  NotificationCell,
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
            <Image src="/next.svg" alt="logo" width={40} height={40} />
          </Link>
          <Link className="hover:underline" href={"/winners"}>
            <h3>Winners</h3>
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
              renderItem={({item, ...props }) => (
                <NotificationCell {...props} item={item} key={item.id}>
                  <div className="rounded-lg">
                    Item{" "}
                    <Link href={`/items/${item?.data?.item_id}`}>
                      <span className="text-blue-400 font-bold">{item?.data?.item_name}</span>
                    </Link>{" "}
                    has a new bid. Current bid is ${item?.data?.bid_amount}
                  </div>
                </NotificationCell>
              )}
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
