"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { LN_LOGOS } from "@/lib/brand";

const sizeClasses = {
  default:
    "h-7 min-h-[1.75rem] max-w-[8.5rem] sm:h-8 sm:max-w-[10rem] md:h-9 md:max-w-[11.5rem]",
  large:
    "h-8 min-h-[2rem] max-w-[10rem] sm:h-9 sm:max-w-[12rem] md:h-10 md:max-w-[13.5rem]",
  footer:
    "h-5 min-h-[1.25rem] max-w-[6.75rem] sm:h-6 sm:max-w-[7.75rem]",
} as const;

type LexNextHeaderLogoProps = {
  /** default: barra do hub; large: destaque; footer: rodapé compacto */
  size?: keyof typeof sizeClasses;
  /**
   * `onDark` — `/LEXNEXTLAB/LOGO-BRANCA-SEM-GRADIENTE-HORIZONTAL.png` (fundo escuro).
   * `onLight` — logo escura para fundo claro.
   */
  variant?: "onLight" | "onDark";
  /** `responsive` — centralizado no mobile, à esquerda a partir de `lg` */
  align?: "left" | "center" | "responsive";
  className?: string;
};

export function LexNextHeaderLogo({
  size = "default",
  variant = "onLight",
  align = "left",
  className,
}: LexNextHeaderLogoProps) {
  const src =
    variant === "onDark"
      ? LN_LOGOS.horizontalOnDark
      : LN_LOGOS.horizontalOnLight;

  return (
    <div
      className={cn(
        "relative w-full min-w-0",
        sizeClasses[size],
        align === "center" && "mx-auto",
        align === "responsive" && "mx-auto lg:mx-0",
        className,
      )}
    >
      <Image
        src={src}
        alt="LexNext Lab"
        fill
        className={cn(
          "object-contain",
          align === "left" && "object-left",
          align === "center" && "object-center",
          align === "responsive" && "object-center lg:object-left",
        )}
        sizes={
          size === "footer"
            ? "(max-width: 640px) 108px, 124px"
            : size === "large"
              ? "(max-width: 480px) 160px, (max-width: 768px) 192px, 216px"
              : "(max-width: 480px) 136px, (max-width: 768px) 160px, 184px"
        }
        priority={size !== "footer"}
      />
    </div>
  );
}
