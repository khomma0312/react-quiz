import { FC } from "react";
import { Action } from "./App";

type FinishScreenProps = {
  points: number;
  maxPossiblePoints: number;
  highscore: number;
  dispatch: React.Dispatch<Action>;
};

export const FinishScreen: FC<FinishScreenProps> = ({points, maxPossiblePoints, highscore, dispatch}) => {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 0) emoji = "😮‍💨";
  if (percentage > 0) emoji = "🤨";
  if (percentage >= 50) emoji = "🥉";
  if (percentage >= 80) emoji = "🥈";
  if (percentage === 100) emoji = "🥇";

  return (
    <>
      <p className="result">{emoji} You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)</p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button className="btn btn-ui" onClick={() => dispatch({type: "restart"})}>
        Restart quiz
      </button>
    </>
  )
};