import { FC } from "react"
import { Action, QuestionType } from "./App"

type NextButtonProps = {
  dispatch: React.Dispatch<Action>;
  answer: number | null;
  index: number;
  numQuestions: number;
};

export const NextButton: FC<NextButtonProps> = ({dispatch, answer, index, numQuestions}) => {
  if (answer === null) return null;

  if (index === numQuestions - 1) return (
    <button className="btn btn-ui" onClick={() => dispatch({type: "finish"})}>
      Finish
    </button>
  );

  return (
    <button className="btn btn-ui" onClick={() => dispatch({type: "nextQuestion"})}>
      Next
    </button>
  )
}