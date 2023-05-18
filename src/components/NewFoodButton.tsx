import { FaMinus, FaPlus } from "react-icons/fa";
import { classMerge } from "../utils";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface INewFoodButton {
  onAddFood?: () => void;
  onAddMeal?: () => void;
  [x: string]: any;
}

export const NewFoodButton = ({
  onAddFood,
  onAddMeal,
  ...rest
}: INewFoodButton) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOption] = useState(false);

  useOutsideClick(parentRef, () => {
    setShowOption(false);
  });
  return (
    <div ref={parentRef} className={classMerge("w-14 h-14", rest.className)}>
      <div className="relative w-full h-full">
        <button
          onClick={() => setShowOption(!showOptions)}
          className="rounded-full w-14 h-14 bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 active:bg-emerald-700 z-10"
        >
          {showOptions ? <FaMinus /> : <FaPlus />}
        </button>
        <AnimatePresence>
          {showOptions && (
            <>
              <motion.button
                animate={{ bottom: 120, opacity: 1 }}
                exit={{ bottom: 0, opacity: 0 }}
                style={{ right: "0px" }}
                transition={{ delay: showOptions ? 0.2 : 0 }}
                className="absolute rounded-full w-14 h-14 bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 active:bg-blue-700 z-0"
              >
                <FaPlus />
              </motion.button>
              <motion.button
                animate={{ bottom: 60, opacity: 1 }}
                exit={{ bottom: 0, opacity: 0 }}
                style={{ right: "0px" }}
                className="absolute rounded-full w-14 h-14 bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 active:bg-orange-700 z-0"
              >
                <FaPlus />
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
