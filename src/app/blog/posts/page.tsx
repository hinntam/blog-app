import { posts } from "@/app/lib/placeholder-data";
import Post from "@/app/ui/components/posts/Post";   
export default function Page() {
    return(
        <>
        <h1 className="text-purple-800">Posts</h1>
        <div>
            {
            posts.map((post) => <Post key={post.id} {...post} />)
            }
        </div>
        </>
    );
    
}
