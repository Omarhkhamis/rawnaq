"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import type { FaqItem } from "@/data/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

type FaqListProps = {
  items: FaqItem[];
};

export function FaqList({ items }: FaqListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <Reveal delay={index * 0.06} key={item.question}>
            <div className="panel px-6 py-5 md:px-8">
              <button
                className="flex w-full items-center justify-between gap-4 text-right"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                type="button"
              >
                <span className="font-display text-lg font-bold text-text md:text-xl">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "inline-flex size-11 items-center justify-center rounded-full border border-line bg-white/5 transition-transform duration-300",
                    isOpen && "rotate-45 border-primary/40 text-primary",
                  )}
                >
                  <Plus className="size-5" />
                </span>
              </button>

              <div
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-300",
                  isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-50",
                )}
              >
                <div className="overflow-hidden">
                  <p className="max-w-3xl leading-8 text-text-muted">{item.answer}</p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
