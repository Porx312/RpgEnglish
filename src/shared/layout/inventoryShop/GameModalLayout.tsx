"use client"

import type React from "react"
import { X } from "lucide-react"
import GameFrameSvg from "@/shared/lib/svgAssets/MarcSvgInventory"
import TittleSvg from "@/shared/lib/svgAssets/TittleSvg"

interface GameModalLayoutProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function GameModalLayout({ isOpen, onClose, title, children }: GameModalLayoutProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 md:p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-7xl max-h-[90vh] flex flex-col md:aspect-[1000/641] aspect-[702/1020]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 pointer-events-none">
          <GameFrameSvg />
        </div>

       
          {/* Left ornament */}
         
          {/* Header banner */}
        <div className="flex relative px-8 md:px-16 py-2 md:py-4  items-center justify-center mt-10 mb-8 z-20">
            
                        <TittleSvg className="absolute w-[100%]" />
                        <div className="text-center z-10">
                          <h1 className="text-3xl z-10 font-bold text-amber-200 mb-1" 
              style={{ fontFamily: "serif" }}
                          >
              {title}
                          
                          </h1>
                  
                      </div>

          {/* Right ornament */}
          
        </div>
            
            
                    
        <div className="relative z-10 flex-1 overflow-y-auto px-8 md:px-16 py-4">{children}</div>

        <div className="relative z-10 flex justify-center pb-8 md:pb-12">
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-500 text-white p-2 md:p-3 rounded-full transition-all border-2 md:border-4 border-red-800 shadow-lg hover:scale-110"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 md:w-8 md:h-8 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  )
}
