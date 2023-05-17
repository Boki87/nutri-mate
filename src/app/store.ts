import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import dataReducer from "../features/data/dataSlice";
import modalsReducer from "../features/modals/modalsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    data: dataReducer,
    modals: modalsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.onConfirm"],
        ignoredPaths: ["modals.onConfirm"],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
