import { useMemo, useState } from 'react'
import type { AnswerState, SessionQuestion } from '../types'

function initialAnswers(questions: SessionQuestion[]): AnswerState[] {
  return questions.map((_, i) => ({
    selectedOptionId: null,
    flagged: false,
    comment: '',
    visited: i === 0,
  }))
}

export function useExamEngine(questions: SessionQuestion[]) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswerState[]>(() => initialAnswers(questions))

  const currentQuestion = questions[currentIndex]
  const currentAnswer = answers[currentIndex]

  const goTo = (index: number) => {
    if (index < 0 || index >= questions.length) return
    setCurrentIndex(index)
    setAnswers((prev) => {
      if (prev[index].visited) return prev
      const next = [...prev]
      next[index] = { ...next[index], visited: true }
      return next
    })
  }

  const selectOption = (optionId: string) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[currentIndex] = { ...next[currentIndex], selectedOptionId: optionId }
      return next
    })
  }

  const toggleFlag = () => {
    setAnswers((prev) => {
      const next = [...prev]
      next[currentIndex] = { ...next[currentIndex], flagged: !next[currentIndex].flagged }
      return next
    })
  }

  const setComment = (comment: string) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[currentIndex] = { ...next[currentIndex], comment }
      return next
    })
  }

  const goNext = () => goTo(currentIndex + 1)
  const isLastQuestion = currentIndex === questions.length - 1

  const counts = useMemo(() => {
    const answered = answers.filter((a) => a.selectedOptionId !== null).length
    const flagged = answers.filter((a) => a.flagged).length
    const unanswered = answers.length - answered
    return { answered, flagged, unanswered, total: answers.length }
  }, [answers])

  return {
    questions,
    currentIndex,
    currentQuestion,
    currentAnswer,
    answers,
    counts,
    isLastQuestion,
    goTo,
    goNext,
    selectOption,
    toggleFlag,
    setComment,
  }
}
