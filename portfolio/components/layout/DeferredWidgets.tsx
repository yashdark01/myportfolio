"use client";

import dynamic from "next/dynamic";

const RecruiterMode = dynamic(() => import("@/components/RecruiterMode"), {
  ssr: false,
});

const MobileResumeFab = dynamic(
  () => import("@/components/layout/MobileResumeFab"),
  { ssr: false },
);

export default function DeferredWidgets() {
  return (
    <>
      <RecruiterMode />
      <MobileResumeFab />
    </>
  );
}
