"use client";

import Posts from "./Posts";

import { useLiveQuery } from "@sanity/preview-kit";

import { postsQuery } from "../lib/queries";

type Props = {
  posts: Post[];
};

export default function PreviewPosts({ posts }: Props) {
  const [data] = useLiveQuery(posts, postsQuery);

  return <Posts posts={data} />;
}
