import Image from "next/image";

import { cn } from "@/lib/utils";

type SiteBrandProps = {
  siteName: string;
  logoPath: string;
  className?: string;
  priority?: boolean;
};

export function SiteBrand({
  siteName,
  logoPath,
  className,
  priority = false,
}: SiteBrandProps) {
  return (
    <Image
      alt={siteName}
      className={cn("w-auto select-none object-contain", className)}
      draggable={false}
      height={302}
      priority={priority}
      src={logoPath}
      width={392}
    />
  );
}
