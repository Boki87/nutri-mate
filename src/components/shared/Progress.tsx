import { motion } from "framer-motion";

interface IProgress {
  variant?: "green" | "orange" | "purple";
  value?: number;
  max?: number;
}

export const Progress = ({
  variant = "green",
  value = 0,
  max = 100,
}: IProgress) => {
  let percentage = 0;
  if (value > 0) {
    if (value > max) {
      percentage = 100;
    }
    percentage = (value / max) * 100;
  } else {
    percentage = 0;
  }

  let bg = `green`;

  if (variant === "orange") {
    bg = "orange";
  } else if (variant === "purple") {
    bg = "purple";
  }

  if (value > max) {
    bg = "red";
  }

  return (
    <div className="h-2 w-full rounded-full relative bg-white overflow-hidden">
      <motion.div
        className={`h-full absolute left-0 top-0 rounded-full`}
        style={{ background: bg }}
        animate={{ width: `${percentage}%` }}
      ></motion.div>
    </div>
  );
};
