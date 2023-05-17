import { supabase } from "../api/supabaseClient";
import { Progress } from "../components/shared/Progress";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  setFoods,
  totalCalories,
  totalCarbs,
  totalFats,
  totalProtein,
} from "../features/data/dataSlice";
import { Food } from "../types/Food";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { MacroCounter } from "../components/MacroCounter";
import { AnimatedCounter } from "../components/shared/AnimatedCounter";
import { DatePickerWrapper } from "../components/DatePickerWrapper";

export const Home = () => {
  const { loadingFoods } = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();
  const calories = useAppSelector(totalCalories);
  const fats = useAppSelector(totalFats);
  const carbs = useAppSelector(totalCarbs);
  const protein = useAppSelector(totalProtein);
  let totalMacros = fats + carbs + protein;

  async function fetchData(userId: string, date: number | string) {
    //@ts-ignore
    const { data, error }: PostgrestSingleResponse<Food[]> = await supabase
      .from("food")
      .select("*")
      .match({
        user_id: userId,
        created_at: new Date(date).toISOString().split("T")[0],
      })
      .is("meal_id", null);

    if (!error) {
      dispatch(setFoods(data));
    }
  }

  if (loadingFoods) {
    return <HomeLoader />;
  }

  return (
    <DatePickerWrapper>
      <div className="p-5">
        <div className="w-full rounded-xl bg-emerald-100 p-4 mb-3">
          <span className="text-lg font-bold text-gray-700">
            Consumed today
          </span>
          <p className="text-sm text-gray-500 mb-2">
            <AnimatedCounter targetNumber={Math.round(calories)} speed={0.3} />{" "}
            / 2500 kcal
          </p>
          <Progress value={calories} max={2500} />
        </div>
        <div className="flex justify-between space-x-5 my-5">
          <MacroCounter
            serving_size={protein}
            total_macros={totalMacros}
            label="protein"
            delay={0.1}
          />
          <MacroCounter
            serving_size={fats}
            total_macros={totalMacros}
            variant="orange"
            label="fats"
            delay={0.3}
          />
          <MacroCounter
            serving_size={carbs}
            total_macros={totalMacros}
            variant="blue"
            label="carbs"
            delay={0.4}
          />
        </div>
        <p className="text-lg font-bold text-gray-800">Recent meal</p>
      </div>
    </DatePickerWrapper>
  );
};

const HomeLoader = () => {
  return (
    <DatePickerWrapper>
      <div className="p-5">
        <div className="animate-pulse h-24 w-full rounded-xl bg-slate-100 p-4 mb-3 flex flex-col justify-between">
          <div className="h-2 rounded w-full bg-slate-300 mb-2"></div>
          <div className="h-4 rounded w-16 bg-slate-300 mb-2"></div>
          <div className="h-2 rounded w-full bg-slate-300 mb-2"></div>
        </div>

        <div className="flex space-x-5 my-5">
          <div className="h-[160px] sm:h-[220px] w-full rounded-xl relative overflow-hidden bg-slate-200 animate-pulse"></div>
          <div className="h-[160px] sm:h-[220px] w-full rounded-xl relative overflow-hidden bg-slate-200 animate-pulse"></div>
          <div className="h-[160px] sm:h-[220px] w-full rounded-xl relative overflow-hidden bg-slate-200 animate-pulse"></div>
        </div>
      </div>
    </DatePickerWrapper>
  );
};
