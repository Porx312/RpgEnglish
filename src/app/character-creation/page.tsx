"use client"

import { CharacterPreviewSection } from "@/shared/components/characterCreation/CharacterPreviewSection"
import { CustomizationGrid } from "@/shared/components/characterCreation/CustomizationGrid"
import { useCharacterCreation } from "@/shared/hooks/use-character-creation"
import { HAIR_COLORS, SKIN_COLORS } from "@/shared/lib/charactercreation/colors"
import { useCharacterCreationStore } from "@/shared/store/use-character-creation.store"

export default function CharacterCreation() {
  const { user, items, handleCreateCharacter } = useCharacterCreation()
  const store = useCharacterCreationStore()

  const hairItems = items?.filter((item) => item.type === "hair") || []
  const outfitItems = items?.filter((item) => item.type === "outfit") || []

  const selectedHairItem = hairItems.find((item) => item._id === store.selectedHairItemId)
  const selectedOutfitItem = outfitItems.find((item) => item._id === store.selectedOutfitItemId)

  if (!user || items === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#2d5016" }}>
        <p className="text-white text-xl">Loading...</p>
      </div>
    )
  }

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
          <CharacterPreviewSection
            skinColor={store.selectedSkinColor}
            eyeColor={store.selectedEyeColor}
            hairColor={store.selectedHairColor}
            hairSvg={selectedHairItem?.svgData}
            outfitSvg={selectedOutfitItem?.svgData}
            name={store.characterName}
            onNameChange={store.setCharacterName}
            gender={store.gender}
            onGenderChange={store.setGender}
          />

          <CustomizationGrid
            hairItems={hairItems}
            outfitItems={outfitItems}
            hairColors={HAIR_COLORS}
            skinColors={SKIN_COLORS}
            selectedHairId={store.selectedHairItemId}
            selectedOutfitId={store.selectedOutfitItemId}
            selectedHairColor={store.selectedHairColor}
            selectedSkinColor={store.selectedSkinColor}
            onSelectHair={store.setSelectedHairItemId}
            onSelectOutfit={store.setSelectedOutfitItemId}
            onSelectHairColor={store.setSelectedHairColor}
            onSelectSkinColor={store.setSelectedSkinColor}
            currentSkinColor={store.selectedSkinColor}
          />
        </div>

        <button
          onClick={handleCreateCharacter}
          disabled={!store.characterName.trim() || store.isCreating}
          className="fixed bottom-8 right-8 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-gray-900 font-bold text-3xl px-16 py-5 rounded-2xl border-4 border-yellow-700 transition-all shadow-2xl transform hover:scale-105 disabled:transform-none"
          style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.2)" }}
        >
          {store.isCreating ? "Creating..." : "Start"}
        </button>
      </div>
    </div>
  )
}
