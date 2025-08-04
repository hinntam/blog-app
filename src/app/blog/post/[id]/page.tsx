import { getPosts } from "@/app/lib/data";
import Post from '@/app/ui/components/posts/Post';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const posts = await getPosts();
  
  const post = posts?.find((post) => post.id === id);
  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600">The post you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post Details</h1>
          <p className="text-gray-600">Full post content with HTML formatting</p>
        </div>

        {/* Post Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Post 
            id={post.id} 
            title={post.title} 
            content={post.content} 
            date={post.date} 
            author={post.user || post.author}
            showFullContent={true}
            category="Blog Post"
            views={Math.floor(Math.random() * 200) + 10}
            featured={false}
          />
        </div>
      </div>
    </div>
  );
}