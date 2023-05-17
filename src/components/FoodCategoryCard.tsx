import { FaChevronRight } from "react-icons/fa";

interface IFoodCategoryCard {
  label: string;
  calories: number;
  fats: number;
  carbs: number;
  protein: number;
  [x: string]: any;
}

export const FoodCategoryCard = ({
  label,
  fats,
  carbs,
  protein,
  calories,
  ...rest
}: IFoodCategoryCard) => {
  return (
    <div
      className={joinClassNames("w-full rounded-xl p-3 mb-2", rest.className)}
    >
      <div className="flex items-center gap-2">
        <span className="capitalize text-lg text-gray-600 font-bold">
          {label}
        </span>
        <span className="text-gray-400">{calories} kcal</span>
        <div className="flex-1"></div>
        <FaChevronRight className="text-gray-500" />
      </div>
      {calories > 0 && (
        <div className="flex gap-2 mt-2">
          <div>
            <span className="text-sm text-gray-600 font-bold mr-1">
              Proteins
            </span>
            <span className="text-gray-400 text-sm">{protein} g</span>
          </div>
          <div>
            <span className="text-sm text-gray-600 font-bold mr-1">Carbs</span>
            <span className="text-gray-400 text-sm">{carbs} g</span>
          </div>
          <div>
            <span className="text-sm text-gray-600 font-bold mr-1">Fats</span>
            <span className="text-gray-400 text-sm">{fats} g</span>
          </div>
        </div>
      )}
    </div>
  );
};

function joinClassNames(...args: string[]): string {
  return args.join(" ");
}
