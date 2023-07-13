import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";

function PostCard({ post }: { post: Post }) {
  return (
    <div>
      <Link href={`/articles/${post?.slug?.current}`} key={post._id}>
        <div>
          <div className="relative">
            <Image
              width={1069}
              height={611}
              className="object-contain rounded-md"
              src={urlFor(post.mainImage).url()}
              alt={post.title}
            />
            <div className="absolute w-full bottom-0 bg-opacity-20 bg-black backdrop-blur-lg rounded drop-shadow-lg text-white px-5 py-2 flex justify-between items-center">
              <div>
                <p className="line-clamp-1"> {post.title}</p>
                <p>
                  {new Date(post._createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                </p>
              </div>
              <div className="flex flex-col  md:flex-row gap-2 items-end justify-end">
                {post.categories?.map((category: Category) => (
                  <div
                    key={category._id}
                    className="mr-2 bg-yellow text-dark-blue text-center px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap"
                  >
                    {category.title}
                  </div>
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
