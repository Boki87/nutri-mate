import { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseClient";
import { useAppSelector } from "../../app/hooks";
import { Input } from "../shared/Input";
import { FaSearch } from "react-icons/fa";
import { Meal } from "../../types/Meal";
import { MealCard } from "./MealCard";

interface IMealSection {
  mode?: "component" | "modal";
}

export const MealsSection = ({ mode = "component" }: IMealSection) => {
  const { user } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);

  async function fetchMeals() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("meal")
      .select(
        `
        *,
         food (*)
      `
      )
      .match({ user_id: user?.id });
    setIsLoading(false);
    if (error) return;
    setMeals(data as Meal[]);
    console.log(data);
  }

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <Input type="search" leftIcon={<FaSearch />} />

      <div className="flex-1 space-y-2 mt-4">
        {meals.map((meal) => (
          <MealCard mealData={meal} key={meal.id} />
        ))}
      </div>
    </div>
  );
};
