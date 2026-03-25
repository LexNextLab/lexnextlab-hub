"use client";

import Image from "next/image";
import { LN_LOGOS } from "@/lib/brand";

export function LexNextHeaderLogo() {
  return (
    <div className="relative h-8 w-[min(9.5rem,calc(100vw-8.5rem))] max-w-[9.5rem] shrink-0 sm:h-9 sm:max-w-none sm:w-[10.5rem]">
      <Image
        src={LN_LOGOS.horizontalOnLight}
        alt="LexNext Lab"
        fill
        className="object-contain object-left"
        sizes="(max-width: 640px) 152px, 168px"
        priority
      />
    </div>
  );
}
