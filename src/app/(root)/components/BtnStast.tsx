import Image from 'next/image'
import React from 'react'

export const BtnStast = ({ stats, icon, className }: { stats: number, icon: string, className: string }) => {
  return (
    <div className="relative flex items-center justify-between w-28 h-9  gap-2 bg-[#1F1015] pr-4 py-1 rounded-lg  border-4 border-black">
      <div className={`w-10 h-10 absolute top-0 right-2 rounded-full  flex items-center justify-center border-2 border-black  relative ${className}`}>
        <Image src={icon} alt='icon' width={100} height={100} />
      </div>
      <span className="font-bold text-xl text-white">{stats}</span>
    </div>
  )
}
