import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Expertise from "@/components/sections/Expertise";
import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import OpenTo from "@/components/sections/OpenTo";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      <Hero />
      <Process />
      <Work />
      <Expertise />
      <Journey />
      <About />
      <OpenTo />
      <Contact />
    </>
  );
}
