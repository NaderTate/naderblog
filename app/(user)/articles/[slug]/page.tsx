import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";

import { RichTextComponents } from "./_components/RichTextComponents";

import urlFor from "@/lib/urlFor";
import { client } from "@/lib/sanity.client";
import Banner from "./_components/Banner";
import Posts from "@/components/Posts";

export const revalidate = 60;

export async function generateStaticParams() {
  const query = groq`*[_type == "post" && defined(slug.current)]{
      slug
    }`;
  const slug: Post[] = await client.fetch(query);
  const slugRoutes = slug.map((slug) => slug.slug.current);
  return slugRoutes.map((slug) => ({ slug }));
}
export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  try {
    const query = groq`*[_type == "post" && slug.current == $slug][0]{
    title,description,mainImage,slug,author->,

}`;
    const post: Post = await client.fetch(query, { slug });

    if (!post)
      return { title: "Not found", description: "This post does not exist" };
    return {
      title: post?.title,
      description: post?.description,
      alternates: {
        canonical: `/${post?.slug}`,
      },
      twitter: {
        card: "summary_large_image",
        site: "@nailedit",
        title: post?.title,
        description: post?.description,
        images: [urlFor(post?.mainImage).url()],
      },
      openGraph: {
        title: post?.title,
        // images: [
        //   {
        //     url: urlFor(post?.mainImage).url(),
        //     width: 800,
        //     height: 600,
        //   },
        // ],
      },
    };
  } catch (error) {
    return {
      title: "Not found",
      description: "This post does not exist",
    };
  }
}

async function page({ params: { slug } }: { params: { slug: string } }) {
  const query = groq`*[_type == "post" && slug.current == $slug][0]{
        ...,
        author->,
        categories[]->,
    }`;

  const post: Post = await client.fetch(query, { slug });
  console.log(post);
  const relatedPosts: Post[] = await client.fetch(
    groq`*[_type == "post" && count((categories[]->slug.current)[@ in $categories]) > 0 && slug.current != $slug ]{
        ...,categories[]->,
    } | order(_createdAt desc) [0...3]`,
    {
      categories: post.categories.map((category) => category.slug.current),
      slug: post.slug.current,
    }
  );
  return (
    <>
      <Banner post={{ ...post }} />
      <div className="whitespace-pre-line">
        <PortableText value={post.body} components={RichTextComponents} />
      </div>
      {relatedPosts.length > 0 && (
        <>
          <h2 className="text-2xl font-bold my-5 sm:my-10">
            You might also like:
          </h2>
          <Posts posts={relatedPosts} />
        </>
      )}
    </>
  );
}

export default page;
