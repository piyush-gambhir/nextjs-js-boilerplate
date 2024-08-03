"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const SmoothScrollWrapper = ({ children }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      let smoother;

      if (ScrollTrigger.isTouch !== 1) {
        smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.5,
          effects: true,
        });
      }

      return () => {
        if (smoother) {
          smoother.kill();
        }
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      id="smooth-wrapper"
      className="relative h-screen overflow-hidden"
      ref={containerRef}
    >
      <div id="smooth-content" className="overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default SmoothScrollWrapper;
