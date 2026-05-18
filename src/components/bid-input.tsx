import { Plus, Minus, Gavel, TrendingUp, Clock, Zap, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BidInputProps {
  value: number;
  onChange: (val: number) => void;
  onBid: () => void;
  increment: number;
  /** The minimum allowed bid value (typically currentBid + increment) */
  minBid: number;
  /** The current highest bid - used to detect "monster bid" when value > currentBid + increment */
  currentBid: number;
  buttonState?: "bid-now" | "pre-bid" | "increase-bid" | "ended";
  disabled?: boolean;
  size?: "default" | "lg";
  className?: string;
}

export function BidInput({
  value, onChange, onBid, increment, minBid, currentBid,
  buttonState = "bid-now", disabled = false, size = "default", className,
}: BidInputProps) {
  const decrease = () => onChange(Math.max(minBid, value - increment));
  const increase = () => onChange(value + increment);

  // Monster bid = user pushed bid more than 1 increment above current
  const isMonsterBid = value > currentBid + increment;

  const sizeClass = size === "lg" ? "h-12" : "h-10";
  const buttonSizeClass = size === "lg" ? "h-12 w-10" : "h-10 w-9";
  const textSizeClass = size === "lg" ? "text-lg" : "text-base";

  const getBidButton = () => {
    const baseClasses = cn("font-bold shrink-0 whitespace-nowrap", sizeClass);

    // Monster bid takes priority - shows when user bumps more than 1 increment
    if (isMonsterBid && buttonState !== "ended" && buttonState !== "pre-bid") {
      return (
        <Button onClick={onBid} disabled={disabled} className={cn(baseClasses, "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-700 hover:to-indigo-700 shadow-lg shadow-purple-500/40 animate-pulse")}>
          <Flame className="h-4 w-4 mr-1.5" />
          Monster Bid
          <Zap className="h-3 w-3 ml-1" />
        </Button>
      );
    }

    if (buttonState === "pre-bid") {
      return (
        <Button onClick={onBid} disabled={disabled} className={cn(baseClasses, "bg-blue-600 hover:bg-blue-700")}>
          <Clock className="h-4 w-4 mr-1.5" />
          Pre-Bid
        </Button>
      );
    }
    if (buttonState === "increase-bid") {
      return (
        <Button onClick={onBid} disabled={disabled} className={cn(baseClasses, "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 animate-pulse")}>
          <TrendingUp className="h-4 w-4 mr-1.5" />
          Increase
        </Button>
      );
    }
    return (
      <Button onClick={onBid} disabled={disabled} className={cn(baseClasses, "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800")}>
        <Gavel className="h-4 w-4 mr-1.5" />
        Bid Now
      </Button>
    );
  };

  return (
    <div className={cn("flex items-stretch gap-1.5", className)}>
      {/* Connected input with +/- inside */}
      <div className={cn("flex items-center flex-1 rounded-md border-2 border-input bg-background overflow-hidden focus-within:border-primary transition-colors", sizeClass)}>
        <button
          type="button"
          onClick={decrease}
          disabled={value <= minBid}
          className={cn(
            "shrink-0 flex items-center justify-center border-r border-input hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
            buttonSizeClass
          )}
          aria-label="Decrease bid"
        >
          <Minus className="h-4 w-4" />
        </button>

        <div className="flex-1 relative">
          <span className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 font-semibold text-muted-foreground",
            size === "lg" ? "text-xs" : "text-[10px]"
          )}>
            PKR
          </span>
          <input
            type="text"
            value={value.toLocaleString()}
            onChange={(e) => {
              const val = parseInt(e.target.value.replace(/,/g, "")) || 0;
              onChange(val);
            }}
            className={cn(
              "w-full bg-transparent pl-10 pr-2 text-center font-bold focus:outline-none",
              textSizeClass,
              sizeClass
            )}
          />
        </div>

        <button
          type="button"
          onClick={increase}
          className={cn(
            "shrink-0 flex items-center justify-center border-l border-input hover:bg-muted transition-colors",
            buttonSizeClass
          )}
          aria-label="Increase bid"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Side button */}
      {getBidButton()}
    </div>
  );
}
