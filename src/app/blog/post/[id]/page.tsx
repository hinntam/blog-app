import { posts } from "@/app/lib/placeholder-data";
import Post from "@/app/ui/components/posts/Post";   
export default  function Page({params,}: {params: { id: string }}) {
    const post = posts.find((post) => post.id === params.id);
    return(
        <>
        <h1 className="text-purple-800">Post</h1>
        <div>
            {
            post && post.id && post.title && post.content && post.date ? (
                <Post {...post} />
            ) : (
                <p>Post not found</p>
            )
            }
        </div>
        </>
    );
    
}
