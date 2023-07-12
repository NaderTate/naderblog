import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";

function PostCard({ post }: { post: Post }) {
  return (
    <div>
      <Link href={`/articles/${post?.slug?.current}`} key={post._id}>
        <div>
          <div className="relative h-80 w-full">
            <Image
              fill
              className="object-cover rounded-md"
              src={urlFor(post.mainImage).url()}
              alt={post.title}
            />
            <div className="absolute w-full bottom-0 bg-opacity-20 bg-black backdrop-blur-lg rounded drop-shadow-lg text-white p-5 flex justify-between items-center">
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
                {post.categories?.map((category: Category) => (
                  <span
                    key={category._id}
                    className="mr-2 bg-yellow text-dark-blue text-center px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="font-bold text-light-blue dark:text-super-light-blue">
            {post.title}
          </div>
          <p className="line-clamp-1 text-sm text-light-blue dark:text-super-light-blue">
            {post.description}
          </p>
          <p className="dark:text-yellow text-dark-blue font-bold">
            Read Post <BsArrowUpRight className="inline" />
          </p>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;
