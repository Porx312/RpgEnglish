"use client"
import { UserButton, useUser } from "@clerk/nextjs";
import { Menu } from "../../shared/components/dashboard/Menu";
import { BtnStast } from "../../shared/components/dashboard/BtnStast";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser()
  const router = useRouter()
  const character = useQuery(api.characters.getCharacter, user?.id ? { userId: user.id } : "skip")
  // Redirect to character creation if no character
  if (character === null) {
    router.push("/character-creation")
    return null
  }

  if (!user || character === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#87CEEB" }}>
        <p className="text-white text-xl">Loading...</p>
      </div>
    )
  }
  const stast = [
    { name: character.money, icon: "/icons/money.png", color: "bg-yellow-500" },
    { name: character.energy, icon: "/icons/energy.png", color: "bg-blue-500" },
    { name: character.health, icon: "/icons/health.png", color: "bg-red-500" },
  ]
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `${`url('https://res.cloudinary.com/dq0pfesxe/image/upload/v1764609296/Log_Horizon_-_Luminara_o3xxhc.jpg')`}`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-3">
          <Image src={'/Logo.png'} alt="logo" width={140} height={140} />
        </Link>

        {/* Stats */}
        <div className="flex items-center gap-3">
          {/* Money */}

          {stast.map((stat, index) => (
            <BtnStast key={index} icon={stat.icon} stats={stat.name} className={stat.color} />
          ))}

          {/* User Avatar */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden border-3 border-gray-900 bg-gray-700">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
      {children}
      <Menu
        options={[
          { url: '/blattle', src: '/icons-menu/battle.png', name: 'Battle' },
          { url: '/adventure', src: '/icons-menu/map.png', name: 'Adventure' },
          { url: '/inventory', src: '/icons-menu/inventory.png', name: 'Inventory' },
          { url: '/store', src: '/icons-menu/store.png', name: 'Store' },
        ]}
      />
    </div>
  );
}

// https://emkc.org/api/v2/piston/runtimes
