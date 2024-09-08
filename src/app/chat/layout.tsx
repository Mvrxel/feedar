import { Sidebar } from "./_components/sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      <div className="h-screen">
        <Sidebar />
      </div>
      <div className="h-screen w-full">{children}</div>
    </div>
  );
}
