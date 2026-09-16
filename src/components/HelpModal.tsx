import Modal from './Modal'

export default function HelpModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Exam Help" onClose={onClose}>
      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
        <li>Select one answer per question, then click <strong>Next</strong> to proceed.</li>
        <li>Use <strong>Flag for Review</strong> to mark a question and find it later.</li>
        <li>Click <strong>Review</strong> to see every question's status and jump directly to it.</li>
        <li>Click <strong>Comments</strong> to save optional notes about the current question.</li>
        <li><strong>Pause</strong> stops the timer and hides the question until you resume.</li>
        <li>Your progress is saved as you navigate; the timer keeps running unless paused.</li>
      </ul>
    </Modal>
  )
}
