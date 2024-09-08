import { SidebarThred } from "./_components/sidebar";

export default function ThreadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      <div className="h-screen">
        <SidebarThred />
      </div>
      <div className="h-screen w-full">{children}</div>
    </div>
  );
}
