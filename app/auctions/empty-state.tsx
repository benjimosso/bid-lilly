import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function EmptyState() {
  return (
    <div className="space-y-8 flex flex-col items-center justify-center">
      <Image
        src="/undraw_delivery_truck_vt6p.svg"
        alt="empty state"
        width={200}
        height={200}
      />
      <h2 className="text-2xl font-bold">You have no auctions yet</h2>
      <Button asChild>
        <Link href="/bids/create">Create Auction</Link>
      </Button>
      
    </div>
  );
}
