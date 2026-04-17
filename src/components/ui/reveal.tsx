"use client";

import { useRef, type HTMLAttributes } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  x?: number;
  y?: number;
  scale?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  x = 0,
  y = 32,
  scale = 1,
  once = true,
  ...props
}: RevealProps) {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const element = root.current;

    if (!element) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(element, { autoAlpha: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    gsap.fromTo(
      element,
      { autoAlpha: 0, x, y, scale },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        delay,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once,
        },
      },
    );
  }, [delay, once, scale, x, y]);

  return (
    <div ref={root} className={cn("will-change-transform", className)} {...props}>
      {children}
    </div>
  );
}
