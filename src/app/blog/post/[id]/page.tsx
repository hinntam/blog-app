import { getPosts } from "@/app/lib/data";
import Post from '@/app/ui/components/posts/Post';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const posts = await getPosts();
  
  const post = posts?.find((post) => post.id === id);
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
   
      <h1>Post</h1>
      <Post id={post.id} title={post.title} content={post.content} date={post.date} author={post.user} />
    </>)
}