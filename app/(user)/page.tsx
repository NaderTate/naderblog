import { groq } from "next-sanity";
import { draftMode } from "next/headers";

import Posts from "@/components/Posts";
import Pagination from "@/components/Pagination";
import PreviewPosts from "@/components/PreviewPosts";
import PreviewProvider from "@/components/PreviewProvider";

import { getPosts } from "./utils";
import { getCachedClient } from "@/lib/getClient";

export const revalidate = 60;

type Props = {
  searchParams: { s?: string; tag?: string; page?: number };
};

export default async function Home({ searchParams }: Props) {
  const { page, tag, s: search } = searchParams;

  const count_ = groq`count(*[_type == "post"])`;

  const count: number = await getCachedClient()(count_);

  const preview = draftMode().isEnabled
    ? { token: process.env.SANITY_API_READ_TOKEN }
    : undefined;

  const posts = await getPosts(search, tag, preview, {
    page: page ?? 1,
    limit: 8,
  });

  if (preview && preview.token) {
    return (
      <PreviewProvider token={preview.token}>
        <PreviewPosts posts={posts} />
      </PreviewProvider>
    );
  }

  return (
    <>
      <Posts posts={posts} />
      <Pagination currentPage={page} total={count} />
    </>
  );
}
