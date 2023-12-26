import Prism from "prismjs";
import Link from "next/link";
import Image from "next/image";

import urlFor from "@/lib/urlFor";
import "prismjs/themes/prism-coy.css";

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="w-full md:w-3/4 m-auto my-3 ">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="object-contain  max-h-[80vh]"
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
        <pre className="dark:bg-gray-900 bg-gray-100 p-3 my-2 rounded-md overflow-auto ">
          {value.filename && (
            <div className="text-xs text-gray-500">{value.filename}</div>
          )}
          <code
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(
                value.code,
                Prism.languages[value.language],
                value.language
              ),
            }}
          />
        </pre>
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
    code: ({ children }: any) => {
      return (
        <code className="bg-gray-200 dark:bg-slate-700 rounded-md px-1">
          {children}
        </code>
      );
    },
  },
};
