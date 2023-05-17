import { supabase } from "./supabaseClient";

export const fetchFoods = async (userId: string, date: number | string) => {
  const { data, error } = await supabase
    .from("food")
    .select("*")
    .match({ user_id: userId, created_at: date });

  if (!error) {
    return data;
  }
  throw Error(error.message);
};
