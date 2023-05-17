import { Food } from "../types/Food";

interface NinjaNutritionRes {
  calories: number;
  carbohydrates_total_g: number;
  cholesterol_mg: number;
  fat_saturated_g: number;
  fat_total_g: number;
  fiber_g: number;
  name: string;
  potassium_mg: number;
  protein_g: number;
  serving_size_g: number;
  sodium_mg: number;
  sugar_g: number;
}

export async function nutritionApiCall(query: string): Promise<Food[]> {
  let res = await fetch(
    `https://api.api-ninjas.com/v1/nutrition?query=${query}`,
    {
      headers: {
        "X-Api-Key": "hPUGz/+cOOj/vF1C9vmhLw==FlDgTzsdDWb2WhYk",
      },
    }
  );
  let data: NinjaNutritionRes[] = await res.json();

  return data.map((food: NinjaNutritionRes) => {
    return {
      name: food.name,
      fats: food.fat_total_g,
      carbs: food.carbohydrates_total_g,
      protein: food.protein_g,
      serving_size_g: food.serving_size_g,
      servings: 1,
      calories: food.calories,
    };
  });
}
