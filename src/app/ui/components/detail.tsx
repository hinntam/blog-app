import Image from 'next/image';

export default function DetailPost() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white px-6 py-10 md:px-20">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-4">
        <span className="mr-2">🏠 Home</span> &gt; 
        <span className="mx-2">Blog</span> &gt; 
        <span className="ml-2 text-white">Life is as free as eagles, or is it just loneliness?</span>
      </nav>

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold text-cyan-400 mb-6">
        Life is as free as eagles, or is it just loneliness?
      </h1>

      {/* Author & Share */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center gap-4">
          <Image
            src="/author3.webp"
            alt="Author"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">William Randolph</p>
            <p className="text-sm text-gray-400">25 April 2023 · 3 mins to read</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0 text-gray-300">
          <span>Share</span>
          <span>🔗</span>
          <span>🐦</span>
          <span>📌</span>
        </div>
      </div>

      {/* Content */}
      <div className="text-lg text-gray-300 leading-relaxed mb-8 max-w-3xl">
        <p className="mb-4">
          The fancy moon going in little artist painting. Thirty days of lavender in the dreamy light inside. 
          Other perfect oh plants, for and again. I’ve honey feeling. Caring dreamland projects noteworthy 
          than minimal, their it oh pretty feeling may. Include pink be.
        </p>
      </div>

      {/* Featured Image */}
      <div className="rounded-xl overflow-hidden mb-8 max-w-4xl">
        <Image
          src="/img1.webp"
          alt="Feature"
          width={1000}
          height={600}
          className="rounded-xl"
        />
      </div>

    </div>
  );
}
