import HeroSection from "./ui/components/hero";
import HotTopics from "./ui/components/hottopics";
import EditorsPicked from "./ui/components/editorpicked";
import RecentPosts from "./ui/components/recentpost";
import PopularPosts from "./ui/components/popularpost";
import AskCalgarySection from "./ui/components/askcalgary";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HotTopics />
      <AskCalgarySection />
      <PopularPosts />
      {/* Add more sections as needed */}
      <EditorsPicked/>
      <RecentPosts />
    </>
  );
}