import Image from 'next/image'
export default function HeroSection() {
  return (
    <div className="bg-gradient-to-b from-[#0F1624] to-[#0F2024] text-white min-h-screen flex items-center px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between w-full">
        {/* Left Text Section */}
        <div className="max-w-2xl">
          <h4 className="text-lg text-gray-300 font-semibold mb-2 ml-2">Hello Everyone!</h4>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">I’m John Nguyen</h1>
          <p className="text-gray-400 text-lg mb-8">
            I use animation as a third dimension by which to simplify experiences and guiding through
            each and every interaction. I’m not adding motion just to spruce things up, but doing it in ways that matter.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Type your email address"
              className="px-4 py-3 rounded-l-lg w-72 bg-[#1c2331] text-white border border-cyan-500 focus:outline-none"
            />
            <button className="px-6 py-3 rounded-r-lg bg-cyan-500 hover:bg-cyan-600 text-white font-semibold">
              Subscribe →
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="mt-12 md:mt-0 relative">
          <Image
            src="/logo.svg" // Place the image in `public/brian.png`
            alt="Brian Clark"
            width={400}
            height={400}
            className="rounded-xl"
          />
          {/* Optional floating shapes can be added with absolute divs */}
        </div>
      </div>
    </div>
  );
}
