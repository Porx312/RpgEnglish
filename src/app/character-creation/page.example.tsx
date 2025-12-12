"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useMutation, useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import { api } from "../../../convex/_generated/api"
import { HAIR_COLORS, SKIN_COLORS } from "@/shared/lib/charactercreation/colors"
import { EYE_COLORS } from "@/shared/lib/charactercreation/eyes"
import { Id } from "../../../convex/_generated/dataModel"
import { CharacterPreview } from "@/shared/components/AvatarPreview/CharacterPreview"



export default function CharacterCreation() {
  const { user } = useUser()
  const router = useRouter()
  const createCharacter = useMutation(api.characters.createCharacter)
  const character = useQuery(api.characters.getCharacter, user?.id ? { userId: user.id } : "skip")

  const items = useQuery(api.items.getAllItems)

  const [characterName, setCharacterName] = useState("")
  const [gender, setGender] = useState("male")
  const [selectedHairItemId, setSelectedHairItemId] = useState<Id<"items"> | undefined>(undefined)
  const [selectedOutfitItemId, setSelectedOutfitItemId] = useState<Id<"items"> | undefined>(undefined)
  const [selectedWeaponItemId, setSelectedWeaponItemId] = useState<Id<"items"> | undefined>(undefined)
  const [selectedHairColor, setSelectedHairColor] = useState(HAIR_COLORS[0].color)
  const [selectedSkinColor, setSelectedSkinColor] = useState(SKIN_COLORS[0].color)
  const [selectedEyeColor, setSelectedEyeColor] = useState(EYE_COLORS[0].color)
  const [isCreating, setIsCreating] = useState(false)

  const hairItems = items?.filter((item) => item.type === "hair") || []
  const outfitItems = items?.filter((item) => item.type === "outfit") || []
  const weaponItems = items?.filter((item) => item.type === "weapon") || []

  useEffect(() => {
    if (items && items.length > 0 && !selectedHairItemId) {
      const firstHair = hairItems[0]
      const firstOutfit = outfitItems[0]
      const firstWeapon = weaponItems[0]
      if (firstHair) setSelectedHairItemId(firstHair._id)
      if (firstOutfit) setSelectedOutfitItemId(firstOutfit._id)
      if (firstWeapon) setSelectedWeaponItemId(firstWeapon._id)
    }
  }, [items])

  useEffect(() => {
    if (character !== undefined && character !== null) {
      router.push("/dashboard")
    }
  }, [character, router])


  const handleCreateCharacter = async () => {
    if (!characterName.trim() || !user?.id) return

    setIsCreating(true)
    try {
      await createCharacter({
        userId: user.id,
        name: characterName,
        gender,
        hairItemId: selectedHairItemId,
        outfitItemId: selectedOutfitItemId,
        weaponItemId: selectedWeaponItemId,
        hairColor: selectedHairColor,
        skinColor: selectedSkinColor,
        eyeColor: selectedEyeColor,
      })
      router.push("/dashboard")
    } catch (error) {
      console.error("Error creating character:", error)
      setIsCreating(false)
    }
  }

  const selectedHairItem = hairItems.find((item) => item._id === selectedHairItemId)
  const selectedOutfitItem = outfitItems.find((item) => item._id === selectedOutfitItemId)
  const selectedWeaponItem = weaponItems.find((item) => item._id === selectedWeaponItemId)

  if (!user || items === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#2d5016" }}>
        <p className="text-white text-xl">Loading...</p>
      </div>
    )
  }

  console.log("[v0] Items loaded:", items?.length || 0)
  console.log("[v0] Hair items:", hairItems.length)
  console.log("[v0] Outfit items:", outfitItems.length)
  console.log("[v0] Weapon items:", weaponItems.length)

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url("https://res.cloudinary.com/dq0pfesxe/image/upload/v1764614465/Indie_Game_Background_usbllg.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 items-start">
          <div className="flex flex-col items-center gap-4">
            {/* Character Preview */}
            <div className="relative">
              <CharacterPreview
                skinColor={selectedSkinColor}
                eyeColor={selectedEyeColor}
                hairColor={selectedHairColor}
                hairSvg={selectedHairItem?.svgData}
                outfitSvg={selectedOutfitItem?.svgData}
                weaponSvg={selectedWeaponItem?.svgData}
              />
            </div>

            {/* Name Input */}
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="name"
              className="w-64 px-6 py-3 text-2xl font-bold text-center bg-green-500 text-white placeholder-white/70 rounded-xl border-4 border-green-800 focus:outline-none focus:border-yellow-400 lowercase"
              maxLength={20}
              style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.3)" }}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setGender("male")}
                className={`w-16 h-16 rounded-xl font-bold transition-all flex items-center justify-center text-3xl ${gender === "male"
                  ? "bg-orange-500 border-4 border-orange-800"
                  : "bg-orange-400/60 border-4 border-orange-700/60"
                  }`}
              >
                ♂️
              </button>
              <button
                onClick={() => setGender("female")}
                className={`w-16 h-16 rounded-xl font-bold transition-all flex items-center justify-center text-3xl ${gender === "female"
                  ? "bg-orange-500 border-4 border-orange-800"
                  : "bg-orange-400/60 border-4 border-orange-700/60"
                  }`}
              >
                ♀️
              </button>
            </div>
          </div>

          <div

            style={{ maxHeight: "600px" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Hairstyle Section */}
              <div className="space-y-2">
                <h3
                  className="text-xl text-center text-white"
                >
                  hairstyle
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {hairItems.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => setSelectedHairItemId(item._id)}
                      className={`aspect-square rounded-lg transition-all flex items-center justify-center ${selectedHairItemId === item._id
                        ? "bg-white border-4 border-blue-600 shadow-lg scale-105"
                        : "bg-white/80 border-2 border-gray-400 hover:border-blue-400"
                        }`}
                    >
                      <svg width="50" height="50" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="20" fill={selectedSkinColor} />
                        <g dangerouslySetInnerHTML={{ __html: item.svgData }} />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hair Color Section */}
              <div className="space-y-2">
                <h3
                  className="text-xl text-center text-white"
                >
                  Hair Color
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {HAIR_COLORS.map((color) => (
                    <button
                      key={color.color}
                      onClick={() => setSelectedHairColor(color.color)}
                      className={`aspect-square rounded-lg transition-all ${selectedHairColor === color.color
                        ? "border-4 border-blue-600 shadow-lg scale-105"
                        : "border-2 border-gray-400 hover:border-blue-400"
                        }`}
                      style={{ backgroundColor: color.color }}
                    />
                  ))}
                </div>
              </div>

              {/* Skin Color Section */}
              <div className="space-y-2">
                <h3
                  className="text-xl text-center text-white"
                >
                  Skin Color
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {SKIN_COLORS.map((color) => (
                    <button
                      key={color.color}
                      onClick={() => setSelectedSkinColor(color.color)}
                      className={`aspect-square rounded-lg transition-all ${selectedSkinColor === color.color
                        ? "border-4 border-blue-600 shadow-lg scale-105"
                        : "border-2 border-gray-400 hover:border-blue-400"
                        }`}
                      style={{ backgroundColor: color.color }}
                    />
                  ))}
                </div>
              </div>



              {/* Outfit Section */}
              <div className="space-y-2">
                <h3
                  className="text-xl text-center text-white"
                >
                  Outfit
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {outfitItems.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => setSelectedOutfitItemId(item._id)}
                      className={`aspect-square rounded-lg transition-all flex items-center justify-center ${selectedOutfitItemId === item._id
                        ? "bg-white border-4 border-blue-600 shadow-lg scale-105"
                        : "bg-white/80 border-2 border-gray-400 hover:border-blue-400"
                        }`}
                    >
                      <svg width="50" height="50" viewBox="0 0 100 100">
                        <g dangerouslySetInnerHTML={{ __html: item.svgData }} />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weapon Section */}

            </div>
          </div>
        </div>

        <button
          onClick={handleCreateCharacter}
          disabled={!characterName.trim() || isCreating}
          className="fixed bottom-8 right-8 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-gray-900 font-bold text-3xl px-16 py-5 rounded-2xl border-4 border-yellow-700 transition-all shadow-2xl transform hover:scale-105 disabled:transform-none"
          style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.2)" }}
        >
          {isCreating ? "Creating..." : "Start"}
        </button>
      </div>
    </div>
  )
}
