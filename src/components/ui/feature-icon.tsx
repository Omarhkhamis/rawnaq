import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Building2,
  Clock3,
  DraftingCompass,
  Hammer,
  Handshake,
  House,
  Layers3,
  Paintbrush,
  Ruler,
  ShieldCheck,
  Sofa,
  Sparkles,
} from "lucide-react";

import type { IconKey } from "@/data/site";
import { cn } from "@/lib/utils";

const iconMap: Record<IconKey, LucideIcon> = {
  drafting: DraftingCompass,
  paint: Paintbrush,
  structure: Hammer,
  ruler: Ruler,
  shield: ShieldCheck,
  window: Building2,
  sofa: Sofa,
  badge: BadgeCheck,
  clock: Clock3,
  handshake: Handshake,
  sparkles: Sparkles,
  layers: Layers3,
  building: Building2,
  home: House,
};

type FeatureIconProps = {
  name: IconKey;
  className?: string;
};

export function FeatureIcon({ name, className }: FeatureIconProps) {
  const Icon = iconMap[name] ?? Sparkles;

  return <Icon className={cn("size-6", className)} strokeWidth={1.65} />;
}
