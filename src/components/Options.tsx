import { FC } from "react"
import { Action, QuestionType } from "./App"

export const Options: FC<{question: QuestionType, dispatch: React.Dispatch<Action>, answer: number | null}> = ({question, dispatch, answer}) => {
  const hasAnswer = answer !== null;

  const answerClass = (index: number) => {
    if (!hasAnswer) return "";
    return index === question.correctOption ? "correct" : "wrong";
  };

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${answerClass(index)}`}
          disabled={hasAnswer}
          onClick={() => dispatch({ type: "newAnswer", payload: {answer: index} })}
        >
          {option}
        </button>)
      )}
    </div>
  )
}
