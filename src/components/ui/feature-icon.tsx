import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Building2,
  Calculator,
  CalendarCheck,
  Clock3,
  DraftingCompass,
  FileCheck2,
  FolderOpen,
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

import type { FeatureIconKey } from "@/lib/content/types";
import { cn } from "@/lib/utils";

const iconMap: Record<FeatureIconKey, LucideIcon> = {
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
  calculator: Calculator,
  calendar: CalendarCheck,
  folder: FolderOpen,
  file: FileCheck2,
};

type FeatureIconProps = {
  name: FeatureIconKey;
  className?: string;
};

export function FeatureIcon({ name, className }: FeatureIconProps) {
  const Icon = iconMap[name] ?? Sparkles;

  return <Icon className={cn("size-6", className)} strokeWidth={1.65} />;
}
