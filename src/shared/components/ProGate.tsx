import type { ReactNode } from "react"
import { useProProtection } from "@/hooks/use-pro-protection"

interface ProGateProps {
  children: ReactNode
  fallback?: ReactNode
  feature?: string
}

export function ProGate({ children, fallback, feature = "feature" }: ProGateProps) {
  const { isPro, isLoading } = useProProtection()

  if (isLoading) {
    return (
      <div className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg animate-pulse">
        <div className="h-4 bg-zinc-700 rounded w-1/2" />
      </div>
    )
  }

  if (!isPro) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <div >
        <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors">
          Upgrade to Pro  {feature}
        </button>
      </div>
    )
  }

  return <>{children}</>
}
