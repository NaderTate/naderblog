import Image from "next/image";

import urlFor from "@/lib/urlFor";

type Props = {
  post: {
    title: string;
    description: string;
    categories: Category[];
    mainImage: Image;
    author: {
      image: Image;
      name: string;
      bio: string;
    };
    _createdAt: string;
  };
};

const Banner = ({ post }: Props) => {
  return (
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
  );
};

export default Banner;
