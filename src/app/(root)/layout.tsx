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
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-950">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-amber-300 text-xl font-bold tracking-wide">Loading...</p>
        </div>
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
      />
    </div>
  );
}

// https://emkc.org/api/v2/piston/runtimes
