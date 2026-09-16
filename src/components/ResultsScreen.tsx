import type { AnswerState, SessionQuestion } from '../types'
import { PASSING_SCORE, TOTAL_EXAM_QUESTIONS } from '../data/sections'
import { formatTime } from '../hooks/useCountdown'
import { scoreExam } from '../utils/scoring'
import SectionBreakdown from './SectionBreakdown'
import QuestionReviewItem from './QuestionReviewItem'

interface ResultsScreenProps {
  questions: SessionQuestion[]
  answers: AnswerState[]
  timeSpentSeconds: number
  onRestart: () => void
}

export default function ResultsScreen({ questions, answers, timeSpentSeconds, onRestart }: ResultsScreenProps) {
  const result = scoreExam(questions, answers)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="bg-exam-header px-6 py-4 text-white">
        <span className="text-2xl font-bold tracking-tight">IBM</span>
        <span className="ml-3 text-sm text-slate-300">Assessment Results</span>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-10">
        <section className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
          <span
            className={`rounded-full px-5 py-1.5 text-sm font-bold uppercase tracking-wide ${
              result.passed ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {result.passed ? 'Pass' : 'Fail'}
          </span>
          <p className="text-4xl font-bold text-slate-900">
            {result.totalCorrect} / {TOTAL_EXAM_QUESTIONS}
          </p>
          <p className="text-slate-600">
            {result.percent}% overall &middot; Passing score is {PASSING_SCORE}/{TOTAL_EXAM_QUESTIONS} (
            {Math.round((PASSING_SCORE / TOTAL_EXAM_QUESTIONS) * 100)}%)
          </p>
          <p className="text-sm text-slate-500">Time spent: {formatTime(timeSpentSeconds)}</p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Section-wise Performance</h2>
          <SectionBreakdown sectionResults={result.sectionResults} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Itemized Question Review</h2>
          <div className="flex flex-col gap-4">
            {questions.map((q, i) => (
              <QuestionReviewItem key={`${q.poolId}-${i}`} question={q} answer={answers[i]} index={i} />
            ))}
          </div>
        </section>

        <div className="flex justify-center pb-6">
          <button
            type="button"
            onClick={onRestart}
            className="rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Start a New Randomized Exam
          </button>
        </div>
      </main>

      <footer className="border-t border-exam-border bg-exam-footer px-6 py-3 text-center text-xs text-slate-500">
        Copyright &copy; 2026 IBM Corporation. All rights reserved.
      </footer>
    </div>
  )
}
