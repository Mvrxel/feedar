"use client";
import { api } from "@/trpc/react";
import { NoTopics } from "./_components/no-topics";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

function FeedContent() {
  // const test = api.articles.testArtileBasic.useMutation();
  const testcompetitor = api.articles.testArticleCompetitor.useMutation();
  const articles = api.articles.getAll.useQuery();
  const { data, isLoading } = articles;
  if (isLoading || !data) return <div>Loading...</div>;
  return (
    <div>
      {/* <Button onClick={() => testcompetitor.mutate()}>Test</Button> */}
      <h1 className="mb-4 text-2xl font-bold">Feed</h1>
      <div>
        {data.map((article) => (
          <div
            key={article.id}
            className="mb-4 rounded-md border bg-white p-4 shadow-md shadow-sm dark:bg-zinc-900"
          >
            <div className="mb-2">
              <Badge>{article.topic.name}</Badge>
            </div>
            <h2 className="text-lg font-bold">{article.title}</h2>
            <p className="py-4 text-sm text-gray-500 dark:text-zinc-400">
              {article.summary}
            </p>
            <Separator />
            <div className="mt-4">
              <span className="text-sm text-gray-500">
                Source: {article.url}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Feed() {
  const topics = api.topic.getAll.useQuery();
  const { data, isLoading } = topics;
  if (isLoading || !data) return <div>Loading...</div>;
  return <div>{data.length === 0 ? <NoTopics /> : <FeedContent />}</div>;
}
