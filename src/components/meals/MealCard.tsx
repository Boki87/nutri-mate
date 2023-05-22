import { Meal } from "../../types/Meal";
import { MdOutlineFastfood } from "react-icons/md";

interface IMealCard {
  mealData: Meal;
}

export const MealCard = ({ mealData }: IMealCard) => {
  return (
    <div className="h-16 w-full rounded-lg flex overflow-hidden bg-gray-100">
      <div className="h-full min-w-[64px] flex items-center justify-center bg-slate-50">
        <MdOutlineFastfood />
      </div>
      <div className="flex-1 h-full flex flex-col p-2">
        <span className="text-sm text-gray-700">{mealData.name}</span>
        <p className="text-sm text-gray-500 mt-1 overflow-hidden text-ellipsis">
          {mealData.description}
        </p>
      </div>
      <div className="min-w-[40px] h-full bg-red-400">x</div>
    </div>
  );
};
