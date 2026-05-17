import { useState } from 'react'

type AddFeedbackModalProps = {
    open: boolean
    onClose: () => void
    onSuccess: () => void
}

type FeedbackType =
    | 'bingung'
    | 'ide'
    | 'kelebihan'
    | 'kekurangan'

export default function AddFeedbackModal({
    open,
    onClose,
    onSuccess,
}: AddFeedbackModalProps) {
    const [type, setType] = useState<FeedbackType>('bingung')

    const [text, setText] = useState<string>('')

    if (!open) return null

    const handleSubmit = async () => {
    if (!text.trim()) return

    await fetch('feedbacktable-be-production.up.railway.app/feedback', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        type,
        text,
        }),
    })

    setText('')
    setType('bingung')

    onSuccess()
    onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="
                    bg-[#0f172a]
                    border
                    border-cyan-500/20
                    backdrop-blur-xl
                    rounded-3xl
                    w-full
                    max-w-md
                    p-6
                    text-white"
            >
            <h2 className="text-2xl font-bold mb-4">
                Tambah Feedback
            </h2>

            <select
                value={type}
                onChange={(e) =>
                setType(e.target.value as FeedbackType)
                }
                className="
                    w-full
                    bg-[#0f172a]
                    border
                    border-cyan-500/20
                    rounded-2xl
                    p-3
                    mb-4
                    text-white
                    outline-none"
            >
                <option value="bingung">
                Hal yang Dibingungkan (❓)
                </option>

                <option value="ide">
                Ide yang Bisa Ditambahkan (💡)
                </option>

                <option value="kelebihan">
                Kelebihan (➕)
                </option>

                <option value="kekurangan">
                Kekurangan (➖)
                </option>
            </select>

            <textarea
                value={text}
                onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement>,
                ) => setText(e.target.value)}
                placeholder="Masukkan feedback..."
                className="w-full border rounded-xl p-3 h-32 mb-4"
            />

            <div className="flex justify-end gap-2">
                <button
                onClick={onClose}
                className="
                    px-4
                    py-2
                    rounded-2xl
                    bg-white/10
                    hover:bg-white/20
                    transition-all"
                >
                Cancel
                </button>

                <button
                onClick={handleSubmit}
                className="
                    px-4
                    py-2
                    rounded-2xl
                    bg-cyan-500
                    text-black
                    font-semibold
                    hover:bg-cyan-400
                    transition-all"
                >
                Submit
                </button>
            </div>
            </div>
        </div>
    )
}