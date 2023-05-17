import { DatePickerWrapper } from "../components/DatePickerWrapper";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { getMacrosForCategory } from "../features/data/dataSlice";
import { FoodCategoryCard } from "../components/FoodCategoryCard";

export const FoodPage = () => {
  const { categories, foods, loadingFoods } = useAppSelector(
    (state) => state.data
  );

  return (
    <DatePickerWrapper>
      <div className="p-5">
        {loadingFoods && (
          <>
            <LoadingSkeletonLg />
            <LoadingSkeletonLg />
            <LoadingSkeletonSm />
            <LoadingSkeletonSm />
          </>
        )}
        {!loadingFoods &&
          categories.map((cat) => {
            let macros = getMacrosForCategory(foods, cat.id);

            const bgs: { [key: string]: string } = {
              breakfast: "bg-emerald-50",
              lunch: "bg-blue-50",
              dinner: "bg-purple-50",
              snack: "bg-pink-50",
            };
            return (
              <Link to={`${cat.id}`} key={cat.name}>
                <FoodCategoryCard
                  label={cat.name}
                  calories={macros.calories}
                  fats={macros.fats}
                  carbs={macros.carbs}
                  protein={macros.protein}
                  className={bgs[cat.name]}
                />
              </Link>
            );
          })}
      </div>
    </DatePickerWrapper>
  );
};

const LoadingSkeletonLg = () => {
  return (
    <div className="w-full h-16 bg-slate-50 flex flex-col justify-between p-3 rounded-xl mb-1 animate-pulse">
      <div className="h-2 bg-slate-300 rounded"></div>
      <div className="flex justify-between gap-2">
        <div className="h-2 flex-1 bg-slate-300 rounded"></div>
        <div className="h-2 flex-1 bg-slate-300 rounded"></div>
        <div className="h-2 flex-1 bg-slate-300 rounded"></div>
      </div>
    </div>
  );
};
const LoadingSkeletonSm = () => {
  return (
    <div className="w-full h-12 bg-slate-50 flex flex-col justify-center p-3 rounded-xl mb-1 animate-pulse">
      <div className="h-2 bg-slate-300 rounded"></div>
    </div>
  );
};
