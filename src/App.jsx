import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { DUMMY_DATA } from '@/data/dummyData';
import { randomNumber } from './lib/utils';

export default function App() {
  const [quizInfo, setQuizInfo] = useState({
    questionNumber: randomNumber(0, DUMMY_DATA.length),
    questionCounter: 1,
    score: 0,
    selectedAnswer: null,
    isAnswerSubmitted: false,
  });

  const {
    questionNumber,
    questionCounter,
    score,
    selectedAnswer,
    isAnswerSubmitted,
  } = quizInfo;

  const handleSelectAnswer = (index) => {
    if (isAnswerSubmitted) return;
    setQuizInfo({ ...quizInfo, selectedAnswer: index });
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer && !isAnswerSubmitted) {
      setQuizInfo({ ...quizInfo, isAnswerSubmitted: true });
      if (selectedAnswer === DUMMY_DATA[questionNumber].answer) {
        setQuizInfo({ ...quizInfo, score: score + 1, isAnswerSubmitted: true });
      }
      return;
    }

    const randomIndex = randomNumber(questionNumber, DUMMY_DATA.length);

    setQuizInfo({
      ...quizInfo,
      questionNumber: randomIndex,
      selectedAnswer: null,
      isAnswerSubmitted: false,
      questionCounter: questionCounter + 1,
    });
  };

  return (
    <main className=' min-h-screen bg-slate-900 flex justify-center items-center'>
      <Card className='max-w-xl w-full'>
        {questionCounter < 11 ? (
          <>
            <CardHeader>
              <CardTitle className='text-blue-500'>
                Question #{questionCounter}
              </CardTitle>
              <CardDescription className='text-xl text-slate-700 font-semibold'>
                {DUMMY_DATA[questionNumber].question}
              </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-8'>
              {DUMMY_DATA[questionNumber].options.map((option, index) => (
                <Button
                  key={index}
                  variant='outline'
                  size='lg'
                  className={`w-full text-xl py-8 border-slate-500 hover:bg-blue-300 justify-start text-wrap text-left ${
                    selectedAnswer === index + 1 ? 'bg-blue-300' : ''
                  } ${
                    isAnswerSubmitted &&
                    DUMMY_DATA[questionNumber].answer - 1 === index
                      ? 'bg-green-300'
                      : isAnswerSubmitted && selectedAnswer === index + 1
                      ? 'bg-red-400'
                      : ''
                  }  `}
                  onClick={() => handleSelectAnswer(index + 1)}
                >
                  {option}
                </Button>
              ))}
            </CardContent>
            <CardFooter className='flex justify-between'>
              <p className='text-2xl font-medium'>
                {score}/{DUMMY_DATA.slice(0, 10).length}
              </p>
              <Button
                disabled={selectedAnswer === null}
                size='lg'
                className='w-auto text-xl py-8 bg-blue-500 hover:bg-blue-700'
                onClick={handleSubmitAnswer}
              >
                {selectedAnswer && isAnswerSubmitted
                  ? 'Next Question'
                  : ' Submit Answer'}
              </Button>
            </CardFooter>
          </>
        ) : (
          <CardHeader className='text-center py-10 gap-4'>
            <CardTitle className='text-blue-500 text-3xl font-bold'>
              Your Scores:
              <CardDescription className='text-3xl text-slate-700 font-semibold'>
                {score}/{DUMMY_DATA.slice(0, 10).length}
              </CardDescription>
            </CardTitle>
            <Button
              size='lg'
              className='w-auto text-xl py-8 bg-blue-500 hover:bg-blue-700'
              onClick={() => window.location.reload()}
            >
              Reset Quiz
            </Button>
          </CardHeader>
        )}
      </Card>
    </main>
  );
}
