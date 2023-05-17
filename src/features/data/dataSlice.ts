import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MealCategory } from "../../types/MealCategory";
import { Food } from "../../types/Food";
import { RootState } from "../../app/store";

import breakfastImage from "../../assets/breakfast.png";
import lunchImage from "../../assets/lunch.png";
import dinnerImage from "../../assets/dinner.png";
import snackImage from "../../assets/snack.png";

interface IDataState {
  selectedDate: number;
  categories: MealCategory[];
  foods: Food[];
  loadingFoods: boolean;
  datePickerWeekIndex: number;
}

const initialState: IDataState = {
  selectedDate: +new Date(),
  categories: [
    {
      id: 1,
      name: "breakfast",
      img: breakfastImage,
    },
    {
      id: 2,
      name: "lunch",
      img: lunchImage,
    },
    {
      id: 3,
      name: "dinner",
      img: dinnerImage,
    },
    {
      id: 4,
      name: "snack",
      img: snackImage,
    },
  ],
  foods: [],
  loadingFoods: false,
  datePickerWeekIndex: 0,
};

export const dataSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<number>) => {
      state.selectedDate = action.payload;
    },
    setFoods: (state, action: PayloadAction<Food[]>) => {
      state.foods = action.payload;
    },
    deleteFood: (state, action: PayloadAction<string>) => {
      state.foods = state.foods.filter((f) => f.id !== action.payload);
    },
    addFood: (state, action: PayloadAction<Food>) => {
      state.foods = [...state.foods, action.payload];
    },
    setLoadingFoods: (state, action: PayloadAction<boolean>) => {
      state.loadingFoods = action.payload;
    },
    setDatePickerWeekIndex: (state, action: PayloadAction<number>) => {
      state.datePickerWeekIndex = action.payload;
    },
  },
});

const foods = (state: RootState) => state.data.foods;

export const totalCalories = createSelector(foods, (foods) => {
  return foods.length
    ? foods.reduce((sum, food) => sum + food.calories || 0, 0)
    : 0;
});

export const totalCarbs = createSelector(foods, (foods) =>
  getMacrosSum(foods, "carbs")
);
export const totalFats = createSelector(foods, (foods) =>
  getMacrosSum(foods, "fats")
);
export const totalProtein = createSelector(foods, (foods) =>
  getMacrosSum(foods, "protein")
);

export const {
  setSelectedDate,
  setFoods,
  deleteFood,
  addFood,
  setLoadingFoods,
  setDatePickerWeekIndex,
} = dataSlice.actions;

export default dataSlice.reducer;

export function getMacrosSum(
  foods: Food[],
  prop: "carbs" | "fats" | "protein"
): number {
  return foods.length
    ? Math.round(foods.reduce((sum, food) => sum + food[prop] || 0, 0))
    : 0;
}

export function getMacrosForCategory(
  foods: Food[],
  catId: number
): { calories: number; fats: number; carbs: number; protein: number } {
  let foodsInCategory = foods.filter((food) => food.meal_category_id === catId);
  if (foodsInCategory.length === 0) {
    return {
      calories: 0,
      fats: 0,
      carbs: 0,
      protein: 0,
    };
  } else {
    let calories = 0;
    let carbs = 0;
    let fats = 0;
    let protein = 0;
    foodsInCategory.forEach((food) => {
      calories += food.calories;
      carbs += food.carbs;
      fats += food.fats;
      protein += food.protein;
    });

    function round(n: number) {
      return Math.round(n);
    }

    return {
      calories: round(calories),
      fats: round(fats),
      carbs: round(carbs),
      protein: round(protein),
    };
  }
}
