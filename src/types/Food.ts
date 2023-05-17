export type Food = {
  id?: string;
  name: string;
  fats: number;
  carbs: number;
  protein: number;
  serving_size_g: number;
  servings: number;
  calories: number;
  meal_id?: string;
  meal_category_id?: number;
  user_id?: string;
  created_at?: string;
  order_id?: number;
};
