import { ReactElement, ReactNode } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";

interface IButton {
  children: ReactNode;
  loading?: boolean;
  [x: string]: any;
}

export const Button = ({
  children,
  loading,
  ...rest
}: IButton): ReactElement => {
  const { className, propsRest } = rest;
  return (
    <button
      className={joinCss(
        `w-full h-12 rounded-md bg-emerald-600 text-white flex items-center justify-center gap-4 text-xl hover:bg-emerald-500 active:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200`,
        rest.className
      )}
      disabled={loading ? true : false}
      {...propsRest}
    >
      {loading ? <CgSpinnerTwoAlt className="animate-spin" /> : children}
    </button>
  );
};

function joinCss(...args: string[]) {
  return args.join(" ");
}
