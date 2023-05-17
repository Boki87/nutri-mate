import { FaTimes } from "react-icons/fa";
import { Food } from "../types/Food";
import { SyntheticEvent } from "react";

interface IFoodCard {
  foodData: Food;
  onDelete?: (id: string) => void;
  [x: string]: any;
}

export const FoodCard = ({ foodData, onDelete, ...rest }: IFoodCard) => {
  function servingsMultiplier(val: number, multiplier: number): number {
    return val * multiplier;
  }

  return (
    <div className="w-full p-3 bg-slate-100 rounded-xl mb-3" {...rest}>
      <div className="mb-1 flex justify-between items-center">
        <span className="font-bold text-gray-700">{foodData.name}</span>
        {onDelete && (
          <button
            className="text-gray-500"
            onClick={(e: SyntheticEvent) => {
              e.stopPropagation();
              foodData.id && onDelete(foodData.id);
            }}
          >
            <FaTimes />
          </button>
        )}
      </div>
      <div className="flex gap-3">
        <span className="text-gray-500">
          {servingsMultiplier(foodData.serving_size_g, foodData.servings)} g/
          {servingsMultiplier(foodData.calories, foodData.servings)} kcal
        </span>
        <div className="flex-1"></div>
        <div>
          <span className="font-bold text-gray-700 mr-1">P</span>
          <span className="text-gray-500">
            {servingsMultiplier(foodData.protein, foodData.servings)}g
          </span>
        </div>
        <div>
          <span className="font-bold text-gray-700 mr-1">F</span>
          <span className="text-gray-500">
            {servingsMultiplier(foodData.fats, foodData.servings)}g
          </span>
        </div>
        <div>
          <span className="font-bold text-gray-700 mr-1">C</span>
          <span className="text-gray-500">
            {servingsMultiplier(foodData.carbs, foodData.servings)}g
          </span>
        </div>
      </div>
    </div>
  );
};

export const FoodCardLoadingSkeleton = () => {
  return (
    <div className="w-full h-16 bg-slate-100 flex flex-col justify-between p-3 rounded-xl mb-3 animate-pulse">
      <div className="h-2 bg-slate-300 rounded"></div>
      <div className="flex justify-between gap-2">
        <div className="h-2 flex-1 bg-slate-300 rounded"></div>
        <div className="h-2 flex-1 bg-slate-300 rounded"></div>
        <div className="h-2 flex-1 bg-slate-300 rounded"></div>
      </div>
    </div>
  );
};
