import { cn } from "@/lib/utils";

interface PlateDisplayProps {
  plateNumber: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  city?: string;
  region?: string;
  className?: string;
}

const sizeConfig = {
  xs: {
    container: "p-1 border-2",
    top: "text-[5px]",
    main: "text-xs",
    bottom: "text-[4px]",
  },
  sm: {
    container: "p-2 border-2 rounded",
    top: "text-[7px]",
    main: "text-lg",
    bottom: "text-[6px]",
  },
  md: {
    container: "p-3 border-4 rounded-md",
    top: "text-[10px]",
    main: "text-2xl",
    bottom: "text-[8px]",
  },
  lg: {
    container: "p-4 border-4 rounded-lg",
    top: "text-xs",
    main: "text-4xl",
    bottom: "text-[10px]",
  },
  xl: {
    container: "p-6 border-[6px] rounded-xl",
    top: "text-sm",
    main: "text-6xl md:text-7xl",
    bottom: "text-xs",
  },
};

export function PlateDisplay({
  plateNumber,
  size = "md",
  region = "BALOCHISTAN",
  city = "QUETTA",
  className,
}: PlateDisplayProps) {
  const cfg = sizeConfig[size];

  return (
    <div
      className={cn(
        "bg-white border-black text-center font-bold shadow-sm",
        cfg.container,
        className
      )}
    >
      <div className={cn("font-bold tracking-widest text-black leading-none", cfg.top)}>
        {region}
      </div>
      <div className={cn("font-bold tracking-wider text-black font-mono my-0.5", cfg.main)}>
        {plateNumber}
      </div>
      <div className={cn("font-bold tracking-widest text-black leading-none", cfg.bottom)}>
        {city}
      </div>
    </div>
  );
}
