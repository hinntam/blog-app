import Image from 'next/image'
export default function HeroSection() {
  return (
    <div className="bg-gradient-to-b from-[#0F1624] to-[#0F2024] text-white min-h-screen flex items-center px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between w-full">
        {/* Left Text Section */}
        <div className="">
          <h4 className="text-lg text-gray-300 font-semibold">Hello Everyone!</h4>
          <h1 className="text-4xl md:text-6xl font-extrabold">I’m John Nguyen</h1>
          <p className="text-gray-400 text-lg">
            I use animation as a third dimension by which to simplify experiences and guiding through
            each and every interaction. I’m not adding motion just to spruce things up, but doing it in ways that matter.
          </p>
          <div className="flex mt-5">
            <input
              type="email"
              placeholder="Type your email address"
              className="px-1 py-1 rounded-l-lg w-72 bg-[#1c2331] text-white border border-cyan-500 focus:outline-none"
            />
            <button className="px-1 py-1 rounded-r-lg bg-cyan-500 hover:bg-cyan-400 text-white font-semibold">
              Subscribe
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="mt-12 md:mt-0">
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
