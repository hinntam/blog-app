//import { posts } from "@/app/lib/placeholder-data";
import Post from "@/app/ui/components/posts/Post";   
import { connectToDB,getPosts } from "@/app/lib/data";
export default async function Page() {
    const client = await connectToDB();
    const posts = await getPosts();
    return(
        <>
        {
            client && <p className='text-green-500'>Connected to the DB</p>
        }
        <h1 className="text-purple-800">Posts</h1>
        <div>
            {
            posts?.map((post) => <Post key={post.id} id={post.id} title={post.title} content={post.content} date={post.date} author={post.author} />)
            }
        </div>
        </>
    );
    
}
