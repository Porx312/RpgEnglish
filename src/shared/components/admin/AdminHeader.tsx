"use client"

interface AdminHeaderProps {
    onSeedItems?: () => void
    onSeedWorlds: () => void
    onBackToDashboard: () => void
    loading: boolean
    hasItems: boolean
    hasWorlds: boolean
}

export function AdminHeader({
    onSeedItems,
    onSeedWorlds,
    onBackToDashboard,
    loading,
    hasItems,
    hasWorlds,
}: AdminHeaderProps) {
    return (
        <div className="mb-8 flex items-center justify-between">
            <h1 className="text-4xl font-bold text-amber-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Admin Panel</h1>
            <div className="flex gap-3">
                <button
                    onClick={onSeedItems}
                    disabled={loading || hasItems}
                    className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-purple-400"
                >
                    Seed Items
                </button>
                <button
                    onClick={onSeedWorlds}
                    disabled={loading || hasWorlds}
                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-blue-400"
                >
                    Seed Worlds
                </button>
                <button
                    onClick={onBackToDashboard}
                    className="px-6 py-3 bg-amber-500 text-amber-900 font-bold rounded-lg shadow-lg hover:bg-amber-400 border-2 border-amber-300"
                >
                    Dashboard
                </button>
            </div>
        </div>
    )
}
