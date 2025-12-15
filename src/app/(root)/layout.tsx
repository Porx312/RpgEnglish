"use client"
import { UserButton, useUser } from "@clerk/nextjs";
import { Menu } from "./components/Menu";
import { BtnStast } from "./components/BtnStast";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/shared/components/Header";

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
        backgroundImage: `${`url('https://res.cloudinary.com/dq0pfesxe/image/upload/v1765809751/game_background_3_dyvuvk.png')`}`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header stast={stast} />
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
