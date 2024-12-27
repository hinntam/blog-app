import Image from "next/image";

export default function Blog() {
  return (
    <div>
     
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold">Welcome to Next.js</h1>
        <p className="text-lg">
          Get started by editing. Get started by editing. Get started by editing. Get started by editing <code>pages/index.js</code>
        </p>
      </div>
      <div className="flex items-center">
        <a
          href="http://localhost:3000/blog/posts"
          className="text-blue-600 hover:underline"
        >
          <span>Blog &rarr;</span>
        </a>
      </div>
    </div>
  );
}
