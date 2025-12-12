"use client"

type AdminTab = "items" | "enemies" | "worlds"

interface AdminTabsProps {
    activeTab: AdminTab
    onTabChange: (tab: AdminTab) => void
}

export function AdminTabs({ activeTab, onTabChange }: AdminTabsProps) {
    const tabs = [
        { id: "items" as const, label: "Items Manager", color: "emerald" },
        { id: "enemies" as const, label: "Enemy Manager", color: "red" },
        { id: "worlds" as const, label: "Worlds & Quizzes", color: "blue" },
    ]

    return (
        <div className="flex gap-2 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`px-6 py-3 font-bold rounded-lg transition-all ${activeTab === tab.id
                            ? `bg-${tab.color}-600 text-white border-2 border-${tab.color}-400`
                            : "bg-slate-700 text-slate-300 border-2 border-slate-600 hover:bg-slate-600"
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}
