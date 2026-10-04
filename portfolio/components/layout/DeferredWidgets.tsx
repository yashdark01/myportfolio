"use client";

import dynamic from "next/dynamic";

const RecruiterMode = dynamic(() => import("@/components/RecruiterMode"), {
  ssr: false,
});

const ScrollProgress = dynamic(() => import("@/components/motion/ScrollProgress"), {
  ssr: false,
});

const CustomCursor = dynamic(() => import("@/components/motion/CustomCursor"), {
  ssr: false,
});

export default function DeferredWidgets() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <RecruiterMode />
    </>
  );
}
