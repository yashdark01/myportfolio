import About from "@/components/sections/About";
import Coding from "@/components/sections/Coding";
import Contact from "@/components/sections/Contact";
import GitHubSection from "@/components/sections/GitHubSection";
import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import OpenTo from "@/components/sections/OpenTo";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import Writing from "@/components/sections/Writing";
import { site } from "@/data/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Process />
      <Work />
      <GitHubSection />
      <Writing />
      {site.showLeetCode && <Coding />}
      <Journey />
      <About />
      <OpenTo />
      <Contact />
    </>
  );
}
