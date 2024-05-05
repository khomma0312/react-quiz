import { FC, ReactNode, createContext, useContext, useReducer } from 'react'

const SECS_PER_QUESTION = 30;

type State = {
  questions: QuestionType[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number;
};

type Action = {
  type: 'dataReceived' | 'dataFailed' | 'start' | 'newAnswer' | 'nextQuestion' | "finish" | "restart" | "tick";
  payload?: {
    questions?: QuestionType[],
    answer?: number | null
  };
};

export type QuestionType = {
  correctOption: number;
  question: string;
  options: string[];
  points: number;
};

type QuizContextType = {
  questions: QuestionType[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number;
  numQuestions: number;
  maxPossiblePoints: number;
  dispatch: (action: Action) => void;
};

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
} as State;

const reducer = (state: State, action: Action): State => {
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

const QuizContext = createContext<QuizContextType | null>(null);
export const QuizContextProvider: FC<{children: ReactNode}> = ({children}) => {
  const [{questions, status, index, answer, points, highscore, secondsRemaining}, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, question) => acc + question.points, 0);

  return (
    <QuizContext.Provider value={{
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      numQuestions,
      maxPossiblePoints,
      dispatch,
    }}>
      {children}
    </QuizContext.Provider>
  )
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error('useQuiz must be used within a QuizContextProvider');
  }

  return context;
};
