"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { PencilIcon, TrashIcon } from "lucide-react";

type Competitor = {
  id: number;
  name: string;
  website: string;
  description: string;
};

interface CompetitorSectionProps {
  competitors: Competitor[];
  setCompetitors: React.Dispatch<React.SetStateAction<Competitor[]>>;
}

export function CompetitorSection({
  competitors,
  setCompetitors,
}: CompetitorSectionProps) {
  const [isAddCompetitorOpen, setIsAddCompetitorOpen] = useState(false);
  const [isEditCompetitorOpen, setIsEditCompetitorOpen] = useState(false);
  const [editingCompetitor, setEditingCompetitor] = useState<Competitor | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingCompetitorId, setDeletingCompetitorId] = useState<
    number | null
  >(null);

  const addCompetitor = (
    name: string,
    website: string,
    description: string,
  ) => {
    setCompetitors([
      ...competitors,
      { id: Date.now(), name, website, description },
    ]);
    setIsAddCompetitorOpen(false);
  };

  const editCompetitor = (
    id: number,
    name: string,
    website: string,
    description: string,
  ) => {
    setCompetitors(
      competitors.map((comp) =>
        comp.id === id ? { ...comp, name, website, description } : comp,
      ),
    );
    setIsEditCompetitorOpen(false);
    setEditingCompetitor(null);
  };

  const deleteCompetitor = (id: number) => {
    setCompetitors(competitors.filter((comp) => comp.id !== id));
    setIsDeleteDialogOpen(false);
    setDeletingCompetitorId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Competitors</h3>
        <Dialog
          open={isAddCompetitorOpen}
          onOpenChange={setIsAddCompetitorOpen}
        >
          <DialogTrigger asChild>
            <Button>Add Competitor</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Competitor</DialogTitle>
            </DialogHeader>
            <CompetitorForm onSubmit={addCompetitor} />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {competitors.map((competitor) => (
            <TableRow key={competitor.id}>
              <TableCell>{competitor.name}</TableCell>
              <TableCell>{competitor.website}</TableCell>
              <TableCell>{competitor.description}</TableCell>
              <TableCell>
                <div className="flex items-end justify-end space-x-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setEditingCompetitor(competitor);
                      setIsEditCompetitorOpen(true);
                    }}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setDeletingCompetitorId(competitor.id);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={isEditCompetitorOpen}
        onOpenChange={setIsEditCompetitorOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Competitor</DialogTitle>
          </DialogHeader>
          {editingCompetitor && (
            <CompetitorForm
              initialValues={editingCompetitor}
              onSubmit={(name, website, description) =>
                editCompetitor(editingCompetitor.id, name, website, description)
              }
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Competitor</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this competitor?</p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() =>
                deletingCompetitorId && deleteCompetitor(deletingCompetitorId)
              }
            >
              Delete Competitor
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CompetitorForm({
  onSubmit,
  initialValues,
}: {
  onSubmit: (name: string, website: string, description: string) => void;
  initialValues?: { name: string; website: string; description: string };
}) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [website, setWebsite] = useState(initialValues?.website ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );

  const handleSubmit = () => {
    onSubmit(name, website, description);
    if (!initialValues) {
      setName("");
      setWebsite("");
      setDescription("");
    }
  };

  return (
    <form className="space-y-4">
      <FormItem>
        <FormLabel>Competitor Name</FormLabel>
        <FormControl>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormControl>
      </FormItem>
      <FormItem>
        <FormLabel>Website</FormLabel>
        <FormControl>
          <Input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
        </FormControl>
      </FormItem>
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormControl>
      </FormItem>
      <Button type="button" onClick={handleSubmit}>
        {initialValues ? "Update" : "Add"} Competitor
      </Button>
    </form>
  );
}
