import { FC } from "react";
import { useQuiz } from "../contexts/QuizContext";

export const NextButton: FC = () => {
  const {numQuestions, index, dispatch, answer} = useQuiz();

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