"use client";

import Image from "next/image";
import { LN_LOGOS } from "@/lib/brand";

export function LexNextHeaderLogo() {
  return (
    <div className="relative h-7 min-h-[1.75rem] w-full min-w-0 max-w-[7.75rem] sm:h-8 sm:max-w-[9rem] md:h-9 md:max-w-[10.5rem]">
      <Image
        src={LN_LOGOS.horizontalOnLight}
        alt="LexNext Lab"
        fill
        className="object-contain object-left"
        sizes="(max-width: 480px) 120px, (max-width: 768px) 144px, 168px"
        priority
      />
    </div>
  );
}
