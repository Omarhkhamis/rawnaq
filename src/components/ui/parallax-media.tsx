"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ParallaxMediaProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  distance?: number;
};

export function ParallaxMedia({
  children,
  className,
  innerClassName,
  distance = 10,
}: ParallaxMediaProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const media = mediaRef.current;

    if (!container || !media) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(media, { yPercent: 0 });
      return;
    }

    gsap.fromTo(
      media,
      { yPercent: -distance },
      {
        yPercent: distance,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  }, [distance]);

  return (
    <div className={cn("relative overflow-hidden", className)} ref={containerRef}>
      <div className={cn("h-full will-change-transform", innerClassName)} ref={mediaRef}>
        {children}
      </div>
    </div>
  );
}
