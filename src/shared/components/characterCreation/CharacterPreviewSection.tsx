"use client"

import { CharacterPreview } from "../AvatarPreview/CharacterPreview"


interface CharacterPreviewSectionProps {
    skinColor: string
    eyeColor: string
    hairColor: string
    hairSvg?: string
    outfitSvg?: string
    weaponSvg?: string
    name: string
    onNameChange: (name: string) => void
    gender: "male" | "female"
    onGenderChange: (gender: "male" | "female") => void
}

export function CharacterPreviewSection({
    skinColor,
    eyeColor,
    hairColor,
    hairSvg,
    outfitSvg,
    weaponSvg,
    name,
    onNameChange,
    gender,
    onGenderChange,
}: CharacterPreviewSectionProps) {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative">
                <CharacterPreview
                    skinColor={skinColor}
                    eyeColor={eyeColor}
                    hairColor={hairColor}
                    hairSvg={hairSvg}
                    outfitSvg={outfitSvg}
                    weaponSvg={weaponSvg}
                />
            </div>

            <input
                type="text"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="name"
                className="w-64 px-6 py-3 text-2xl font-bold text-center bg-green-500 text-white placeholder-white/70 rounded-xl border-4 border-green-800 focus:outline-none focus:border-yellow-400 lowercase"
                maxLength={20}
                style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.3)" }}
            />

            <div className="flex gap-3">
                <button
                    onClick={() => onGenderChange("male")}
                    className={`w-16 h-16 rounded-xl font-bold transition-all flex items-center justify-center text-3xl ${gender === "male"
                        ? "bg-orange-500 border-4 border-orange-800"
                        : "bg-orange-400/60 border-4 border-orange-700/60"
                        }`}
                >
                    M
                </button>
                <button
                    onClick={() => onGenderChange("female")}
                    className={`w-16 h-16 rounded-xl font-bold transition-all flex items-center justify-center text-3xl ${gender === "female"
                        ? "bg-orange-500 border-4 border-orange-800"
                        : "bg-orange-400/60 border-4 border-orange-700/60"
                        }`}
                >
                    F
                </button>
            </div>
        </div>
    )
}
