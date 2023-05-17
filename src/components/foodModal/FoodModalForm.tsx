import { SetStateAction, SyntheticEvent, useEffect, useState } from "react";
import { useFoodModalContext } from "./FoodModal";
import { Food } from "../../types/Food";
import { supabase } from "../../api/supabaseClient";
import { useAppDispatch } from "../../app/hooks";
import { addFood } from "../../features/data/dataSlice";
import { closeFoodModal } from "../../features/modals/modalsSlice";
import { motion } from "framer-motion";
import { Input } from "../shared/Input";
import { MdOutlineLiveTv } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa";

export const FoodModalForm = () => {
  const dispatch = useAppDispatch();
  const { foodToAdd, setShowForm, setFoodToAdd } = useFoodModalContext();

  const [cachedFood, setCachedFood] = useState<Food | null>(foodToAdd);
  const [food, setFood] = useState<Food | null>(foodToAdd);
  const [servingSize, setServingSize] = useState(
    foodToAdd?.serving_size_g || 1
  );
  const [servings, setServings] = useState(foodToAdd?.servings || 1);

  function closeForm() {
    setShowForm(false);
    setFoodToAdd(null);
  }

  function closeModal() {
    dispatch(closeFoodModal());
    closeForm();
  }

  function updatePropHandler(e: SyntheticEvent) {
    const element = e.target as HTMLInputElement;
    const name = element.name;
    const value = element.value;
    const newFood = {
      ...(food as Food),
      [name]: value,
    };
    setFood(newFood);
    setCachedFood(newFood);
  }

  async function submitFormHandler(e: SyntheticEvent) {
    e.preventDefault();
    if (!food) return;
    let { order_id, ...foodToAddClean } = food;
    try {
      const { data, error } = await supabase
        .from("food")
        .insert([foodToAddClean])
        .select()
        .single();

      if (error) throw Error(error.message);

      const { data: historyData, error: historyError } = await supabase
        .from("food_history")
        .insert([foodToAddClean]);
      if (historyError) throw Error(historyError.message);
      dispatch(addFood(data as Food));
      dispatch(closeFoodModal());
      setShowForm(false);
      setFoodToAdd(null);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!cachedFood) return;

    let multiplier = isNaN(servingSize / cachedFood.serving_size_g)
      ? 1
      : servingSize / cachedFood.serving_size_g;

    let protein = formatFloat(cachedFood?.protein * multiplier);
    let fats = formatFloat(cachedFood?.fats * multiplier);
    let carbs = formatFloat(cachedFood?.carbs * multiplier);
    let calories = formatFloat(cachedFood?.calories * multiplier);

    const newFood: Food = {
      ...(food as Food),
      protein,
      fats,
      carbs,
      calories,
      serving_size_g: servingSize,
      servings,
    };

    setFood(newFood);
  }, [servingSize, servings]);

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      className="h-full w-full p-5 pb-0 flex flex-col"
    >
      <div className="text-center font-bold text-lg text-gray-800 uppercase">
        Add food
      </div>
      <form onSubmit={submitFormHandler} className="flex-1 flex flex-col">
        <div className="mb-3">
          <label className="text-gray-700 font-bold capitalize" htmlFor="name">
            Name
          </label>
          <Input
            required
            type="text"
            value={food?.name}
            name="name"
            id="name"
            onChange={updatePropHandler}
          />
        </div>
        <div className="mb-3">
          <label
            className="text-gray-700 font-bold capitalize"
            htmlFor="protein"
          >
            protein
          </label>
          <Input
            required
            rightIcon={
              <span className="italic text-gray-700 font-bold">g</span>
            }
            type="number"
            value={food?.protein}
            name="protein"
            id="protein"
            onChange={updatePropHandler}
          />
        </div>
        <div className="mb-3">
          <label className="text-gray-700 font-bold capitalize" htmlFor="carbs">
            carbs
          </label>
          <Input
            rightIcon={
              <span className="italic text-gray-700 font-bold">g</span>
            }
            type="number"
            value={food?.carbs}
            name="carbs"
            id="carbs"
            onChange={updatePropHandler}
          />
        </div>
        <div className="mb-3">
          <label className="text-gray-700 font-bold capitalize" htmlFor="fats">
            fats
          </label>
          <Input
            required
            rightIcon={
              <span className="italic text-gray-700 font-bold">g</span>
            }
            type="number"
            value={food?.fats}
            name="fats"
            id="fats"
            onChange={updatePropHandler}
          />
        </div>
        <div className="mb-3">
          <label className="text-gray-700 font-bold capitalize" htmlFor="fats">
            calories
          </label>
          <Input
            required
            rightIcon={
              <span className="italic text-gray-700 font-bold">g</span>
            }
            type="number"
            value={food?.calories}
            name="calories"
            id="calories"
            onChange={updatePropHandler}
          />
        </div>
        <div className="mb-3">
          <label
            className="text-gray-700 font-bold capitalize"
            htmlFor="serving_size_g"
          >
            serving size
          </label>
          <Input
            required
            rightIcon={
              <span className="italic text-gray-700 font-bold">g</span>
            }
            type="number"
            value={servingSize}
            name="serving_size_g"
            id="serving_size_g"
            onChange={(e: SyntheticEvent) => {
              const input = e.target as HTMLInputElement;
              setServingSize(parseInt(input.value));
            }}
          />
        </div>
        <div className="mb-3">
          <label
            className="text-gray-700 font-bold capitalize"
            htmlFor="servings"
          >
            servings
          </label>
          <Input
            required
            type="number"
            value={food?.servings}
            name="servings"
            id="servings"
            onChange={updatePropHandler}
          />
        </div>
        <button
          type="submit"
          className="h-10 px-4 bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600 rounded-xl text-white font-bold"
        >
          ADD
        </button>
        <div className="flex-1"></div>
        <div className="flex items-center py-4 justify-center space-x-2">
          <button
            onClick={closeForm}
            type="button"
            className="flex items-center justify-center h-10 px-4 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl text-gray-800 font-bold uppercase"
          >
            <FaChevronLeft />
            <span className="ml-2">Back to search</span>
          </button>
          <button
            onClick={closeModal}
            type="button"
            className="flex items-center justify-center h-10 px-4 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl text-gray-800 font-bold uppercase"
          >
            cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

function formatFloat(n: number): number {
  return parseFloat(n.toFixed(1));
}
