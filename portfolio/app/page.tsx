import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import { site } from "@/data/site";

const Work = dynamic(() => import("@/components/sections/Work"));
const Process = dynamic(() => import("@/components/sections/Process"));
const SocialProof = dynamic(() => import("@/components/sections/SocialProof"));
const GitHubSection = dynamic(() => import("@/components/sections/GitHubSection"));
const Writing = dynamic(() => import("@/components/sections/Writing"));
const Coding = dynamic(() => import("@/components/sections/Coding"));
const Journey = dynamic(() => import("@/components/sections/Journey"));
const About = dynamic(() => import("@/components/sections/About"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Process />
      <SocialProof />
      <GitHubSection />
      <Writing />
      {site.showLeetCode && <Coding />}
      <Journey />
      <About />
      <Contact />
    </>
  );
}
