import Image from "next/image";

const articles = [
  {
    tag: "#Travel",
    time: "5 mins read",
    title: "Helpful Tips for Working from Home as a Freelancer",
    author: {
      name: "Joseph",
      date: "25 April 2025",
      avatar: "/author3.webp",
    },
    image: "/img1.webp",
  },
  {
    tag: "#Travel",
    time: "7 mins read",
    title: "10 Easy Ways to Be Environmentally Conscious",
    author: {
      name: "Rose",
      date: "12 May 2025",
      avatar: "/author3.webp",
    },
    image: "/img1.webp",
  },
];

export default function EditorsPicked() {
  return (
    <section className="text-white max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-cyan-400 mb-2">Editors picked</h2>
      <p className="text-gray-400 mb-8">Featured and highly rated articles</p>

      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-[#131c31] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col justify-between"
          >
            <div className="relative h-64 w-full rounded-xl overflow-hidden mb-4">
              <Image
                src={article.image}
                alt={article.title}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
              <div className="absolute top-4 right-4 bg-[#1f2a3e] p-2 rounded-full">
                <div className="w-3 h-3 bg-cyan-400 rounded-full" />
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>{article.tag}</span>
              <span className="flex items-center gap-1">{article.time}</span>
            </div>

            <h3 className="text-lg font-semibold mb-4 text-white">
              {article.title}
            </h3>

            <div className="flex justify-between items-center text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">{article.author.name}</p>
                  <p className="text-xs text-gray-400">{article.author.date}</p>
                </div>
              </div>
              <button className="bg-[#1f2a3e] text-white px-4 py-2 rounded-full text-sm hover:bg-cyan-600 transition">
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
