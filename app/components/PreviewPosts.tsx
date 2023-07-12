"use client";

import { useLiveQuery } from "@sanity/preview-kit";
import Posts from "./Posts";
import { postsQuery } from "../../lib/queries";

export default function PreviewPosts({ posts }: { posts: Post[] }) {
  const [data] = useLiveQuery(posts, postsQuery);

  return <Posts posts={data} />;
}
