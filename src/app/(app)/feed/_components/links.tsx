"use client";
import { BookOpen, Hash } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

type NavItem = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
};

const NavItem = ({ icon, label, active = false, onClick }: NavItem) => (
  <div
    className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      active
        ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-gray-900"
        : "text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-900 dark:hover:text-gray-100"
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </div>
);

export function Links() {
  const pathname = usePathname();
  const router = useRouter();
  const isFeed = pathname.includes("feed");
  const isTopics = pathname.includes("topics");
  return (
    <div className="my-2 flex max-w-3xl space-x-1 rounded-lg bg-gray-50 p-1 dark:bg-zinc-950">
      <NavItem
        icon={<BookOpen size={16} />}
        label="Feed"
        active={isFeed}
        onClick={() => {
          router.push("/feed");
        }}
      />
      <NavItem
        icon={<Hash size={16} />}
        label="Topics"
        active={isTopics}
        onClick={() => {
          router.push("/topics");
        }}
      />
    </div>
  );
}
