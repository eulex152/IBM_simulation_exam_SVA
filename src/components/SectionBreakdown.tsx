import type { SectionResult } from '../utils/scoring'

export default function SectionBreakdown({ sectionResults }: { sectionResults: SectionResult[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3 font-semibold">Section</th>
            <th className="px-4 py-3 font-semibold">Correct</th>
            <th className="px-4 py-3 font-semibold">Score</th>
            <th className="px-4 py-3 font-semibold">Performance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {sectionResults.map((s) => (
            <tr key={s.sectionId}>
              <td className="px-4 py-3 text-slate-800">{s.name}</td>
              <td className="px-4 py-3 text-slate-600">
                {s.correct}/{s.total}
              </td>
              <td className="px-4 py-3 font-medium text-slate-800">{s.percent}%</td>
              <td className="px-4 py-3">
                <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${s.percent >= 60 ? 'bg-emerald-500' : 'bg-red-400'}`}
                    style={{ width: `${s.percent}%` }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
