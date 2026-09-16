import { formatTime } from '../hooks/useCountdown'

interface HeaderProps {
  secondsLeft: number
  currentQuestionNumber: number
  totalQuestions: number
}

export default function Header({ secondsLeft, currentQuestionNumber, totalQuestions }: HeaderProps) {
  const isLowTime = secondsLeft <= 5 * 60

  return (
    <header className="flex items-center justify-between gap-4 bg-exam-header px-6 py-3 text-white">
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-2xl font-bold tracking-tight">IBM</span>
        <span className="hidden sm:inline text-xs text-slate-300">Professional Certification Program</span>
      </div>

      <div className="flex-1 text-center text-sm sm:text-base font-medium truncate px-2">
        C1000-171 Assessment: IBM Security Verify Access V10.0
      </div>

      <div className="flex items-center gap-4 shrink-0 text-sm">
        <div className={`flex items-center gap-2 ${isLowTime ? 'text-red-400' : ''}`}>
          <ClockIcon />
          <span className="font-mono tabular-nums">Time Remaining: {formatTime(secondsLeft)}</span>
        </div>
        <div className="hidden md:block text-slate-200">
          Question {currentQuestionNumber} of {totalQuestions}
        </div>
      </div>
    </header>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
