import { Router } from "./Router";
import { AppShellLayout } from "./components/layouts/AppShellLayout";
import { ConfirmBox } from "./components/ConfirmBox";
import { FoodModal } from "./components/foodModal/FoodModal";

function App() {
  return (
    <AppShellLayout>
      <Router />
      <ConfirmBox />
      <FoodModal />
    </AppShellLayout>
  );
}

export default App;
