import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: string; // ISO datetime
  onComplete?: () => void;
  className?: string;
  variant?: "default" | "compact" | "large" | "inline";
  prefix?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

function getTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    totalMs: diff,
  };
}

export function CountdownTimer({
  targetDate,
  onComplete,
  className,
  variant = "default",
  prefix,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetDate));

  useEffect(() => {
    const tick = () => {
      const newTime = getTimeLeft(targetDate);
      setTimeLeft(newTime);
      if (newTime.totalMs <= 0 && onComplete) {
        onComplete();
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  if (timeLeft.totalMs <= 0) {
    return (
      <div className={cn("text-red-500 font-semibold text-sm", className)}>
        Ended
      </div>
    );
  }

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (variant === "compact") {
    return (
      <span className={cn("inline-flex items-center gap-1 font-mono text-sm font-semibold", className)}>
        <Clock className="h-3 w-3" />
        {timeLeft.days > 0 && `${timeLeft.days}d `}
        {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
      </span>
    );
  }

  if (variant === "inline") {
    return (
      <span className={cn("font-mono font-bold", className)}>
        {prefix && <span className="mr-1 font-sans font-normal text-xs">{prefix}</span>}
        {timeLeft.days > 0 && `${timeLeft.days}d `}
        {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
      </span>
    );
  }

  if (variant === "large") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {timeLeft.days > 0 && (
          <TimeBox value={timeLeft.days} label="Days" />
        )}
        <TimeBox value={timeLeft.hours} label="Hours" />
        <TimeBox value={timeLeft.minutes} label="Min" />
        <TimeBox value={timeLeft.seconds} label="Sec" pulsing />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Clock className="h-4 w-4 text-muted-foreground" />
      {prefix && <span className="text-xs text-muted-foreground">{prefix}</span>}
      <div className="flex items-center gap-1 font-mono text-sm font-semibold">
        {timeLeft.days > 0 && (
          <>
            <span className="text-foreground">{timeLeft.days}d</span>
            <span className="text-muted-foreground">:</span>
          </>
        )}
        <span className="text-foreground">{pad(timeLeft.hours)}</span>
        <span className="text-muted-foreground">:</span>
        <span className="text-foreground">{pad(timeLeft.minutes)}</span>
        <span className="text-muted-foreground">:</span>
        <span className="text-foreground tabular-nums">{pad(timeLeft.seconds)}</span>
      </div>
    </div>
  );
}

function TimeBox({ value, label, pulsing }: { value: number; label: string; pulsing?: boolean }) {
  return (
    <div className={cn("flex flex-col items-center", pulsing && "animate-pulse")}>
      <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 min-w-[3rem] text-center font-mono text-xl font-bold tabular-nums shadow-md">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
        {label}
      </div>
    </div>
  );
}

// Bid countdown timer with seconds only (for live auctions)
interface BidCountdownProps {
  seconds: number;
  isBonus?: boolean;
  onComplete?: () => void;
  className?: string;
}

export function BidCountdown({ seconds, isBonus = false, onComplete, className }: BidCountdownProps) {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    setCount(seconds);
  }, [seconds]);

  useEffect(() => {
    if (count <= 0) {
      onComplete?.();
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, onComplete]);

  if (count <= 0) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 font-bold",
        isBonus
          ? "bg-yellow-500 text-yellow-950 animate-pulse"
          : "bg-red-500 text-white",
        className
      )}
    >
      {isBonus && <span className="text-xs uppercase tracking-wider">Bonus</span>}
      <Clock className="h-4 w-4" />
      <span className="font-mono text-lg tabular-nums">{count}s</span>
    </div>
  );
}

// Circular SVG countdown for live auctions
interface CircularBidCountdownProps {
  seconds: number;
  isBonus?: boolean;
  onComplete?: () => void;
  size?: number;
  className?: string;
}

export function CircularBidCountdown({
  seconds,
  isBonus = false,
  onComplete,
  size = 120,
  className,
}: CircularBidCountdownProps) {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    setCount(seconds);
  }, [seconds]);

  useEffect(() => {
    if (count <= 0) {
      onComplete?.();
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, onComplete]);

  if (count <= 0) return null;

  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = count / seconds;
  const offset = circumference * (1 - progress);

  const ringColor = isBonus ? "#eab308" : "#ef4444";
  const bgColor = isBonus ? "#fef9c3" : "#fee2e2";
  const textColor = isBonus ? "text-yellow-600" : "text-red-600";

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className={cn("-rotate-90", isBonus && "animate-pulse")}
        >
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={bgColor}
            strokeWidth="6"
            fill="none"
          />
          {/* Progress ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={ringColor}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={cn("text-3xl font-bold tabular-nums leading-none", textColor)}>
            {count}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">
            {isBonus ? "Bonus" : "Seconds"}
          </div>
        </div>
      </div>
      {isBonus && (
        <div className="mt-2 text-xs font-semibold text-yellow-600 uppercase tracking-wider">
          Final Countdown
        </div>
      )}
    </div>
  );
}
