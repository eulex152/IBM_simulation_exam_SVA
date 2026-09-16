import { useState } from 'react'
import type { AnswerState, ExamPhase, SessionQuestion } from './types'
import { buildExamSession } from './utils/examSession'
import IntroScreen from './components/IntroScreen'
import ExamSession, { type ExamFinishPayload } from './components/ExamSession'
import ResultsScreen from './components/ResultsScreen'

interface ResultData {
  questions: SessionQuestion[]
  answers: AnswerState[]
  timeSpentSeconds: number
}

export default function App() {
  const [phase, setPhase] = useState<ExamPhase>('intro')
  const [sessionKey, setSessionKey] = useState(0)
  const [questions, setQuestions] = useState<SessionQuestion[]>([])
  const [result, setResult] = useState<ResultData | null>(null)

  function startExam() {
    setQuestions(buildExamSession())
    setSessionKey((k) => k + 1)
    setPhase('in-progress')
  }

  function handleFinish(payload: ExamFinishPayload) {
    setResult(payload)
    setPhase('results')
  }

  function restartExam() {
    setResult(null)
    setPhase('intro')
  }

  if (phase === 'in-progress') {
    return <ExamSession key={sessionKey} questions={questions} onFinish={handleFinish} />
  }

  if (phase === 'results' && result) {
    return (
      <ResultsScreen
        questions={result.questions}
        answers={result.answers}
        timeSpentSeconds={result.timeSpentSeconds}
        onRestart={restartExam}
      />
    )
  }

  return <IntroScreen onStart={startExam} />
}
