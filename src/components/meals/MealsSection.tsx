import { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseClient";
import { useAppSelector } from "../../app/hooks";

export const MealsSection = () => {
  const { user } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

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
    console.log(data);
  }

  useEffect(() => {
    fetchMeals();
  }, []);

  return <div className="w-full h-full">Meals</div>;
};
