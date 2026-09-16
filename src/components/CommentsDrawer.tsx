import Modal from './Modal'

interface CommentsDrawerProps {
  questionNumber: number
  comment: string
  onChange: (comment: string) => void
  onClose: () => void
}

export default function CommentsDrawer({ questionNumber, comment, onChange, onClose }: CommentsDrawerProps) {
  return (
    <Modal title={`Comments — Question ${questionNumber}`} onClose={onClose}>
      <p className="mb-3 text-sm text-slate-600">
        Optional notes about this question. These are saved with your session and shown in the post-exam review.
      </p>
      <textarea
        value={comment}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        placeholder="Type your notes here..."
        className="w-full resize-none rounded-md border border-slate-300 p-3 text-sm focus:border-exam-flagActive focus:outline-none focus:ring-1 focus:ring-exam-flagActive"
      />
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Save &amp; Close
        </button>
      </div>
    </Modal>
  )
}
