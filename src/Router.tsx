import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AppLayout } from "./components/layouts/AppLayout";
import { Home } from "./views/Home";
import { FoodPage } from "./views/FoodPage";
import { MealsPage } from "./views/MealsPage";
import { ProfilePage } from "./views/ProfilePage";
import { FoodCategoryPage } from "./views/FoodCategoryPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="food" element={<FoodPage />} />
      <Route path="food/:categoryId" element={<FoodCategoryPage />} />
      <Route path="meals" element={<MealsPage />} />
      <Route path="profile" element={<ProfilePage />} />
    </Route>
  )
);

export const Router = () => {
  return <RouterProvider router={router} />;
};
