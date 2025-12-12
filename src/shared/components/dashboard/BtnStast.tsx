import Image from 'next/image'
import React from 'react'

export const BtnStast = ({ stats, icon, className }: { stats: number, icon: string, className: string }) => {
  return (
    <div className="flex items-center w-28 h-9  gap-2 bg-gray-700 pr-4 py-1 rounded-full border-3 border-gray-900">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-black ${className}`}>
        <Image src={icon} alt='icon' width={100} height={100} />
      </div>
      <span className="font-bold text-xl text-white">{stats}</span>
    </div>
  )
}
