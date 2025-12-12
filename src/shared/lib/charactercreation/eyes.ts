export interface EyeOption {
  id: string
  name: string
  svgPath: string
}

export const EYE_STYLES: EyeOption[] = [
  {
    id: "round",
    name: "Round",
    svgPath: "circle",
  },
  {
    id: "almond",
    name: "Almond",
    svgPath: "M 40 32 Q 43 30 46 32 Q 43 34 40 32",
  },
  {
    id: "wide",
    name: "Wide",
    svgPath: "ellipse-wide",
  },
  {
    id: "narrow",
    name: "Narrow",
    svgPath: "M 41 32 L 45 32",
  },
]

export interface ColorOption {
  color: string
  name: string
}

export const EYE_COLORS: ColorOption[] = [
  { color: "#000000", name: "Void Black" },
];
