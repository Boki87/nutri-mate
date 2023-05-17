import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "../../app/hooks";
import { FoodModalSearch } from "./FoodModalSearch";
import { Food } from "../../types/Food";
import { FoodModalForm } from "./FoodModalForm";

interface IFoodModalContext {
  showForm: boolean;
  setShowForm: (val: boolean) => void;
  foodToAdd: Food | null;
  setFoodToAdd: (val: Food | null) => void;
}

const initialContext: IFoodModalContext = {
  showForm: false,
  setShowForm: () => {},
  foodToAdd: null,
  setFoodToAdd: () => {},
};

const FoodModalContext = createContext(initialContext);
export const useFoodModalContext = () => useContext(FoodModalContext);

export const FoodModal = () => {
  const { isFoodModalOpen } = useAppSelector((state) => state.modals);

  const [showForm, setShowForm] = useState(false);
  const [foodToAdd, setFoodToAdd] = useState<Food | null>(null);

  return (
    <FoodModalContext.Provider
      value={{ showForm, foodToAdd, setShowForm, setFoodToAdd }}
    >
      <AnimatePresence>
        {isFoodModalOpen ? (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="w-full h-full bg-white absolute z-20 bottom-0 left-0"
          >
            <AnimatePresence initial={false} mode="wait">
              {!showForm ? (
                <FoodModalSearch key={"food_modal_search"} />
              ) : (
                <FoodModalForm key={"food_modal_form"} />
              )}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </FoodModalContext.Provider>
  );
};
