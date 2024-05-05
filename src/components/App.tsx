import { useEffect, useReducer } from 'react';
import '../App.css';
import Header from './Header';
import { Main } from './Main';
import Loader from './Loader';
import ErrorComponent from './Error';
import { StartScreen } from './StartScreen';
import { Question } from './Questions';
import { NextButton } from './NextButton';
import { Progress } from './Progress';
import { FinishScreen } from './FinishScreen';
import { Footer } from './Footer';
import { Timer } from './Timer';

export type QuestionType = {
  correctOption: number;
  question: string;
  options: string[];
  points: number;
};

export type State = {
  questions: QuestionType[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number;
};

export type Action = {
  type: 'dataReceived' | 'dataFailed' | 'start' | 'newAnswer' | 'nextQuestion' | "finish" | "restart" | "tick";
  payload?: {
    questions?: QuestionType[],
    answer?: number | null
  };
};

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
} as State;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload?.questions ? action.payload.questions : [],
        status: "ready"
      }
    case "dataFailed":
      return {
        ...state,
        status: "error"
      }
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      }
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload?.answer !== undefined ? action.payload?.answer : null,
        points: question && action.payload?.answer === question.correctOption ? state.points + question.points : state.points
      }
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }
    case "finish":
      const highscore = state.points > state.highscore ? state.points : state.highscore;

      return {
        ...state,
        status: "finished",
        highscore: highscore,
      }
    case "restart":
      return {
        ...state,
        status: 'ready',
        index: 0,
        answer: null,
        points: 0,
        secondsRemaining: 10,
      }
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status
      }
    default:
      throw new Error("Invalid action type");
  }
};

function App() {
  const [{questions, status, index, answer, points, highscore, secondsRemaining}, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, question) => acc + question.points, 0);

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then(response => response.json())
      .then(questions => dispatch({ type: 'dataReceived', payload: {questions} }))
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorComponent />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && (
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
            </Footer>
          </>
        )}
        {status === 'finished' && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} dispatch={dispatch} />}
      </Main>
    </div>
  );
}

export default App;
