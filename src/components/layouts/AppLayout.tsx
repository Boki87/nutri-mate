import { ReactElement, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { loginUser, logout } from "../../features/user/userSlice";
import { setFoods, setLoadingFoods } from "../../features/data/dataSlice";
import { Login } from "../../views/Login";
import { supabase } from "../../api/supabaseClient";
import { AppNav } from "../AppNav";
import { formatDateForQuery } from "../../utils";

export const AppLayout = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { user, data } = useAppSelector((state) => state);

  async function fetchData(userId: string, date: number | string) {
    dispatch(setLoadingFoods(true));

    const formatedDate = formatDateForQuery(date);
    //@ts-ignore
    const { data, error }: PostgrestSingleResponse<Food[]> = await supabase
      .from("food")
      .select("*")
      .match({
        user_id: userId,
        created_at: formatedDate,
      })
      .is("meal_id", null);

    if (!error) {
      dispatch(setFoods(data));
    }
    dispatch(setLoadingFoods(false));
  }

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
          // User is signed in
          if (session?.user?.email) {
            dispatch(
              loginUser({ email: session.user.email, id: session.user.id })
            );
          }
        } else if (event === "SIGNED_OUT") {
          // User is signed out
          dispatch(logout());
        }
      }
    );
  }, []);

  useEffect(() => {
    if (user.user) {
      fetchData(user.user.id, data.selectedDate);
    }
  }, [data.selectedDate, user.user]);

  if (!user.user) {
    return <Login />;
  }
  return (
    <div className="w-full h-full overflow-hidden relative">
      <div className="w-full h-full overflow-y-auto flex flex-col pb-9">
        <Outlet />
      </div>
      <AppNav />
    </div>
  );
};
