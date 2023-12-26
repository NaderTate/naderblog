import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";

export default async function getSitemap() {
  const baseUrl = "https://www.nailedit.vercel.app";

  const query = groq`*[_type == "post"]{slug}`;
  const posts: Post[] = await client.fetch(query);

  const postsUrls =
    posts.map((post) => {
      return {
        url: `${baseUrl}//${post.slug}`,
        changefreq: "weekly",
        priority: 0.7,
        lastModified: new Date().toISOString(),
      };
    }) ?? [];

  return [
    {
      url: baseUrl,
      changefreq: "weekly",
      priority: 1,
      lastModified: new Date().toISOString(),
    },
    ...postsUrls,
  ];
}
