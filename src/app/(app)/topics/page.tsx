import { Button } from "@/components/ui/button";
import { TopicsDataTable } from "./_components/topics-data-table";
import { Plus } from "lucide-react";
import { CreateTopicDialog } from "./_components/create-topic-dialog";

export default function Topics() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Topics</h1>
        <CreateTopicDialog />
        {/* <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Topic
        </Button> */}
      </div>

      <div className="rounded-md border bg-white p-4 shadow-sm dark:bg-zinc-900">
        <TopicsDataTable />
      </div>
    </div>
  );
}
