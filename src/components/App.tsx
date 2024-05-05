import { useEffect } from 'react';
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
import { useQuiz } from '../contexts/QuizContext';

function App() {
  const { status, dispatch } = useQuiz();
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
        {status === 'ready' && <StartScreen />}
        {status === 'active' && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === 'finished' && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
