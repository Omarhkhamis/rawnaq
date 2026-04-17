"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

function formatNumber(value: number, decimals: number) {
  return new Intl.NumberFormat("ar-SA", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useGSAP(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const finalValue = `${prefix}${formatNumber(value, decimals)}${suffix}`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.textContent = finalValue;
      return;
    }

    const state = { current: 0 };

    gsap.to(state, {
      current: value,
      duration: 1.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 88%",
        once: true,
      },
      onUpdate: () => {
        element.textContent = `${prefix}${formatNumber(Number(state.current.toFixed(decimals)), decimals)}${suffix}`;
      },
    });
  }, [decimals, prefix, suffix, value]);

  return (
    <span className={cn("font-accent tabular-nums", className)} ref={ref}>
      {`${prefix}${formatNumber(0, decimals)}${suffix}`}
    </span>
  );
}
