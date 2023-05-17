import { HeaderDatePicker } from "./HeaderDatePicker";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setDatePickerWeekIndex,
  setSelectedDate,
} from "../features/data/dataSlice";
import { ReactNode } from "react";

interface IDatePickerWrapper {
  children: ReactNode;
}

export const DatePickerWrapper = ({ children }: IDatePickerWrapper) => {
  const dispatch = useAppDispatch();
  const { selectedDate, datePickerWeekIndex } = useAppSelector(
    (state) => state.data
  );
  function handleDateChange(d: number) {
    dispatch(setSelectedDate(d));
  }
  return (
    <>
      <HeaderDatePicker
        selectedDate={selectedDate}
        onSelectedDateChange={handleDateChange}
        weekIndex={datePickerWeekIndex}
        weekIndexUpdate={(id: number) => {
          dispatch(setDatePickerWeekIndex(id));
        }}
      />
      {children}
    </>
  );
};
