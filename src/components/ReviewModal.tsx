import type { AnswerState } from '../types'
import Modal from './Modal'

interface ReviewModalProps {
  answers: AnswerState[]
  currentIndex: number
  onJump: (index: number) => void
  onClose: () => void
}

function statusOf(answer: AnswerState): 'answered' | 'flagged' | 'unanswered' {
  if (answer.flagged) return 'flagged'
  if (answer.selectedOptionId !== null) return 'answered'
  return 'unanswered'
}

const statusStyles: Record<string, string> = {
  answered: 'bg-emerald-100 border-emerald-400 text-emerald-800',
  flagged: 'bg-amber-100 border-amber-400 text-amber-800',
  unanswered: 'bg-slate-100 border-slate-300 text-slate-600',
}

export default function ReviewModal({ answers, currentIndex, onJump, onClose }: ReviewModalProps) {
  const answered = answers.filter((a) => a.selectedOptionId !== null).length
  const flagged = answers.filter((a) => a.flagged).length
  const unanswered = answers.length - answered

  return (
    <Modal title="Review Questions" onClose={onClose} widthClassName="max-w-2xl">
      <div className="mb-4 flex flex-wrap gap-4 text-xs text-slate-600">
        <Legend swatchClass="bg-emerald-100 border-emerald-400" label={`Answered (${answered})`} />
        <Legend swatchClass="bg-amber-100 border-amber-400" label={`Flagged (${flagged})`} />
        <Legend swatchClass="bg-slate-100 border-slate-300" label={`Unanswered (${unanswered})`} />
      </div>
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
        {answers.map((answer, index) => {
          const status = statusOf(answer)
          const isCurrent = index === currentIndex
          return (
            <button
              key={index}
              type="button"
              onClick={() => {
                onJump(index)
                onClose()
              }}
              className={`relative rounded-md border py-2 text-sm font-medium transition-transform hover:scale-105 ${statusStyles[status]} ${
                isCurrent ? 'ring-2 ring-offset-1 ring-slate-900' : ''
              }`}
            >
              {index + 1}
            </button>
          )
        })}
      </div>
    </Modal>
  )
}

function Legend({ swatchClass, label }: { swatchClass: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded border ${swatchClass}`} />
      {label}
    </div>
  )
}
