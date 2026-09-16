import { EXAM_DURATION_SECONDS, PASSING_SCORE, SECTIONS, TOTAL_EXAM_QUESTIONS } from '../data/sections'

interface IntroScreenProps {
  onStart: () => void
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  const hours = Math.floor(EXAM_DURATION_SECONDS / 3600)
  const minutes = Math.round((EXAM_DURATION_SECONDS % 3600) / 60)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="bg-exam-header px-6 py-4 text-white">
        <span className="text-2xl font-bold tracking-tight">IBM</span>
      </header>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            C1000-171 Assessment: IBM Security Verify Access V10.0
          </h1>
          <p className="mt-2 text-slate-600">
            This practice assessment simulates the official certification exam experience, including timing,
            navigation, flagging, and a full results breakdown.
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:grid-cols-4">
          <Stat label="Questions" value={String(TOTAL_EXAM_QUESTIONS)} />
          <Stat label="Time Limit" value={`${hours}h ${minutes}m`} />
          <Stat label="Passing Score" value={`${PASSING_SCORE}/${TOTAL_EXAM_QUESTIONS}`} />
          <Stat label="Sections" value={String(SECTIONS.length)} />
        </dl>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Exam Blueprint
          </h2>
          <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200">
            {SECTIONS.map((s) => (
              <li key={s.id} className="flex items-center justify-between px-4 py-2.5 text-sm">
                <span className="text-slate-800">{s.name}</span>
                <span className="text-slate-500">
                  {s.weightPercent}% &middot; {s.countInExam} questions
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-slate-500">
          Questions and answer order are randomized every time you start a new session, sampled according to the
          weighted blueprint above.
        </p>

        <div>
          <button
            type="button"
            onClick={onStart}
            className="rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Begin Exam
          </button>
        </div>
      </main>
      <footer className="border-t border-exam-border bg-exam-footer px-6 py-3 text-center text-xs text-slate-500">
        Copyright &copy; 2026 IBM Corporation. All rights reserved.
      </footer>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="text-xl font-semibold text-slate-900">{value}</dd>
    </div>
  )
}
