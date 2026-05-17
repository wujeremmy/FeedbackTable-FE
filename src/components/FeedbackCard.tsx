import type { ReactNode } from "react"

type FeedbackItem = {
    id: number | string
    text: string
}

type FeedbackCardProps = {
    title: ReactNode
    items: FeedbackItem[]
}

export default function FeedbackCard({
    title,
    items,
}: FeedbackCardProps) {
    return (
        <div className="
            bg-white/5
            border
            border-cyan-500/20
            backdrop-blur-xl
            rounded-3xl
            p-5
            min-h-[400px]
            shadow-lg
            shadow-cyan-500/10
            hover:scale-[1.02]
            hover:border-cyan-400
            transition-all
            duration-300
            "
        >
            <h2 className="text-xl font-bold mb-4">
            {title}
            </h2>

            <div className="space-y-3">
            {items.map((item) => (
                <div
                key={item.id}
                className="
                    bg-white/10
                    border
                    border-white/10
                    rounded-2xl
                    p-3"
                >
                <p className="m-0 break-words whitespace-pre-wrap">{item.text.trim()}</p>
                </div>
            ))}
            </div>
        </div>
    )
}