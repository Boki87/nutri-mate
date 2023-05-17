import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfirmBoxState {
  isConfirmOpen: boolean;
  confirmMessage: string;
  onConfirm: (...arg: any[]) => void;
}

interface FoodModalState {
  isFoodModalOpen: boolean;
  foodModalParentId: number | string; //if number is id of category ELSE is id of custom meal
}

type ModalsState = ConfirmBoxState & FoodModalState;

const initialState: ModalsState = {
  isConfirmOpen: false,
  confirmMessage: "",
  onConfirm: () => {},
  isFoodModalOpen: false,
  foodModalParentId: 1,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openConfirm: (state, action: PayloadAction<ConfirmBoxState>) => {
      state.isConfirmOpen = true;
      state.confirmMessage = action.payload.confirmMessage;
      state.onConfirm = action.payload.onConfirm;
    },
    closeConfirm: (state) => {
      state.isConfirmOpen = false;
      state.confirmMessage = "";
      state.onConfirm = () => {};
    },
    openFoodModal: (state, action: PayloadAction<number | string>) => {
      state.isFoodModalOpen = true;
      state.foodModalParentId = action.payload;
    },
    closeFoodModal: (state) => {
      state.isFoodModalOpen = false;
    },
  },
});

export const { openConfirm, closeConfirm, openFoodModal, closeFoodModal } =
  modalsSlice.actions;

export default modalsSlice.reducer;
