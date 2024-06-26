'use client';
import { KnockFeedProvider, KnockProvider } from "@knocklabs/react";


// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";

export function AppKnockProviders({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  // if (!user) {
  //   return <div>{children}</div>;
  // }

  return (
    <KnockProvider
      apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY || ""}
      userId={user?.id ?? ""}
    >
      {/* Optionally, use the KnockFeedProvider to connect an in-app feed */}
      <KnockFeedProvider feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_ID || ""}>
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
}
