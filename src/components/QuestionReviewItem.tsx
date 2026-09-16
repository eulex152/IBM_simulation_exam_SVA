import type { AnswerState, SessionQuestion } from '../types'
import { sectionById } from '../data/sections'
import { optionLetter } from '../utils/examSession'

interface QuestionReviewItemProps {
  question: SessionQuestion
  answer: AnswerState
  index: number
}

export default function QuestionReviewItem({ question, answer, index }: QuestionReviewItemProps) {
  const isCorrect = answer.selectedOptionId === question.correctOptionId
  const section = sectionById(question.sectionId)

  return (
    <div className="rounded-lg border border-slate-200 p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Question {index + 1} &middot; {section.name}
        </span>
        <span
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {isCorrect ? '✓ Correct' : '✗ Incorrect'}
        </span>
      </div>

      {question.scenario && (
        <p className="mb-2 rounded-md bg-slate-50 p-3 text-sm text-slate-600 border border-slate-100">
          {question.scenario}
        </p>
      )}
      <p className="mb-3 text-sm font-medium text-slate-900">{question.prompt}</p>

      <div className="flex flex-col gap-2">
        {question.options.map((option, i) => {
          const letter = optionLetter(i)
          const isCorrectOption = option.id === question.correctOptionId
          const isSelectedOption = option.id === answer.selectedOptionId
          return (
            <div
              key={option.id}
              className={`flex items-start gap-2 rounded-md border p-2.5 text-sm ${
                isCorrectOption
                  ? 'border-emerald-300 bg-emerald-50'
                  : isSelectedOption
                    ? 'border-red-300 bg-red-50'
                    : 'border-slate-200'
              }`}
            >
              <span className="font-semibold">{letter}.</span>
              <span className="flex-1 text-slate-800">{option.text}</span>
              {isCorrectOption && <span className="text-emerald-600" title="Correct answer">✓</span>}
              {isSelectedOption && !isCorrectOption && (
                <span className="text-red-600" title="Your answer">✗</span>
              )}
            </div>
          )
        })}
        {answer.selectedOptionId === null && (
          <p className="text-xs italic text-slate-500">No answer was selected for this question.</p>
        )}
      </div>

      <p className="mt-3 rounded-md bg-slate-50 p-3 text-sm text-slate-600">
        <span className="font-semibold text-slate-700">Explanation: </span>
        {question.explanation}
      </p>

      {answer.comment && (
        <p className="mt-2 rounded-md border border-dashed border-slate-300 p-3 text-sm italic text-slate-500">
          Your note: {answer.comment}
        </p>
      )}
    </div>
  )
}
