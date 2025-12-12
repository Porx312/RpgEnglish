"use client"

import { AdminHeader } from "@/shared/components/admin/AdminHeader"
import { AdminTabs } from "@/shared/components/admin/AdminTabs"
import { EnemiesTab } from "@/shared/components/admin/enemies/EnemiesTab"
import { ItemsTab } from "@/shared/components/admin/items/ItemsTab"
import { MessageBanner } from "@/shared/components/admin/messagebanner"
import { WorldsTab } from "@/shared/components/admin/worlds/WorldsTab"
import { useAdminLogic } from "@/shared/hooks/use-admin-logic"


export default function AdminPanel() {
  const logic = useAdminLogic()

  if (!logic.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-400 to-emerald-400">
        <p className="text-white text-xl">Please sign in to access admin panel</p>
      </div>
    )
  }

  if (logic.isAdmin === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-400 to-emerald-400">
        <p className="text-white text-xl">Loading...</p>
      </div>
    )
  }

  if (logic.isAdmin === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-400 to-emerald-400">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Unauthorized: Admin access required</p>
          <button
            onClick={() => logic.router.push("/dashboard")}
            className="px-6 py-3 bg-amber-400 text-amber-900 font-bold rounded-lg shadow-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <AdminHeader
          onSeedItems={logic.handlers.handleSeed}
          onSeedWorlds={logic.handlers.handleSeedWorlds}
          onBackToDashboard={() => logic.router.push("/dashboard")}
          loading={logic.store.loading}
          hasItems={!!logic.allItems && logic.allItems.length > 0}
          hasWorlds={!!logic.allWorlds && logic.allWorlds.length > 0}
        />

        <AdminTabs activeTab={logic.store.activeTab} onTabChange={logic.store.setActiveTab} />

        {logic.store.message && <MessageBanner message={logic.store.message} />}

        {logic.store.activeTab === "items" && (
          <ItemsTab
            items={logic.allItems || []}
            itemForm={logic.store.itemForm}
            onFormChange={logic.store.setItemForm}
            onSubmit={logic.handlers.handleItemSubmit}
            onDelete={logic.handlers.handleDeleteItem}
            loading={logic.store.loading}
          />
        )}

        {logic.store.activeTab === "enemies" && (
          <EnemiesTab
            enemies={logic.allEnemies || []}
            items={logic.allItems || []}
            enemyForm={logic.store.enemyForm}
            dropForm={logic.store.dropForm}
            onEnemyFormChange={logic.store.setEnemyForm}
            onDropFormChange={logic.store.setDropForm}
            onEnemySubmit={logic.handlers.handleEnemySubmit}
            onDropSubmit={logic.handlers.handleAddDrop}
            onDelete={logic.handlers.handleDeleteEnemy}
            loading={logic.store.loading}
          />
        )}

        {logic.store.activeTab === "worlds" && (
          <WorldsTab
            worlds={logic.allWorlds || []}
            enemies={logic.allEnemies || []}
            worldForm={logic.store.worldForm}
            levelForm={logic.store.levelForm}
            quizForm={logic.store.quizForm}
            levelsForWorld={logic.levelsForWorld || []}
            quizzesForLevel={logic.quizzesForLevel || []}
            onWorldFormChange={logic.store.setWorldForm}
            onLevelFormChange={logic.store.setLevelForm}
            onQuizFormChange={logic.store.setQuizForm}
            onWorldSubmit={logic.handlers.handleWorldSubmit}
            onLevelSubmit={logic.handlers.handleLevelSubmit}
            onQuizSubmit={logic.handlers.handleQuizSubmit}
            onDeleteWorld={logic.handlers.handleDeleteWorld}
            onDeleteLevel={logic.handlers.handleDeleteLevel}
            onDeleteQuiz={logic.handlers.handleDeleteQuiz}
            loading={logic.store.loading}
          />
        )}
      </div>
    </div>
  )
}
