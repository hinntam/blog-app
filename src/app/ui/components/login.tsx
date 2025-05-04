import Image from "next/image";
export default function Login() {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-[#1E293B] rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">
            Welcome back !
          </h1>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="User name"
              className="w-full px-4 py-2 bg-[#0F172A] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 bg-[#0F172A] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <span className="absolute right-3 top-2 text-white cursor-pointer">
                👁️
              </span>
            </div>
            <div className="text-sm text-white underline cursor-pointer">
              Forgot password?
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-md"
            >
              Log me in
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-white">
            Don’t have an account?{' '}
            <span className="text-cyan-400 cursor-pointer">Sign Up</span>
          </div>
  
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-600" />
            <span className="px-4 text-sm text-gray-400">Or, sign in with your email</span>
            <div className="flex-grow h-px bg-gray-600" />
          </div>
  
          <button className="w-full flex items-center justify-center gap-2 border border-gray-600 py-2 rounded-md text-white hover:bg-gray-700 transition">
            <Image src="/google.jpg" alt="Google" className="h-5 w-5" width={50} height={50} ></Image>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }
  