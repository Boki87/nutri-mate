import { FaSearch } from "react-icons/fa";
import { useFoodModalContext } from "./FoodModal";
import { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseClient";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { closeFoodModal, openConfirm } from "../../features/modals/modalsSlice";
import { formatDateForQuery } from "../../utils";
import { Food } from "../../types/Food";
import { FoodCard, FoodCardLoadingSkeleton } from "../FoodCard";
import { useDebounceEffect } from "../../hooks/useDebounceEffect";
import { nutritionApiCall } from "../../utils/api";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { motion } from "framer-motion";
import { Button } from "../shared/Button";

export const FoodModalSearch = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { selectedDate } = useAppSelector((state) => state.data);
  const { foodModalParentId } = useAppSelector((state) => state.modals);
  const { setFoodToAdd, setShowForm, showForm } = useFoodModalContext();

  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState<Food[]>([]);
  const [searchResHistory, setSearchResHistory] = useState<Food[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [historyResults, setHistoryResults] = useState<Food[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  async function fetchHistory() {
    setLoadingHistory(true);
    const { data, error } = await supabase
      .from("food_history")
      .select()
      .match({
        user_id: user?.id,
      })
      .is("meal_id", null)
      .order("order_id", { ascending: false })
      .limit(10);

    setLoadingHistory(false);
    if (error) return;
    setHistoryResults(data as Food[]);
  }

  async function deleteFoodFromDb(id: string) {
    const { error } = await supabase.from("food_history").delete().eq("id", id);
    if (error) return;
    setHistoryResults((old) => {
      return old.filter((f) => f.id !== id);
    });
  }

  async function deleteFoodHandler(id: string) {
    function fn() {
      deleteFoodFromDb(id);
    }

    dispatch(
      openConfirm({
        isConfirmOpen: true,
        confirmMessage: "Sure you want to delete this food from your history?",
        onConfirm: fn,
      })
    );
  }

  function addFood(food: Food) {
    let foodCategoryObject = {};
    if (typeof foodModalParentId === "number") {
      foodCategoryObject = {
        meal_category_id: foodModalParentId,
      };
    } else {
      foodCategoryObject = {
        meal_id: foodModalParentId,
      };
    }
    let { id, ...foodClean } = food;
    setFoodToAdd({
      ...foodClean,
      ...foodCategoryObject,
      user_id: user?.id,
      created_at: formatDateForQuery(selectedDate),
    });
    setShowForm(true);
  }

  function addCustomFood() {
    const customFood = {
      name: "change me",
      fats: 1,
      carbs: 1,
      protein: 1,
      serving_size_g: 100,
      servings: 1,
      calories: 1,
    };

    addFood(customFood);
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (search !== "") {
      setLoadingSearch(true);
    } else {
      setLoadingSearch(false);
    }
  }, [search]);

  useDebounceEffect(
    async () => {
      if (search === "") return;
      setLoadingSearch(true);
      try {
        const res = await nutritionApiCall(search);
        const { data, error } = await supabase
          .from("food_history")
          .select()
          .textSearch("name", `${search}`);
        if (error) throw Error(error.message);
        //@ts-ignore
        setSearchResHistory(data);
        setSearchRes(res);
        setLoadingSearch(false);
      } catch (e) {
        console.log(e);
        setLoadingSearch(false);
      }
    },
    1000,
    [search]
  );

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      className="h-full w-full p-5 pb-0 flex flex-col"
    >
      <div className="w-full h-10 rounded overflow-hidden relative bg-gray-50 border border-gray-200">
        <label
          htmlFor="foodSearch"
          className="absolute top-0 left-0 h-full flex items-center justify-center w-8"
        >
          {!loadingSearch ? (
            <FaSearch />
          ) : (
            <CgSpinnerTwoAlt className="animate-spin" />
          )}
        </label>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="foodSearch"
          type="search"
          className="w-full h-full px-2 pl-8 outline-none bg-transparent"
          placeholder="Search food"
        />
      </div>

      <div className="text-lg text-gray-700 font-bold my-3">
        {search === "" ? <span>History</span> : <span>Results</span>}
      </div>
      {search === "" && (
        <div className="flex-1 overflow-x-auto">
          {loadingHistory && (
            <>
              <FoodCardLoadingSkeleton />
              <FoodCardLoadingSkeleton />
              <FoodCardLoadingSkeleton />
            </>
          )}
          {!loadingHistory &&
            historyResults.map((food) => (
              <FoodCard
                onClick={() => addFood(food)}
                foodData={food}
                key={food.id}
                onDelete={deleteFoodHandler}
              />
            ))}
        </div>
      )}
      {search !== "" && (
        <div className="flex-1 overflow-x-auto">
          {loadingSearch && (
            <>
              <FoodCardLoadingSkeleton />
              <FoodCardLoadingSkeleton />
            </>
          )}
          {!loadingSearch &&
            searchRes.map((food) => (
              <FoodCard
                onClick={() => addFood(food)}
                foodData={food}
                key={food.id + "_search"}
              />
            ))}
          {searchResHistory.length > 0 ? <span>From History</span> : null}
          {!loadingSearch &&
            searchResHistory.map((food) => (
              <FoodCard
                onClick={() => addFood(food)}
                foodData={food}
                key={food.id + "_history"}
              />
            ))}
          {!loadingSearch &&
            searchRes.length === 0 &&
            searchResHistory.length === 0 && <span>No results found</span>}
        </div>
      )}
      <div className="flex space-x-2 items-center justify-center py-4">
        <button
          className="h-10 px-4 bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600 rounded-xl text-white font-bold"
          onClick={addCustomFood}
        >
          ADD CUSTOM 🍔
        </button>
        <button
          onClick={() => dispatch(closeFoodModal())}
          className="h-10 px-4 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl text-gray-800 font-bold"
        >
          CANCEL
        </button>
      </div>
    </motion.div>
  );
};
