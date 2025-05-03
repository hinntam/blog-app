import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-400 py-12 px-4 border-t border-[#1e293b]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Column 1: Brand + Description */}
        <div>
          <Link href="/">
          YourBrand
          </Link>
          <p className="text-sm">
            Stay updated with the latest insights and inspirations on Travel, Lifestyle, Culture, and Fashion.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">Home</Link></li>
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">Contact</Link></li>
            <li><Link href="#">Blog</Link></li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div>
          <h4 className="text-white font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">Travel</Link></li>
            <li><Link href="#">Lifestyle</Link></li>
            <li><Link href="#">Culture</Link></li>
            <li><Link href="#">Fashion</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-4">Newsletter</h4>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded bg-[#1e293b] text-white text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm py-2 rounded"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-[#1e293b] mt-12 pt-6 text-sm text-center text-gray-500">
        &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
}
