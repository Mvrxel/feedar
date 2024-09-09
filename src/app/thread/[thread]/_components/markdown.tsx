/* eslint-disable */
"use client";

import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { useTheme } from "next-themes";

function CopyButton(content: string) {
  console.log(content);
}

interface PreProps {
  children: React.ReactNode;
}

const Pre: React.FC<PreProps> = ({ children }) => {
  const { theme } = useTheme();
  if (!children || typeof children !== "object" || !("props" in children)) {
    return <pre>{children}</pre>;
  }
  const match = /language-(\w+)/.exec(
    children.props.children.props.className || "",
  );
  return match ? (
    <SyntaxHighlighter
      style={theme === "light" ? oneLight : oneDark}
      language={match[1]}
      PreTag="div"
    >
      {String(children.props.children.props.children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <pre>{children}</pre>
  );
};

const renderers = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="mb-2 text-blue-500 hover:underline" {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mb-4 border-l-4 border-gray-300 pl-4 italic dark:border-zinc-800"
      {...props}
    />
  ),
  br: (props: React.HTMLAttributes<HTMLBRElement>) => (
    <br className="mb-2" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="mb-2 rounded bg-gray-100 p-1 dark:bg-zinc-800"
      {...props}
    />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="mb-2 italic" {...props} />
  ),
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mb-6 text-3xl font-bold" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mb-5 text-2xl font-semibold" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mb-4 text-xl font-semibold" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="mb-3 text-lg font-semibold" {...props} />
  ),
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className="mb-3 text-base font-semibold" {...props} />
  ),
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6 className="mb-2 text-sm font-semibold" {...props} />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="mb-4 border-gray-300 dark:border-zinc-800" {...props} />
  ),
  img: (props: React.HTMLAttributes<HTMLImageElement>) => (
    <img className="mb-4 h-auto max-w-full" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="mb-1 list-disc pl-5" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ol className="mb-4 list-decimal pl-5" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <div className="relative rounded-md bg-gray-100 shadow dark:bg-zinc-800">
      <div className="absolute right-2 top-2 mb-4 flex w-full justify-end p-2">
        <Button variant="secondary" size="sm" onClick={() => {}}>
          <CopyIcon className="mr-2 h-4 w-4" />
          Copy
        </Button>
      </div>
      <Pre>
        <pre
          className="mb-4 overflow-x-auto text-wrap rounded bg-gray-100 p-4 pt-8 dark:bg-zinc-800"
          {...props}
        />
      </Pre>
    </div>
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="mb-2 font-bold" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 list-disc pl-5" {...props} />
  ),
};
export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <Markdown remarkPlugins={[remarkGfm]} components={renderers}>
      {content}
    </Markdown>
  );
}
/* eslint-enable */
