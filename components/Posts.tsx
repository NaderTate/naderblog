import PostCard from "./PostCard";

type Props = {
  posts: Post[];
};

export default function Posts({ posts }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
