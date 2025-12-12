"use client"

interface MessageBannerProps {
    message: string
}

export function MessageBanner({ message }: MessageBannerProps) {
    if (!message) return null

    const isError = message.includes("Error")

    return (
        <div
            className={`mb-6 p-4 rounded-lg font-bold text-center border-2 ${isError ? "bg-red-900/50 text-red-200 border-red-700" : "bg-emerald-900/50 text-emerald-200 border-emerald-700"
                }`}
        >
            {message}
        </div>
    )
}
