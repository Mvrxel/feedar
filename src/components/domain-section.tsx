"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-react";

interface DomainSectionProps {
  includeDomains: string[];
  setIncludeDomains: React.Dispatch<React.SetStateAction<string[]>>;
  excludeDomains: string[];
  setExcludeDomains: React.Dispatch<React.SetStateAction<string[]>>;
}

export function DomainSection({
  includeDomains,
  setIncludeDomains,
  excludeDomains,
  setExcludeDomains,
}: DomainSectionProps) {
  const [newIncludeDomain, setNewIncludeDomain] = useState("");
  const [newExcludeDomain, setNewExcludeDomain] = useState("");

  const addIncludeDomain = () => {
    if (newIncludeDomain && !includeDomains.includes(newIncludeDomain)) {
      setIncludeDomains([...includeDomains, newIncludeDomain]);
      setNewIncludeDomain("");
    }
  };

  const addExcludeDomain = () => {
    if (newExcludeDomain && !excludeDomains.includes(newExcludeDomain)) {
      setExcludeDomains([...excludeDomains, newExcludeDomain]);
      setNewExcludeDomain("");
    }
  };

  const removeIncludeDomain = (domain: string) => {
    setIncludeDomains(includeDomains.filter((d) => d !== domain));
  };

  const removeExcludeDomain = (domain: string) => {
    setExcludeDomains(excludeDomains.filter((d) => d !== domain));
  };

  return (
    <>
      <DomainList
        title="Include domains"
        description="Select domains to search"
        domains={includeDomains}
        newDomain={newIncludeDomain}
        setNewDomain={setNewIncludeDomain}
        addDomain={addIncludeDomain}
        removeDomain={removeIncludeDomain}
      />
      <DomainList
        title="Exclude domains"
        description="Block domains to search"
        domains={excludeDomains}
        newDomain={newExcludeDomain}
        setNewDomain={setNewExcludeDomain}
        addDomain={addExcludeDomain}
        removeDomain={removeExcludeDomain}
      />
    </>
  );
}

function DomainList({
  title,
  description,
  domains,
  newDomain,
  setNewDomain,
  addDomain,
  removeDomain,
}: {
  title: string;
  description: string;
  domains: string[];
  newDomain: string;
  setNewDomain: (domain: string) => void;
  addDomain: () => void;
  removeDomain: (domain: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="flex space-x-2">
        <Input
          value={newDomain}
          onChange={(e) => setNewDomain(e.target.value)}
          placeholder="Enter domain"
          className="flex-grow"
        />
        <Button type="button" onClick={addDomain}>
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {domains.map((domain) => (
          <Badge key={domain} variant="secondary" className="px-2 py-1 text-sm">
            {domain}
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-auto p-0"
              onClick={() => removeDomain(domain)}
            >
              <XIcon className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
