import { draftMode } from "next/headers";
import { getCachedClient } from "../../lib/getClient";
import Posts from "../components/Posts";
import PreviewPosts from "../components/PreviewPosts";
import PreviewProvider from "../components/PreviewProvider";
import { groq } from "next-sanity";
import Link from "next/link";

export const revalidate = 60;
export default async function Home({
  searchParams,
}: {
  searchParams: { s: string; tag: string; page: string };
}) {
  const itemsPerPage = 8;
  const count_ = groq`count(*[_type == "post"])`;
  const count: number = await getCachedClient()(count_);
  const page = Number(searchParams.page) || 1;
  const search = searchParams.s || null;
  const tag = searchParams.tag || null;
  let postsQuery;
  if (search) {
    postsQuery = groq`*[_type == "post" && (title match "${search}" || description match "${search}" || body match "${search}" || count((tags[]->title)[@ in ["${tag}"]]) > 0)]{
      ...,categories[]->,
    } | order(_createdAt desc)`;
  } else if (tag) {
    postsQuery = groq`*[_type == "post" && count((tags[]->slug.current)[@ in ["${tag}"]]) > 0]{
      ...,categories[]->,
    } | order(_createdAt desc)`;
  } else {
    postsQuery = groq`*[_type == "post"]{
      ...,categories[]->,
    } | order(_createdAt desc) [${(page - 1) * itemsPerPage}...${
      page * itemsPerPage
    }]`;
  }
  const preview = draftMode().isEnabled
    ? { token: process.env.SANITY_API_READ_TOKEN }
    : undefined;
  const posts = await getCachedClient(preview)(postsQuery);
  if (preview && preview.token) {
    return (
      <div>
        <PreviewProvider token={preview.token}>
          <PreviewPosts posts={posts} />
        </PreviewProvider>
      </div>
    );
  }
  const pages = Array.from(
    { length: Math.ceil(count / itemsPerPage) },
    (_, i) => i + 1
  );
  const pagenateArr = (arr: Array<number>, p: number) => {
    let newArr: Array<number> = [];
    arr.forEach((element: any) => {
      if (Math.abs(element - p) <= 2) {
        newArr = [...newArr, element];
      }
    });
    return newArr;
  };
  const Arr = pagenateArr(pages, page);

  return (
    <div>
      <Posts posts={posts} />
      {pages && Arr && (
        <ol className="flex justify-center gap-1 mt-16 text-sm font-medium">
          <li>
            <Link
              href={{
                pathname: "/",
                query: {
                  page: pages.at(0),
                },
              }}
              className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded-full hover:bg-slate-400/50 transition "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </li>
          {Arr &&
            Arr.map((page: any) => (
              <li key={page}>
                <Link
                  href={{
                    pathname: "/",
                    query: {
                      page,
                    },
                  }}
                  className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded-full hover:bg-slate-400/50 transition"
                >
                  {page}
                </Link>
              </li>
            ))}
          <li>
            <Link
              href={{
                pathname: "/",
                query: {
                  page: pages.at(-1),
                },
              }}
              className="inline-flex items-center justify-center w-8 h-8 border border-gray-100 rounded-full hover:bg-slate-400/50 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </li>
        </ol>
      )}
    </div>
  );
}
