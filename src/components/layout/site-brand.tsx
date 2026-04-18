import Image from "next/image";

import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type SiteBrandProps = {
  className?: string;
  priority?: boolean;
};

export function SiteBrand({ className, priority = false }: SiteBrandProps) {
  return (
    <Image
      alt={siteConfig.name}
      className={cn("w-auto select-none object-contain", className)}
      draggable={false}
      height={302}
      priority={priority}
      src={siteConfig.logoPath}
      width={392}
    />
  );
}
