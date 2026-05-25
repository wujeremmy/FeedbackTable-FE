import { useEffect, useState } from 'react'
import FeedbackCard from './FeedbackCard'
import AddFeedbackModal from './AddFeedbackModal'
import { MessageCircleQuestionIcon, Lightbulb, Minus, Plus } from 'lucide-react'

type FeedbackItem = {
    id: number | string
    text: string
}

type FeedbackData = {
    kelebihan: FeedbackItem[]
    kekurangan: FeedbackItem[]
    bingung: FeedbackItem[]
    ide: FeedbackItem[]
}

export default function FeedbackBoard() {
    const [feedback, setFeedback] =
    useState<FeedbackData>({
        kelebihan: [],
        kekurangan: [],
        bingung: [],
        ide: [],
    })

    const [open, setOpen] = useState<boolean>(false)

    const fetchFeedback = async () => {
    const res = await fetch(
        'https://feedbacktable-be-production.up.railway.app/feedback',
    )

    
    const data: FeedbackData = await res.json()

    setFeedback(data)
    }

    useEffect(() => {
    fetchFeedback()

    const interval = setInterval(() => {
        fetchFeedback()
    }, 2000)

    return () => clearInterval(interval)
    }, [])

    return (
        <div className="
            min-h-screen
            bg-gradient-to-br
            from-[#0f172a]
            via-[#020617]
            to-black
            text-white
            p-6
            relative
            overflow-hidden
            "
        >
            <div className="
                    absolute
                    top-0
                    left-0
                    w-96
                    h-96
                    bg-cyan-500/20
                    blur-[120px]
                    rounded-full"
                />

            <div className="
                absolute
                bottom-0
                right-0
                w-96
                h-96
                bg-purple-500/20
                blur-[120px]
                rounded-full"
            />
            <h1 className="text-4xl font-bold mb-8 text-center">
            Feedback Grid
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeedbackCard
                title={
                    <div className="flex items-center justify-center gap-2">
                        <Plus size={20} />
                        <span></span>
                    </div>
                }
                items={feedback.kelebihan}
            />

            <FeedbackCard
                title={
                    <div className="flex items-center justify-center gap-2">
                        <Minus size={20} />
                        <span></span>
                    </div>
                }
                items={feedback.kekurangan}
            />

            <FeedbackCard
                title={
                    <div className="flex items-center justify-center gap-2">
                        <MessageCircleQuestionIcon size={20} />
                        <span></span>
                    </div>
                }
                items={feedback.bingung}
            />

            <FeedbackCard
                title={
                    <div className="flex items-center justify-center gap-2">
                        <Lightbulb size={20} />
                        <span></span>
                    </div>
                }

                items={feedback.ide}
            />
            </div>

            <button
                onClick={() => setOpen(true)}
                className="
                    fixed bottom-6 right-6

                    w-14 h-14
                    flex items-center justify-center

                    rounded-full
                    bg-cyan-500 text-black

                    shadow-lg shadow-cyan-500/30

                    hover:bg-cyan-400
                    hover:scale-110

                    active:scale-95

                    transition-transform duration-200

                    focus:outline-none focus:ring-2 focus:ring-cyan-300"
                >
                <Plus size={24} />
            </button>

            <AddFeedbackModal
            open={open}
            onClose={() => setOpen(false)}
            onSuccess={fetchFeedback}
            />
        </div>
    )
}