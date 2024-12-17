import React from "react";
import { cn } from "@/lib/utils"; // Utility für Klassen (falls vorhanden)
import { ArrowRight } from "lucide-react"; // Für das Icon
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

type CardProps = {
  title: string;
  description: string;
  icon: StaticImageData;
  link: string;
  backgroundColor?: string;
  fontColotTitle?: string;
  fontColorDescription?: string;
  variant?: "default" | "arrowIconTopRight";
};

// Variants definieren
const cardVariants = cva(
  "relative rounded-lg !pt-0 pr-6 pb-6 pl-6 flex flex-col justify-between transition-all overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        arrowIconTopRight: "pt-8", // Padding oben für Arrow-Position
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Card = ({
  title,
  description,
  icon,
  link,
  backgroundColor = "bg-gray-100",
  fontColotTitle = "",
  fontColorDescription = "",
  variant = "default",
}: CardProps) => {
  return (
    <div className={cn(cardVariants({ variant }), backgroundColor)}>
      {/* Icon */}
      <div >
        <Image src={icon} alt={`${title} Icon`} width={50} height={50} className="mt-5" />
      </div>

      {/* Title */}
      <h3
        className="text-xl font-bold !mb-1 !mt-0"
        style={{ color: fontColotTitle }}
      >{title}</h3>

      {/* Description */}
      <p
        className="text-muted-foreground text-sm"
        style={{ color: fontColorDescription }}
      >
      {description}</p>

      {/* Rounded Arrow Top-Right */}
      {variant === "arrowIconTopRight" && (
        <>
          {/* Weißer Cut-Out Kreis */}
          <div
            className="absolute top-0 right-0 w-20 h-20 bg-white border-0"
            style={{
              clipPath: "circle(120% at 100% 0%)", // Perfekter runder Cut oben rechts
            }}
          ></div>

          {/* Arrow-Icon */}
          <Link href={link}>
            <div className="absolute top-2 right-2 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white transition-transform hover:scale-110 ">
              <ArrowRight size={20} />
            </div>
          </Link>
        </>
      )}

      {/* Default Arrow unten rechts */}
      {variant === "default" && (
        <Link href={link} className="absolute bottom-4 right-4 text-primary">
          <ArrowRight
            size={36}
            className="transition-transform transform hover:scale-110"
          />
        </Link>
      )}
    </div>
  );
};

export default Card;
