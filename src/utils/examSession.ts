import { QUESTION_POOL } from '../data/questions'
import { SECTIONS } from '../data/sections'
import type { SessionQuestion } from '../types'
import { sample, shuffle } from './random'

/**
 * Builds one randomized exam session: samples the blueprint-weighted count of
 * questions per section from the pool, shuffles the overall question order,
 * and shuffles each question's answer/distractor order.
 */
export function buildExamSession(): SessionQuestion[] {
  const drawn: SessionQuestion[] = []

  for (const section of SECTIONS) {
    const pool = QUESTION_POOL.filter((q) => q.sectionId === section.id)
    const picked = sample(pool, section.countInExam)

    for (const poolQuestion of picked) {
      const shuffledOptions = shuffle(poolQuestion.options)
      drawn.push({
        poolId: poolQuestion.id,
        sectionId: poolQuestion.sectionId,
        scenario: poolQuestion.scenario,
        prompt: poolQuestion.prompt,
        options: shuffledOptions,
        correctOptionId: poolQuestion.correctOptionId,
        explanation: poolQuestion.explanation,
      })
    }
  }

  return shuffle(drawn)
}

export function optionLetter(index: number): string {
  return String.fromCharCode(65 + index)
}
