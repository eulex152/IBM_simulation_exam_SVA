interface FlagButtonProps {
  flagged: boolean
  onToggle: () => void
}

export default function FlagButton({ flagged, onToggle }: FlagButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={flagged}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        flagged
          ? 'bg-exam-flagActive text-exam-flagActiveText'
          : 'bg-exam-flag text-slate-800 hover:bg-[#c0d8e8]'
      }`}
    >
      <FlagIcon filled={flagged} />
      {flagged ? 'Flagged for Review' : 'Flag for Review'}
    </button>
  )
}

function FlagIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M5 3v18" strokeLinecap="round" />
      <path d="M5 4h11l-2.5 3.5L16 11H5" strokeLinejoin="round" />
    </svg>
  )
}
