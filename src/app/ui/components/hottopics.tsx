import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const topics = [
  {
    title: "Travel",
    articles: 36,
    image: "/topics.webp",
  },
  {
    title: "Culture",
    articles: 18,
    image: "/topics.webp",
  },
  {
    title: "Lifestyle",
    articles: 44,
    image: "/topics.webp",
  },
  {
    title: "Fashion",
    articles: 65,
    image: "/topics.webp",
  },
];

export default function HotTopics() {
  return (
    <div className="bg-[#0F1624] text-white p-8 rounded-xl shadow-lg max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left section */}
        <div className="flex flex-col justify-between bg-[#131c31] rounded-xl p-6 w-full md:w-1/3">
          <div>
            <h2 className="text-2xl font-bold mb-2">Hot topics</h2>
            <p className="text-gray-400">
              Do not miss out on the latest news about Travel tips, Hotels review, Food guide...
            </p>
          </div>
          <div className="flex gap-4 mt-6">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1f2a3e] hover:bg-cyan-500 transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1f2a3e] hover:bg-cyan-500 transition">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cards section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 flex-1">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={topic.image}
                alt={topic.title}
                width={300}
                height={200}
                className="object-cover w-full h-48 group-hover:scale-105 transition duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="font-semibold text-lg">{topic.title}</h3>
                <p className="text-sm text-gray-300">{topic.articles} Articles</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
