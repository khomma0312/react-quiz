import { FC, useEffect } from "react";
import { Action } from "./App";

type TimerState = {
  dispatch: React.Dispatch<Action>;
  secondsRemaining: number;
};

export const Timer: FC<TimerState> = ({dispatch, secondsRemaining}) => {
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({type: "tick"});
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:
      {secs < 10 && "0"}
      {secs}
    </div>
  )
};