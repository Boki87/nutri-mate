import { DatePickerWrapper } from "../components/DatePickerWrapper";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { FoodCard, FoodCardLoadingSkeleton } from "../components/FoodCard";
import { openConfirm } from "../features/modals/modalsSlice";
import { supabase } from "../api/supabaseClient";
import { deleteFood } from "../features/data/dataSlice";
import { openFoodModal } from "../features/modals/modalsSlice";
import { NewFoodButton } from "../components/NewFoodButton";

export const FoodCategoryPage = () => {
  const dispatch = useAppDispatch();
  const { categoryId } = useParams();
  const { foods, categories, loadingFoods } = useAppSelector(
    (state) => state.data
  );

  if (!categoryId) {
    return <div>404 Not found</div>;
  }

  const category = categories.filter((c) => c.id === parseInt(categoryId))[0];

  const foodsForCategory = foods.filter(
    (food) => food.meal_category_id === parseInt(categoryId)
  );

  function foodDeleteHandler(id: string) {
    const fn = () => {
      deleteFoodOnConfirm(id);
    };

    dispatch(
      openConfirm({
        confirmMessage: "Are you sure you want to delete this food?",
        isConfirmOpen: true,
        onConfirm: fn,
      })
    );
  }

  async function deleteFoodOnConfirm(id: string) {
    const { error } = await supabase.from("food").delete().eq("id", id);
    if (error) return;
    dispatch(deleteFood(id));
  }

  return (
    <DatePickerWrapper>
      <div className="p-5 flex flex-col h-full flex-1">
        <div className="flex items-center justify-center relative mb-5">
          <Link to="/food" className="absolute left-0 top-0 h-full">
            <button className="cursor-pointer h-full">
              <FaChevronLeft />
            </button>
          </Link>
          <span className="text-xl font-bold text-gray-700 capitalize">
            {category.name}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loadingFoods ? (
            <>
              <FoodCardLoadingSkeleton />
              <FoodCardLoadingSkeleton />
              <FoodCardLoadingSkeleton />
            </>
          ) : (
            foodsForCategory.map((food) => (
              <FoodCard
                foodData={food}
                onDelete={foodDeleteHandler}
                key={food.id}
              />
            ))
          )}

          {!loadingFoods && foodsForCategory.length === 0 && (
            <p className="text-center text-gray-400 mt-4 font-bold">
              No foods added
            </p>
          )}
        </div>
      </div>
      {/* <button
        onClick={() => dispatch(openFoodModal(parseInt(categoryId)))}
        className="absolute bottom-14 right-4 rounded-full w-14 h-14 bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 active:bg-emerald-700"
      >
        <FaPlus />
      </button> */}
      <NewFoodButton className="absolute bottom-14 right-4" />
    </DatePickerWrapper>
  );
};
