import { motion } from "framer-motion";
import { AnimatedCounter } from "./shared/AnimatedCounter";

interface IMacroCounter {
  serving_size: number;
  total_macros: number;
  label: string;
  variant?: "green" | "orange" | "blue";
  delay?: number;
}

export const MacroCounter = ({
  serving_size,
  total_macros,
  variant,
  label,
  delay = 0,
}: IMacroCounter) => {
  let bg_color = "#ECFDF5";
  let progress_color = "#6EE7B7";
  let text_color = "#065F46";

  if (variant === "orange") {
    bg_color = "#FFF7ED";
    progress_color = "#FED7AA";
    text_color = "#9A3412";
  } else if (variant === "blue") {
    bg_color = "#EFF6FF";
    progress_color = "#93C5FD";
    text_color = "#1E40AF";
  }

  let percentage =
    total_macros == 0
      ? 0
      : Math.round((serving_size / total_macros) * 100) || 0;

  return (
    <div className="w-full max-w-[300px]">
      <div
        className="h-[160px] sm:h-[220px] w-full rounded-xl relative overflow-hidden"
        style={{ background: bg_color }}
      >
        <motion.div
          className="rounded-xl w-full absolute bottom-0 left-0 z-10"
          style={{
            background: progress_color,
          }}
          animate={{ height: percentage + "%" }}
          transition={{ delay, duration: 0.4 }}
        ></motion.div>

        <div className="absolute top-0 left-0 w-full h-full z-20 bg-transparent flex items-center justify-center">
          <span className="font-bold text-2xl" style={{ color: text_color }}>
            <AnimatedCounter targetNumber={percentage} speed={0.4} />%
            {/* {percentage}% */}
          </span>
        </div>
      </div>
      <p className="text-sm  text-center">
        <span className="font-bold capitalize text-gray-800">{label}</span>{" "}
        <span className="text-gray-500">{serving_size}g</span>
      </p>
    </div>
  );
};
