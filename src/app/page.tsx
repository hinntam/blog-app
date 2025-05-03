import HeroSection from "./ui/components/hero";
import HotTopics from "./ui/components/hottopics";
import EditorsPicked from "./ui/components/editorpicked";
import RecentPosts from "./ui/components/recentpost";
export default function Home() {
  return (
    <>
      <HeroSection />
      <HotTopics />
      {/* Add more sections as needed */}
      <EditorsPicked/>
      <RecentPosts />
    </>
  );
}