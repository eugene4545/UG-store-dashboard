"use client";

import dynamic from "next/dynamic";

// UseAnimations uses lottie-web which accesses `document` on import.
// Wrapping with ssr:false prevents it from running during Next.js server-side rendering.
const UseAnimations = dynamic(() => import("react-useanimations"), {
  ssr: false,
  loading: () => <span style={{ display: "inline-block", width: 36, height: 36 }} />,
});

export default UseAnimations;
