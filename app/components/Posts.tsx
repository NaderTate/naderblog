import PostCard from "./PostCard";
export default function Posts({ posts }: { posts: Post[] }) {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 sm:gap-10">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </main>
  );
}
