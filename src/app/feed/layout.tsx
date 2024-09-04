"use client";

import { Navigation } from "../_components/navigation";

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <Navigation />
      <div>{children}</div>
    </div>
  );
}
