import Link from "next/link";
// import Image from "next/image";
import { Code, Image as NUIImage } from "@nextui-org/react";
import { Snippet } from "@nextui-org/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/hljs";

import urlFor from "@/lib/urlFor";

export const RichTextComponents = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt: string } }) => {
      return (
        <div className="w-full md:w-3/4 my-5 ">
          <NUIImage
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="object-contain max-h-[80vh] rounded-md"
            src={urlFor(value.asset).url()}
            alt={value.alt}
          />
        </div>
      );
    },
    code: ({
      value,
    }: {
      value: { code: string; language: string; filename: string };
    }) => {
      return (
        <div className="bg-gray-100 p-3 w-fit my-2 rounded-md">
          {value.filename && (
            <p className="text-xs text-gray-500 my-2">{value.filename}</p>
          )}
          <Snippet
            variant="flat"
            symbol={null}
            className="relative p-0"
            codeString={value.code}
            classNames={{
              copyButton: "absolute top-2 right-2",
            }}
          >
            <SyntaxHighlighter
              customStyle={{
                borderRadius: "0.5rem",
                backgroundColor: "#fffff",
              }}
              language={value.language}
              style={vs}
              showLineNumbers
              wrapLongLines
            >
              {value.code}
            </SyntaxHighlighter>
          </Snippet>
        </div>
      );
    },
  },

  list: {
    bullet: ({ children }: any) => {
      return <ul className="list-disc">{children}</ul>;
    },
    number: ({ children }: any) => {
      return <ol className="list-decimal">{children}</ol>;
    },
  },

  block: {
    h1: ({ children }: any) => {
      return <h1 className="text-4xl font-bold">{children}</h1>;
    },
    h2: ({ children }: any) => {
      return <h2 className="text-3xl font-bold">{children}</h2>;
    },
    h3: ({ children }: any) => {
      return <h3 className="text-2xl font-bold">{children}</h3>;
    },
    h4: ({ children }: any) => {
      return <h4 className="text-xl font-bold">{children}</h4>;
    },
    blockquote: ({ children }: any) => {
      return (
        <blockquote className="border-l-4 border-gray-400 pl-4">
          {children}
        </blockquote>
      );
    },
  },

  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noopener noreferrer"
        : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          className="text-blue-600 hover:text-blue-500"
        >
          {children}
        </Link>
      );
    },
    code: ({ children }: { children: React.ReactNode }) => {
      return (
        <Code className="bg-gray-200 dark:bg-slate-700 rounded-md px-1">
          {children}
        </Code>
      );
    },
  },
};
