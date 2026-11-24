export const dynamic = "force-static";
import ProjectsSection from "@/components/ProjectsSection";
import Hero from "../components/Hero";
import Technologies from "../components/Technologies";
export default function Home() {
  return (
    <>
      <Hero />
      <Technologies />
      <ProjectsSection/>
    </>
  );
}
