import React from "react";
import { cn } from "@/lib/utils"; // Utility für Klassen (falls vorhanden)
import { ArrowRight } from "lucide-react"; // Für das Icon
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type CardProps = {
  title: string;
  description: string;
  icon: StaticImageData;
  link: string;
  backgroundColor?: string; // Optional für verschiedene Hintergründe
};

const Card = ({
  title,
  description,
  icon,
  link,
  backgroundColor = "bg-gray-100",
}: CardProps) => {
  return (
    <div
      className={cn(
        "relative rounded-lg p-6 flex flex-col justify-between shadow-md",
        backgroundColor
      )}
    >
      {/* Icon */}
      <div className="mb-4">
        <Image src={icon} alt={`${title} Icon`} width={50} height={50} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-2">{title}</h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-6">{description}</p>

      {/* Arrow Link */}
      <Link href={link} className="absolute bottom-4 right-4 text-primary">
        <ArrowRight
          size={36}
          className="transition-transform transform hover:scale-110"
        />
      </Link>
    </div>
  );
};

export default Card;
