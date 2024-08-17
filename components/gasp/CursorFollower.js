"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

import { cn } from "@/lib/utils/cn";

const CursorFollower = ({ className }) => {
  const cursorRef = useRef(null);
  const isTouchDevice = "ontouchstart" in window;

  useEffect(() => {
    const cursor = cursorRef.current;

    if (isTouchDevice || !cursor) return;

    const moveCursor = (e) => {
      const { target, clientX: x, clientY: y } = e;
      const isLinkOrBtn = target.closest("a") || target.closest("button");

      gsap.to(cursor, {
        x: x - 12,
        y: y - 12,
        duration: 1.2,
        ease: "power4.out",
        opacity: isLinkOrBtn ? 0.5 : 1,
        scale: isLinkOrBtn ? 3 : 1,
      });
    };

    const hideCursor = () => {
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.7,
      });
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", hideCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-50 h-8 w-8 select-none rounded-full bg-black",
        className,
      )}
    ></div>
  );
};

export default CursorFollower;
