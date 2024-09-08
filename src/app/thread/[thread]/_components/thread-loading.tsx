import { Skeleton } from "@/components/ui/skeleton";

export function ThreadLoading() {
  return (
    <div className="flex w-3/5">
      <div className="mt-4 flex w-full flex-col justify-between gap-2">
        <div>
          <Skeleton className="h-12 w-full" />
          <div className="mt-2 grid grid-cols-4 gap-2">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
        <div className="mt-4">
          <Skeleton className="mb-4 h-[200px] w-full" />
        </div>
      </div>
    </div>
  );
}
