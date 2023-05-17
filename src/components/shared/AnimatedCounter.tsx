import { useEffect, useState } from "react";

interface IAnimatedCounter {
  targetNumber: number;
  speed?: number;
}

export const AnimatedCounter = ({
  targetNumber,
  speed = 0.3,
}: IAnimatedCounter) => {
  const [counter, setCounter] = useState(0);

  let intervalSpeed = (speed / targetNumber) * 1000;
  let increment = 1;

  if (targetNumber > 100) {
    increment = 10;
    intervalSpeed = (speed / (targetNumber / 10)) * 1000;
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setCounter((old) => {
        const newCounter = old + increment;
        if (newCounter >= targetNumber) {
          clearInterval(interval);
          return targetNumber;
        }
        return newCounter;
      });
    }, intervalSpeed);
    return () => {
      clearInterval(interval);
    };
  }, [targetNumber, intervalSpeed]);

  return <>{counter}</>;
};
