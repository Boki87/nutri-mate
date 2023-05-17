import { Food } from "./Food";

export type Meal = {
  id: string;
  name: string;
  description?: string;
  foods?: Food[];
  meal_category_id: number;
  created_at: string;
};
