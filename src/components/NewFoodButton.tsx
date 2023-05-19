import { FaMinus, FaPlus } from "react-icons/fa";
import { classMerge } from "../utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdSetMeal } from "react-icons/md";
import { GiKnifeFork } from "react-icons/gi";
import { IoFastFoodSharp } from "react-icons/io5";

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
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className={classMerge("w-14 h-14", rest.className)}>
      <div className="relative w-full h-full">
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="rounded-full w-14 h-14 bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 active:bg-emerald-700 z-10"
        >
          {showOptions ? <FaMinus /> : <FaPlus />}
        </button>
        <AnimatePresence>
          {showOptions && (
            <>
              <motion.button
                onClick={() => {
                  setShowOptions(false);
                  onAddMeal && onAddMeal();
                }}
                animate={{ bottom: 120, opacity: 1 }}
                exit={{ bottom: 0, opacity: 0 }}
                style={{ right: "0px" }}
                transition={{ delay: showOptions ? 0.2 : 0 }}
                className="absolute rounded-full w-14 h-14 bg-blue-300 text-white flex items-center justify-center hover:bg-blue-400 active:bg-blue-500 z-0"
              >
                <GiKnifeFork />
              </motion.button>
              <motion.button
                onClick={() => {
                  setShowOptions(false);
                  onAddFood && onAddFood();
                }}
                animate={{ bottom: 60, opacity: 1 }}
                exit={{ bottom: 0, opacity: 0 }}
                style={{ right: "0px" }}
                className="absolute rounded-full w-14 h-14 bg-orange-300 text-white flex items-center justify-center hover:bg-orange-400 active:bg-orange-500 z-0"
              >
                <IoFastFoodSharp />
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
