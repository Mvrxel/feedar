"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { api } from "@/trpc/react";

export function TopicsDataTable() {
  const { data, isLoading } = api.topic.getAll.useQuery();
  if (isLoading || !data) return <div>Loading...</div>;
  return (
    <div className="">
      <Table className="rounded-lg shadow-sm">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <Badge variant={row.type === "BASIC" ? "secondary" : "outline"}>
                  {row.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={row.isActive ? "default" : "destructive"}>
                  {row.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                    <Edit2Icon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
