interface FooterProps {
  onHelp: () => void
  onPause: () => void
  onComments: () => void
  onReview: () => void
  onNext: () => void
  isLastQuestion: boolean
}

const baseBtn =
  'rounded-md border border-slate-300 bg-[#e6e6e6] px-4 py-2 text-sm font-medium text-slate-800 hover:bg-[#dcdcdc] transition-colors'

export default function Footer({ onHelp, onPause, onComments, onReview, onNext, isLastQuestion }: FooterProps) {
  return (
    <footer className="flex flex-col gap-2 border-t border-exam-border bg-exam-footer px-6 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-3">
          <button type="button" className={baseBtn} onClick={onHelp}>
            Help
          </button>
          <button type="button" className={baseBtn} onClick={onPause}>
            Pause
          </button>
        </div>
        <div className="flex gap-3">
          <button type="button" className={baseBtn} onClick={onComments}>
            Comments
          </button>
          <button type="button" className={baseBtn} onClick={onReview}>
            Review
          </button>
          <button
            type="button"
            onClick={onNext}
            className="rounded-md bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            {isLastQuestion ? 'Finish Exam' : 'Next'}
          </button>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500">
        Copyright &copy; 2026 IBM Corporation. All rights reserved.
      </p>
    </footer>
  )
}
