"use client"
import { useState,useEffect } from 'react';
import { PencilIcon, PlusIcon,TrashIcon } from '@heroicons/react/24/outline';

export default function InsertPost() {
  const [id, setID] = useState('');
  const[messages,setMessages] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [createdDate, setCreatedDate] = useState('');

  const PROMPT = "You are a creative blog writer. write a 50-word blog post about the title below. You can write anything you want, but it must be at least 50 words long. The title is: "
  const [generating, setGenerating] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    date: string;
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const[addedPost,setAddedPost] = useState(false);
  const[updated,setUpdated] = useState(false);
  const generateContent = () => {
    setGenerating(true);
    if (!title) { return false }
    const requestParams = {
      model: "gpt-3.5-turbo",
      messages: [{ "role": "system", "content": PROMPT + title },
      { "role": "user", "content": title },]

    }
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(requestParams)
    }).then(res => res.json())
      .then(data => {
        //setDescription(data.choices[0].message.content);
        console.log(data);
        setGenerating(false);
      }).catch(console.error)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ title, description, author, createdDate });
    if(!updated){
      fetch(`/api/posts?title=${title}&author=${author}&content=${description}&date=${createdDate}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({  title, description, author, createdDate})
      }).then(() => {
        // Clear form fields
        setTitle('');
        setDescription('');
        setAuthor('');
        setCreatedDate('');
        // Show success alert
        setMessages('Post successfully inserted');
        setAlertVisible(true);
        // Hide alert after 3 seconds
        setTimeout(() => setAlertVisible(false), 3000);
        fetchPosts();
        
      }).catch(console.error)
    }
    else{
      fetch(`/api/posts?id=${id}&title=${title}&author=${author}&content=${description}&date=${createdDate}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({  title, description, author, createdDate})
      }).then(() => {
        // Clear form fields
        setTitle('');
        setDescription('');
        setAuthor('');
        setCreatedDate('');
        // Show success alert
        setMessages('Post successfully updated');
        setAlertVisible(true);
        // Hide alert after 3 seconds
        setTimeout(() => setAlertVisible(false), 3000);
        fetchPosts();
      }).catch(console.error)
    }

    
  };
  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      console.log('result',data.posts.rows);
      setPosts(data.posts.rows);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setPosts([]); // Ensure posts is an array even if the fetch fails
    }
  };
  const handleDelete = async (postId: string) => {
    try {
      await fetch(`/api/posts?id=${postId}`, {
        method: 'DELETE',
      });
      fetchPosts();
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };
  const handleEdit = (post: { id: string; title: string; content: string; author: string; date: string }) => {
    setID(post.id);
    setTitle(post.title);
    setDescription(post.content);
    setAuthor(post.author);
    setCreatedDate(post.date);
    setAddedPost(!addedPost);
    setUpdated(true);

  };
  useEffect(()=>{
    console.log(process.env.OPENAI_API_KEY );
    fetchPosts();

  },[])
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-purple-800 text-2xl">Posts</h1>
        <button className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
        onClick={()=>setAddedPost(!addedPost)}>
          <PlusIcon className="h-5 w-5 inline-block mr-2" />
          Add New Post
        </button>
      </div>
      {alertVisible && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {messages}</span>
        </div>
      )}
      
      {
        addedPost? (<form onSubmit={handleSubmit} className="bg-white border-2 border-purple-100 rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full h-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {generating && <p className="text-gray-500 text-sm">Generating content...</p>}
            <button
              type="button"
              onClick={()=> generateContent()}
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Generate content
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="createdDate">
              Created Date
            </label>
            <input
              type="date"
              id="createdDate"
              value={createdDate}
              onChange={(e) => setCreatedDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>):<div className="bg-white border-2 border-purple-100 rounded-lg p-6">
        <h2 className="font-bold text-purple-800 text-xl mb-4">Post List</h2>
        <ul>
          {Array.isArray(posts) && posts.map((post) => (
            <li key={post.id} className="mb-4 border-b border-gray-200 pb-4">
              <div className="flex ">
                <div className="grow ">
                  <h3 className="font-bold text-lg">{post.title}</h3>
                  <p className="text-gray-700">{post.content}</p>
                  <p className="text-gray-500 text-sm">By {post.author} on {post.date}</p>
                </div>
                <div className="flex-none w-1/4 space-x-2 pt-5">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleEdit(post)}
                  >
                    <PencilIcon className="h-5 w-5 inline-block mr-2" />
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDelete(post.id)}>
                    <TrashIcon className="h-5 w-5 inline-block mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      }
      
    </div>
  );
}