import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";
import { ImageResponse } from "next/og";
import urlFor from "@/lib/urlFor";
export const runtime = "edge";

export const contentType = "image/png";
const size = { width: 1200, height: 630 };
export default async function OpenGraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const query = groq`*[_type == "post" && slug.current == $slug][0]{
    ...,
    author->,
    categories[]->,
}`;

  const post: Post = await client.fetch(query, { slug });
  return new ImageResponse(
    (
      <div tw="flex relative w-full h-full overflow-hidden rounded-md bg-transparent">
        <img
          tw="flex w-full h-full rounded-md"
          src={urlFor(post.mainImage).url()}
        />
        <div tw="z-10 flex flex-col rounded-md absolute bottom-0 p-5 w-full text-white backdrop-blur-lg bg-black/20">
          <span tw="flex text-4xl line-clamp-1 font-bold">{post.title}</span>
          <span tw="flex text-3xl line-clamp-1">{post.description}</span>
        </div>
      </div>
    ),
    size
  );
}
