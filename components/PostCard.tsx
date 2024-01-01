import Link from "next/link";
import Image from "next/image";
import { Image as NUIImage } from "@nextui-org/react";

import urlFor from "@/lib/urlFor";

type Props = {
  post: Post;
};

function PostCard({ post }: Props) {
  return (
    <Link href={`/articles/${post?.slug?.current}`} key={post._id}>
      <div>
        <div className="relative hover:scale-[1.02] transition-transform shadow-[0px_1px_10px_0px_#667eea] rounded-md">
          <NUIImage
            as={Image}
            width={1069}
            height={611}
            className="object-contain rounded-md"
            src={urlFor(post.mainImage).url()}
            alt={post.title}
          />
          <div className="absolute w-full bottom-0 bg-opacity-20 z-20 bg-black backdrop-blur-lg rounded drop-shadow-lg text-white px-5 py-2 flex justify-between items-center">
            <div>
              <p className="line-clamp-1"> {post.title}</p>

              <p className="  line-clamp-1 text-xs ">{post.description}</p>
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
      </div>
    </Link>
  );
}

export default PostCard;
