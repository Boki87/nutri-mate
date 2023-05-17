import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Logo } from "./shared/Logo";
import { useEffect, useMemo, useState } from "react";
import {
  add,
  eachDayOfInterval,
  format,
  getDate,
  isFuture,
  isSameDay,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";

interface IHeaderDatePicker {
  selectedDate?: number;
  onSelectedDateChange?: (d: number) => void;
  weekIndex: number;
  weekIndexUpdate: (id: number) => void;
}

function generateWeekDays(d: Date): Array<Date> {
  const firstDay = startOfWeek(d, { weekStartsOn: 1 });
  const lastDay = add(firstDay, { days: 6 });

  let daysInWeek = eachDayOfInterval({
    start: firstDay,
    end: lastDay,
  });
  return daysInWeek;
}

function formatDay(d: Date): { dayOfMonth: number; dayOfWeek: string } {
  return {
    dayOfMonth: getDate(d),
    dayOfWeek: format(d, "EEE"),
  };
}

export const HeaderDatePicker = ({
  selectedDate = +new Date(),
  onSelectedDateChange,
  weekIndex,
  weekIndexUpdate,
}: IHeaderDatePicker) => {
  const selectedDateDate = new Date(selectedDate);
  const [ref, { width }] = useMeasure();
  const currentDate = new Date();
  const [days, setDays] = useState(() => {
    return generateWeekDays(selectedDateDate);
  });
  let previous = usePrevious<number>(weekIndex);
  let direction = previous ? (weekIndex > previous ? 1 : -1) : -1;

  function nextWeek() {
    if (weekIndex < 0) {
      weekIndexUpdate(weekIndex + 1);
    }
  }

  function prevWeek() {
    weekIndexUpdate(weekIndex - 1);
  }

  useEffect(() => {
    let newWeekDay = subWeeks(currentDate, Math.abs(weekIndex));
    setDays(() => generateWeekDays(newWeekDay));
  }, [weekIndex]);

  const selectedMonth = useMemo(() => {
    return `${format(selectedDate, "MMMM")} '${format(selectedDate, "yy")}`;
  }, [selectedDate]);

  return (
    <div className="mb-2 pt-5">
      {/* Header */}
      <div className="flex items-center justify-center p-2 relative h-10">
        <div className="absolute top-0 left-5 h-10 flex items-center">
          <Logo size="sm" />
        </div>
        <span className="text-xl font-bold text-gray-700">{selectedMonth}</span>
      </div>
      {/* Header END */}
      <div className="flex h-20 sm:px-4">
        <div
          onClick={prevWeek}
          className="h-full min-w-[25px] flex items-center justify-center text-gray-700 cursor-pointer"
        >
          <FaChevronLeft />
        </div>
        <div className="flex-1 h-full overflow-hidden relative" ref={ref}>
          <AnimatePresence custom={{ direction, width }}>
            <motion.div
              key={weekIndex}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
              custom={{ direction, width }}
              className="w-full h-full flex gap-1 absolute"
            >
              {days.map((day) => (
                <DatePickerDay
                  day={day}
                  selectedDay={selectedDateDate}
                  onClick={() => {
                    onSelectedDateChange && onSelectedDateChange(day.getTime());
                  }}
                  key={day.toString()}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <div
          onClick={nextWeek}
          className={`h-full min-w-[25px] flex items-center justify-center text-gray-700 ${
            weekIndex == 0
              ? "cursor-not-allowed text-gray-200"
              : "cursor-pointer"
          }`}
        >
          <FaChevronRight />
        </div>
      </div>
      <br />
    </div>
  );
};

interface IVariantsCustoms {
  direction: number;
  width: number;
}

let variants = {
  enter: ({ direction, width }: IVariantsCustoms) => ({ x: direction * width }),
  center: { x: 0 },
  exit: ({ direction, width }: IVariantsCustoms) => ({ x: direction * -width }),
};

function usePrevious<T>(state: T) {
  let [tuple, setTuple] = useState([null, state]);

  if (tuple[1] !== state) {
    setTuple([tuple[1], state]);
  }

  return tuple[0];
}

export const DatePickerDay = ({
  day,
  selectedDay,
  ...rest
}: {
  day: Date;
  selectedDay: Date;
  [x: string]: any;
}) => {
  let today = formatDay(day);
  let isSelected = isSameDay(day, selectedDay);
  const { dayOfMonth, dayOfWeek } = today;
  const isFutureDay = isFuture(day);
  return (
    <div
      className={`flex-1 flex flex-col items-center justify-center rounded-md cursor-pointer ${
        isSelected
          ? "bg-emerald-100 text-emerald-700"
          : "hover:bg-gray-50 active:bg-gray-100"
      } ${
        isFutureDay ? "pointer-events-none opacity-40" : "pointer-events-auto"
      }`}
      {...rest}
    >
      <span className="font-bold">{dayOfMonth}</span>
      <span
        className={`${
          isSelected ? "text-emerald-400" : "text-gray-400"
        } text-sm`}
      >
        {dayOfWeek}
      </span>
    </div>
  );
};
