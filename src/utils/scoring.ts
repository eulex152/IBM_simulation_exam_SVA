import { PASSING_SCORE, SECTIONS } from '../data/sections'
import type { AnswerState, SectionId, SessionQuestion } from '../types'

export interface SectionResult {
  sectionId: SectionId
  name: string
  correct: number
  total: number
  percent: number
}

export interface ExamResult {
  totalCorrect: number
  totalQuestions: number
  percent: number
  passed: boolean
  sectionResults: SectionResult[]
}

export function scoreExam(questions: SessionQuestion[], answers: AnswerState[]): ExamResult {
  const bySection = new Map<SectionId, { correct: number; total: number }>()
  let totalCorrect = 0

  questions.forEach((q, i) => {
    const entry = bySection.get(q.sectionId) ?? { correct: 0, total: 0 }
    entry.total += 1
    const isCorrect = answers[i]?.selectedOptionId === q.correctOptionId
    if (isCorrect) {
      entry.correct += 1
      totalCorrect += 1
    }
    bySection.set(q.sectionId, entry)
  })

  const sectionResults: SectionResult[] = SECTIONS.map((s) => {
    const entry = bySection.get(s.id) ?? { correct: 0, total: 0 }
    return {
      sectionId: s.id,
      name: s.name,
      correct: entry.correct,
      total: entry.total,
      percent: entry.total === 0 ? 0 : Math.round((entry.correct / entry.total) * 100),
    }
  })

  const totalQuestions = questions.length
  const percent = totalQuestions === 0 ? 0 : Math.round((totalCorrect / totalQuestions) * 100)

  return {
    totalCorrect,
    totalQuestions,
    percent,
    passed: totalCorrect >= PASSING_SCORE,
    sectionResults,
  }
}
