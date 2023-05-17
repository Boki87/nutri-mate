import { ReactNode, SyntheticEvent, useEffect, useRef, useState } from "react";

interface IInput {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  [x: string]: any;
}

export const Input = ({ leftIcon, rightIcon, ...rest }: IInput) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleFocus = () => {
      setIsFocused(true);
    };
    const handleBlur = () => {
      setIsFocused(false);
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("focus", handleFocus);
      inputElement.addEventListener("blur", handleBlur);
    }

    return () => {
      if (inputElement) {
        inputElement.addEventListener("focus", handleFocus);
        inputElement.addEventListener("blur", handleBlur);
      }
    };
  }, []);

  let focusedStyles = "border-gray-200";

  if (isFocused) {
    focusedStyles = "border-emerald-400";
  }

  let leftIconStyles = "";
  if (leftIcon) {
    leftIconStyles = "pl-12";
  }

  let rightIconStyles = "";
  if (rightIcon) {
    rightIconStyles = "pr-12";
  }

  return (
    <div
      className={combineCss(
        "w-full h-10 border rounded-lg overflow-hidden relative",
        focusedStyles,
        leftIconStyles,
        rightIconStyles
      )}
    >
      {leftIcon && (
        <div
          onClick={() => inputRef?.current?.focus()}
          className="w-10 h-full bg-gray-200 flex items-center justify-center absolute top-0 left-0"
        >
          {leftIcon}
        </div>
      )}

      {rightIcon && (
        <div
          onClick={() => inputRef?.current?.focus()}
          className="w-10 h-full bg-gray-200 flex items-center justify-center absolute top-0 right-0"
        >
          {rightIcon}
        </div>
      )}

      <input
        ref={inputRef}
        className="outline-none border-none w-full h-full px-2"
        type="text"
        {...rest}
      />
    </div>
  );
};

function combineCss(...args: string[]) {
  return args.join(" ");
}
