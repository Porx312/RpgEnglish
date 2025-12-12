
export interface AnimationConfig {
  type: AnimationType
  duration: number
  loop: boolean
}


export interface CharacterAnimationsProps {
  skinColor: string
  eyeColor: string
  hairColor: string
  hairSvg?: string
  outfitSvg?: string
  weaponSvg?: string
  animation?: "idle" | "attack" | "hurt" | "heal" | "victory" | "defend"
  className?: string
  accesorysvg?: string
}

export type AnimationType = "idle" | "attack" | "hurt" | "heal" | "victory" | "defend"
