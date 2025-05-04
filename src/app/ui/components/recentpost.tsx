import Image from "next/image";
import Link from "next/link";
export default function RecentPosts() {
  return (
    <div className="bg-[#0F172A] text-white min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="md:col-span-3 space-y-10">
          <div>
            <h1 className="text-4xl font-bold text-cyan-400 mb-2">Recent posts</h1>
            <p className="text-gray-400">Do not miss the latest trends</p>
          </div>

          {/* Post Item 1 */}
          <div className="flex flex-col md:flex-row bg-[#1E293B] rounded-xl overflow-hidden">
          <Link href="/detail/" className="flex flex-col md:flex-row bg-[#1E293B] rounded-xl overflow-hidden">
          <Image
                            src="/logo.svg"
                            width={200}
                            height={200}
                            className="w-full md:w-1/3 object-cover"
                            alt="Post 2"
                          />
            <div className="p-6 space-y-2">
              <span className="bg-gray-700 px-3 py-1 rounded-full text-sm font-semibold">Development</span>
              <h2 className="text-xl font-bold">10 Easy Ways to Be Environmentally Conscious</h2>
              <p className="text-gray-400 text-sm">Take small but impactful steps towards environmental stewardship and sustainability within the comfort of your own home, contributing to a greener planet</p>
              <div className="text-gray-500 text-sm flex gap-4">
                <span># Travel</span>
                <span># Lifestyle</span>
                <span className="ml-auto">7 mins read</span>
              </div>
            </div>
          </Link>
          </div>

          {/* Post Item 2 */}
          <div className="flex flex-col md:flex-row bg-[#1E293B] rounded-xl overflow-hidden">
            <Link href="/detail/" className="flex flex-col md:flex-row bg-[#1E293B] rounded-xl overflow-hidden">
          
             <Image
                            src="/logo.svg"
                            width={200}
                            height={200}
                            className="w-full md:w-1/3 object-cover"
                            alt="Post 2"
                          />
            <div className="p-6 space-y-2">
              <span className="bg-gray-700 px-3 py-1 rounded-full text-sm font-semibold">Lifestyle</span>
              <h2 className="text-xl font-bold">How to Give Your Space a Parisian-Inspired Makeover</h2>
              <p className="text-gray-400 text-sm">Infuse the timeless elegance of Parisian aesthetics into your living space with expert design guidance, creating an inviting atmosphere that exudes sophistication</p>
              <div className="text-gray-500 text-sm flex gap-4">
                <span># Travel</span>
                <span># Lifestyle</span>
                <span className="ml-auto">12 mins read</span>
              </div>
            </div>
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="bg-[#1E293B] rounded-xl p-6 space-y-4">
          <h3 className="text-xl font-semibold border-b border-cyan-500 pb-2 text-cyan-400">Popular Posts</h3>
          {[
            { title: "Helpful Tips for Working from Home as a Freelancer", date: "25 April 2025", read: "5 mins read", img: "/logo.svg" },
            { title: "10 Easy Ways to Be Environmentally Conscious", date: "12 May 2025", read: "7 mins read", img: "/logo.svg" },
            { title: "How to Give Your Space a Parisian-Inspired Makeover", date: "15 May 2025", read: "12 mins read", img: "/logo.svg" },
            { title: "Facts About Business That Will Help You Success", date: "27 June 2025", read: "89 mins read", img: "/logo.svg" },
            { title: "The 60 Things To Do About Building A Plan", date: "28 June 2025", read: "35 mins read", img: "/logo.svg" }
          ].map((post, index) => (
            <div key={index} className="flex items-start gap-3">
              <Image
                            src={post.img} 
                            alt={post.title}
                            width={200}
                            height={200}
                            className="w-full md:w-1/3 object-cover"
                          />
              <div className="text-sm">
                <h4 className="font-semibold text-white leading-snug">{post.title}</h4>
                <div className="text-gray-500 text-xs mt-1">{post.read}  •  {post.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
