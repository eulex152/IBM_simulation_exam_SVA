import type { AnswerState, SessionQuestion } from '../types'
import { optionLetter } from '../utils/examSession'
import FlagButton from './FlagButton'

interface QuestionPanelProps {
  question: SessionQuestion
  answer: AnswerState
  questionNumber: number
  onSelectOption: (optionId: string) => void
  onToggleFlag: () => void
}

export default function QuestionPanel({
  question,
  answer,
  questionNumber,
  onSelectOption,
  onToggleFlag,
}: QuestionPanelProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-500">Question {questionNumber}</span>
        <FlagButton flagged={answer.flagged} onToggle={onToggleFlag} />
      </div>

      <div className="flex flex-col gap-4">
        {question.scenario && (
          <p className="rounded-md bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 border border-slate-200">
            {question.scenario}
          </p>
        )}
        <p className="text-lg font-medium leading-relaxed text-slate-900">{question.prompt}</p>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="sr-only">Answer choices</legend>
        {question.options.map((option, index) => {
          const letter = optionLetter(index)
          const isSelected = answer.selectedOptionId === option.id
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                isSelected ? 'border-exam-flagActive bg-[#eef5fa]' : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name={`question-${question.poolId}-${questionNumber}`}
                checked={isSelected}
                onChange={() => onSelectOption(option.id)}
                className="mt-1 h-4 w-4 accent-exam-flagActive"
              />
              <span className="text-sm leading-relaxed text-slate-800">
                <span className="font-semibold mr-1">{letter}.</span>
                {option.text}
              </span>
            </label>
          )
        })}
      </fieldset>
    </div>
  )
}
