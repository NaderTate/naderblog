import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "@/app/components/RichTextComponents";
import Image from "next/image";
import urlFor from "@/lib/urlFor";
import PostCard from "@/app/components/PostCard";
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
        images: [
          {
            url: urlFor(post?.mainImage).url(),
            width: 800,
            height: 600,
          },
        ],
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
    <div>
      <div className="">
        <div className="relative min-h-56 flex flex-col md:flex-row justify-between text-dark-blue mb-10">
          <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10 ">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover object-center-mx-auto"
            />
          </div>
          <section className="p-5 bg-yellow rounded-md w-full">
            <div className="flex flex-col md:flex-row justify-between gap-y-5">
              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold">
                  {post.title}
                </h1>
                <p>
                  {new Date(post._createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  src={urlFor(post.author?.image).url()}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="w-64">
                  <h3 className="text-lg font-bold ">{post.author?.name}</h3>
                  <p>{post.author?.bio}</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="italic pt-10 ">{post.description}</h2>
              <div className="flex items-center justify-end">
                {post.categories?.map((category: Category) => (
                  <span
                    key={category._id}
                    className="mr-2 bg-dark-blue text-white text-center px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
        <div className="whitespace-pre-line">
          <PortableText value={post.body} components={RichTextComponents} />
        </div>
      </div>
      <h2 className="text-2xl font-bold my-5 sm:my-10">You might also like:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {relatedPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default page;
