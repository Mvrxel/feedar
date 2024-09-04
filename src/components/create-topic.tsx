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
import { toast } from "sonner";
import { api } from "@/trpc/react";

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
const basicTopicSchema = z.object({
  name: z.string(),
  context: z.string().optional(),
  type: z.enum(["BASIC", "COMPETITOR"]),
  includedDomains: z.array(
    z.object({
      name: z.string(),
    }),
  ),
  excludedDomains: z.array(
    z.object({
      name: z.string(),
    }),
  ),
});

const competitorTopicSchema = z.object({
  name: z.string(),
  competitors: z.array(
    z.object({
      name: z.string(),
      url: z.string().optional(),
      description: z.string().optional(),
    }),
  ),
  type: z.enum(["BASIC", "COMPETITOR"]),
  includedDomains: z.array(
    z.object({
      name: z.string(),
    }),
  ),
  excludedDomains: z.array(
    z.object({
      name: z.string(),
    }),
  ),
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
  const utils = api.useUtils();
  const createBasicTopic = api.topic.createBasicTopic.useMutation({
    onSuccess: async () => {
      await utils.topic.invalidate();
    },
  });
  const createCompetitorTopic = api.topic.createCompetitorTopic.useMutation({
    onSuccess: async () => {
      await utils.topic.invalidate();
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const commonData = {
      topicName: values.topicName,
      topicType: values.topicType,
      includeDomains,
      excludeDomains,
    };
    if (values.topicType === "basic") {
      const basicValues = {
        name: values.topicName,
        context: values.context ?? "",
        type: "BASIC",
        excludedDomains: excludeDomains.map((name) => ({ name: name })),
        includedDomains: includeDomains.map((name) => ({ name: name })),
      } as z.infer<typeof basicTopicSchema>;
      if (basicValues.context) {
        if (basicValues.context !== undefined) {
          console.log(basicValues);
          createBasicTopic.mutate(basicValues);
          setIsSubmitting(false);
        }
      } else {
        toast.error("Please enter a context");

        setIsSubmitting(false);
      }
    } else if (values.topicType === "competitor") {
      if (competitors.length > 0) {
        const competitorValues = {
          name: values.topicName,
          competitors: competitors.map((competitor) => ({
            name: competitor.name,
            url: competitor.website,
            description: competitor.description,
          })),
          type: "COMPETITOR",
          includedDomains: includeDomains.map((name) => ({ name })),
          excludedDomains: excludeDomains.map((name) => ({ name })),
        } as z.infer<typeof competitorTopicSchema>;
        console.log(competitorValues);
        createCompetitorTopic.mutate(competitorValues);
        setIsSubmitting(false);
      } else {
        toast.error("Please enter at least one competitor");
        setIsSubmitting(false);
      }
    }
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
