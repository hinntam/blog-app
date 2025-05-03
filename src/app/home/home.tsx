import Image from "next/image";
import styles from '@/app/ui/styles/home.module.css';
export default function HomeScreen() {
  return (
   <div className="container mx-auto p-4 relative">
   <div className="bg-white border-2 border-purple-100 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
     <div className="flex flex-col justify-center">
       <h1 className={`text-4xlfont-bold mb-4 ${styles.text_wisteria}`}>Welcome to AskCalgary</h1>
       <p className="text-lg text-gray-700 mb-4">
       AskCalgary is a vibrant community platform dedicated to connecting residents, newcomers, and visitors in Calgary, Alberta.
       </p>
       <a href="/blog/authentication" className={`outline outline-1 outline-offset-2 border-purple-700 text-purple-700 hover:text-white py-2 px-4 rounded hover:bg-purple-800 md:w-auto ${styles.fit_content}`}>
         Go to Blog
       </a>
     </div>
     <div className="relative flex justify-center items-center">
       {/* Image */}
       <Image
         src="/image-desktop.jpeg"
         width={1000}
         height={760}
         className="hidden md:block z-10 rounded-lg"
         alt="Screenshots of the dashboard project showing desktop version"
       />
       <Image
         src="/image-mobile.jpeg"
         width={560}
         height={620}
         className="block rounded-md md:hidden"
         alt="Screenshot of the dashboard project showing mobile version"
       />
     </div>
   </div>
 </div>
  );
}
