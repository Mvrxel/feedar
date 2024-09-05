"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { CreateTopic } from "@/components/create-topic";

export function CreateTopicDialog() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> Create Topic
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex w-[30vw] max-w-[50vw] flex-col">
          <DialogHeader>
            <DialogTitle>Create Topic</DialogTitle>
            <DialogDescription>
              Create a new topic to start tracking things you care about.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto">
            <CreateTopic onSuccess={() => setOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
