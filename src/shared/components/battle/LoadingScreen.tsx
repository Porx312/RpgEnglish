"use client"



export const BattleLoadingScreen = () => {
 
    return (
         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-950">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-amber-300 text-xl font-bold tracking-wide">Loading Battle...</p>
        </div>
      </div>
    )
}
