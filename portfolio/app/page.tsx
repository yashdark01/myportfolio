import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import { site } from "@/data/site";

const Process = dynamic(() => import("@/components/sections/Process"));
const Work = dynamic(() => import("@/components/sections/Work"));
const SocialProof = dynamic(() => import("@/components/sections/SocialProof"));
const GitHubSection = dynamic(() => import("@/components/sections/GitHubSection"));
const Writing = dynamic(() => import("@/components/sections/Writing"));
const Coding = dynamic(() => import("@/components/sections/Coding"));
const Journey = dynamic(() => import("@/components/sections/Journey"));
const About = dynamic(() => import("@/components/sections/About"));
const OpenTo = dynamic(() => import("@/components/sections/OpenTo"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <>
      <Hero />
      <Process />
      <Work />
      <SocialProof />
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
