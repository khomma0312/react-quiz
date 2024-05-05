import { FC } from "react";
import { Action } from "./App";

export const StartScreen: FC<{numQuestions: number, dispatch: React.Dispatch<Action>}> = ({numQuestions, dispatch}) => {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={() => dispatch({type: "start"})}>Let's start</button>
    </div>
  )
};