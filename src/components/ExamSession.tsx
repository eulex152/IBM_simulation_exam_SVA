import { useState } from 'react'
import type { AnswerState, SessionQuestion } from '../types'
import { EXAM_DURATION_SECONDS } from '../data/sections'
import { useExamEngine } from '../hooks/useExamEngine'
import { useCountdown } from '../hooks/useCountdown'
import Header from './Header'
import Footer from './Footer'
import QuestionPanel from './QuestionPanel'
import PauseOverlay from './PauseOverlay'
import HelpModal from './HelpModal'
import CommentsDrawer from './CommentsDrawer'
import ReviewModal from './ReviewModal'

type ActiveModal = 'none' | 'help' | 'comments' | 'review'

export interface ExamFinishPayload {
  questions: SessionQuestion[]
  answers: AnswerState[]
  timeSpentSeconds: number
}

interface ExamSessionProps {
  questions: SessionQuestion[]
  onFinish: (payload: ExamFinishPayload) => void
}

export default function ExamSession({ questions, onFinish }: ExamSessionProps) {
  const [activeModal, setActiveModal] = useState<ActiveModal>('none')
  const engine = useExamEngine(questions)

  const finish = (secondsLeft: number) => {
    onFinish({
      questions: engine.questions,
      answers: engine.answers,
      timeSpentSeconds: EXAM_DURATION_SECONDS - secondsLeft,
    })
  }

  const countdown = useCountdown(EXAM_DURATION_SECONDS, {
    onExpire: () => finish(0),
  })

  function handleNext() {
    if (engine.isLastQuestion) {
      finish(countdown.secondsLeft)
    } else {
      engine.goNext()
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header
        secondsLeft={countdown.secondsLeft}
        currentQuestionNumber={engine.currentIndex + 1}
        totalQuestions={engine.questions.length}
      />

      <main className="flex-1">
        <QuestionPanel
          question={engine.currentQuestion}
          answer={engine.currentAnswer}
          questionNumber={engine.currentIndex + 1}
          onSelectOption={engine.selectOption}
          onToggleFlag={engine.toggleFlag}
        />
      </main>

      <Footer
        onHelp={() => setActiveModal('help')}
        onPause={countdown.pause}
        onComments={() => setActiveModal('comments')}
        onReview={() => setActiveModal('review')}
        onNext={handleNext}
        isLastQuestion={engine.isLastQuestion}
      />

      {countdown.isPaused && <PauseOverlay onResume={countdown.resume} />}

      {activeModal === 'help' && <HelpModal onClose={() => setActiveModal('none')} />}

      {activeModal === 'comments' && (
        <CommentsDrawer
          questionNumber={engine.currentIndex + 1}
          comment={engine.currentAnswer.comment}
          onChange={engine.setComment}
          onClose={() => setActiveModal('none')}
        />
      )}

      {activeModal === 'review' && (
        <ReviewModal
          answers={engine.answers}
          currentIndex={engine.currentIndex}
          onJump={engine.goTo}
          onClose={() => setActiveModal('none')}
        />
      )}
    </div>
  )
}
