import { FC } from "react";
import { Action, QuestionType } from "./App";
import { Options } from "./Options";

export const Question: FC<{question: QuestionType, dispatch: React.Dispatch<Action>, answer: number | null}> = ({ question, dispatch, answer }) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  )
};