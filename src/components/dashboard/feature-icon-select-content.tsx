"use client";

import { FeatureIcon } from "@/components/ui/feature-icon";
import type { FeatureIconKey } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type IconOptionProps = {
  name: FeatureIconKey;
  label: string;
  selected?: boolean;
};

export function FeatureIconSelectOption({ name, label, selected = false }: IconOptionProps) {
  return (
    <span
      aria-label={label}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-xl border transition",
        selected
          ? "border-primary/50 bg-primary/12 text-primary"
          : "border-line/70 bg-white/5 text-text",
      )}
      title={label}
    >
      <FeatureIcon className="size-5" name={name} />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export function FeatureIconSelectValue({ name, label }: IconOptionProps) {
  return (
    <span
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-xl border border-line/70 bg-white/5 text-text"
      title={label}
    >
      <FeatureIcon className="size-5" name={name} />
      <span className="sr-only">{label}</span>
    </span>
  );
}
