import { FC, useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

export const Timer: FC = () => {
  const {secondsRemaining, dispatch} = useQuiz();

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