interface PauseOverlayProps {
  onResume: () => void
}

export default function PauseOverlay({ onResume }: PauseOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-white/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 text-center">
        <PauseIcon />
        <h2 className="text-2xl font-semibold text-slate-900">Exam Paused</h2>
        <p className="max-w-sm text-sm text-slate-600">
          The countdown timer has been stopped. Question content is hidden while the exam is paused.
        </p>
      </div>
      <button
        type="button"
        onClick={onResume}
        className="rounded-md bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
      >
        Resume Exam
      </button>
    </div>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#1b1b1b" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <rect x="9" y="8" width="2" height="8" fill="#1b1b1b" stroke="none" />
      <rect x="13" y="8" width="2" height="8" fill="#1b1b1b" stroke="none" />
    </svg>
  )
}
