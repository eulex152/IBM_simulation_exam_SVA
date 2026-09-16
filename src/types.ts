export type SectionId = 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface SectionInfo {
  id: SectionId
  name: string
  shortName: string
  weightPercent: number
  countInExam: number
}

export interface QuestionOption {
  id: string
  text: string
}

/** Master pool question, as authored (option order/ids are canonical, not session-randomized). */
export interface PoolQuestion {
  id: string
  sectionId: SectionId
  scenario?: string
  prompt: string
  options: QuestionOption[]
  correctOptionId: string
  explanation: string
}

/** A question instance drawn into a specific exam session, with shuffled option order/ids. */
export interface SessionQuestion {
  poolId: string
  sectionId: SectionId
  scenario?: string
  prompt: string
  options: QuestionOption[]
  correctOptionId: string
  explanation: string
}

export interface AnswerState {
  selectedOptionId: string | null
  flagged: boolean
  comment: string
  visited: boolean
}

export type ExamPhase = 'intro' | 'in-progress' | 'results'
