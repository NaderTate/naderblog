import { draftMode } from "next/headers";
import { getCachedClient } from "../../lib/getClient";
import Posts from "../components/Posts";
import PreviewPosts from "../components/PreviewPosts";
import PreviewProvider from "../components/PreviewProvider";
import { groq } from "next-sanity";

export default async function Home({
  searchParams,
}: {
  searchParams: { s: string; category: string };
}) {
  const search = searchParams.s || null;
  const category = searchParams.category || null;
  let postsQuery;
  if (search) {
    postsQuery = groq`*[_type == "post" && (title match "${search}" || description match "${search}" || body match "${search}" || count((categories[]->title)[@ in ["${category}"]]) > 0)]{
      ...,categories[]->,
    } | order(_createdAt desc)`;
  } else if (category) {
    postsQuery = groq`*[_type == "post" && count((categories[]->slug.current)[@ in ["${category}"]]) > 0]{
      ...,categories[]->,
    } | order(_createdAt desc)`;
  } else {
    postsQuery = groq`*[_type == "post"]{
      ...,categories[]->,
    } | order(_createdAt desc)`;
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
  return (
    <div>
      <Posts posts={posts} />;
    </div>
  );
}
