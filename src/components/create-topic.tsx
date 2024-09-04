"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { BookOpenIcon, TrophyIcon } from "lucide-react";
import { CompetitorSection } from "./competitor-section";
import { DomainSection } from "./domain-section";

// Update the formSchema to include domains
const formSchema = z.object({
  topicName: z.string().min(2, {
    message: "Topic name must be at least 2 characters.",
  }),
  topicType: z.enum(["basic", "competitor"], {
    required_error: "You need to select a topic type.",
  }),
  context: z.string().optional(),
  includeDomains: z.array(z.string()),
  excludeDomains: z.array(z.string()),
});

export type Competitor = {
  id: number;
  name: string;
  website: string;
  description: string;
};

export function CreateTopic() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [includeDomains, setIncludeDomains] = useState<string[]>([]);
  const [excludeDomains, setExcludeDomains] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topicName: "",
      topicType: undefined,
      context: "",
      includeDomains: [],
      excludeDomains: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const commonData = {
        topicName: values.topicName,
        topicType: values.topicType,
        includeDomains,
        excludeDomains,
      };

      if (values.topicType === "basic") {
        console.log({
          ...commonData,
          context: values.context,
        });
      } else if (values.topicType === "competitor") {
        console.log({
          ...commonData,
          competitors,
        });
      }

      setIsSubmitting(false);
    }, 2000);
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <TopicNameField control={form.control} />
          <TopicTypeField control={form.control} />
          {form.watch("topicType") === "basic" && (
            <ContextField control={form.control} />
          )}
          {form.watch("topicType") === "competitor" && (
            <CompetitorSection
              competitors={competitors}
              setCompetitors={setCompetitors}
            />
          )}
          {form.watch("topicType") && (
            <DomainSection
              includeDomains={includeDomains}
              setIncludeDomains={setIncludeDomains}
              excludeDomains={excludeDomains}
              setExcludeDomains={setExcludeDomains}
            />
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Topic"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

function TopicNameField({ control }: { control: any }) {
  return (
    <FormField
      control={control}
      name="topicName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Topic Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter topic name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function TopicTypeField({ control }: { control: any }) {
  return (
    <FormField
      control={control}
      name="topicType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Topic Type</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-2 gap-4"
            >
              <TopicTypeOption
                id="basic"
                icon={<BookOpenIcon className="h-8 w-8 text-primary" />}
                title="Basic"
                description="Standard topic for general use"
              />
              <TopicTypeOption
                id="competitor"
                icon={<TrophyIcon className="h-8 w-8 text-primary" />}
                title="Competitor"
                description="Topic for competitive analysis"
              />
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function TopicTypeOption({
  id,
  icon,
  title,
  description,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <FormItem>
      <FormControl>
        <RadioGroupItem value={id} id={id} className="peer sr-only" />
      </FormControl>
      <label
        htmlFor={id}
        className="flex cursor-pointer flex-col items-center space-y-2 rounded-md border-2 border-muted p-4 hover:bg-accent peer-data-[state=checked]:border-green-500 [&:has([data-state=checked])]:border-green-500"
      >
        {icon}
        <div className="font-semibold">{title}</div>
        <p className="text-center text-sm text-muted-foreground">
          {description}
        </p>
      </label>
    </FormItem>
  );
}

function ContextField({ control }: { control: any }) {
  return (
    <FormField
      control={control}
      name="context"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Context</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Write what you want to be searched for you"
              className="min-h-[100px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
