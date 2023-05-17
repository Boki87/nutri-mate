import apple from "../../assets/apple.png";

export const Logo = ({
  size = "md",
  ...rest
}: {
  size?: "sm" | "md" | "lg";
  [x: string]: any;
}) => {
  let textSize = "text-xl";
  let logoSize = 20;
  if (size === "sm") {
    textSize = "text-md";
    logoSize = 15;
  } else if (size === "lg") {
    textSize = "text-3xl";
    logoSize = 35;
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`${textSize} ${rest.className} text-gray-700 font-bold`}>
        NutriMate
      </span>
      <img
        src={apple}
        style={{ height: `${logoSize}px`, width: `${logoSize}px` }}
      />
    </div>
  );
};
