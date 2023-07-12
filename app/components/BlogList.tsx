import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
function BlogList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 px-10 gap-10 gap-y-16 pb-24">
      {posts.map((post) => (
        <Link href={`/articles/${post?.slug?.current}`} key={post._id}>
          <div>
            <div className="relative h-80 w-full">
              <Image
                fill
                className="object-cover"
                src={urlFor(post.mainImage).url()}
                alt={post.title}
              />
              <div className="absolute w-full bottom-0 bg-opacity-20 bg-black backdrop-blur-lg rounded drop-shadow-lg text-white p-5 flex justify-between">
                <div>
                  <p> {post.title}</p>
                  <p>
                    {new Date(post._createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row md:gap-y-2 items-center">
                  {post.categories.map((category) => (
                    <span
                      key={category._id}
                      className="mr-2 bg-blue-700 text-white text-center px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="font-bold">{post.title}</div>
            <p>
              Read Post <BsArrowUpRight />
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BlogList;
