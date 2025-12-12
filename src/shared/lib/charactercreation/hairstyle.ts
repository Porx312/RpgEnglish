export interface HairstyleOption {
  id: string
  name: string
  svgPath: string
}

export const HAIRSTYLES: HairstyleOption[] = [
  {
    id: "short",
    name: "Short",
    svgPath: "M 30 30 Q 30 20 50 20 Q 70 20 70 30 L 65 28 Q 50 15 35 28 Z",
  },
  {
    id: "long",
    name: "Long",
    svgPath: "M 30 25 Q 30 15 50 15 Q 70 15 70 25 L 68 40 Q 50 45 32 40 Z",
  },
  {
    id: "curly",
    name: "Curly",
    svgPath:
      "M 30 28 Q 28 20 35 18 Q 38 22 40 18 Q 42 22 45 18 Q 48 22 50 18 Q 52 22 55 18 Q 58 22 60 18 Q 62 22 65 18 Q 72 20 70 28",
  },
  {
    id: "spiky",
    name: "Spiky",
    svgPath: "M 32 30 L 35 15 L 38 30 L 42 12 L 45 30 L 50 10 L 55 30 L 58 12 L 62 30 L 65 15 L 68 30",
  },
  {
    id: "ponytail",
    name: "Ponytail",
    svgPath: "M 30 25 Q 30 18 50 18 Q 70 18 70 25 L 70 30 Q 72 35 68 38 L 65 45",
  },
  {
    id: "braids",
    name: "Braids",
    svgPath: "M 30 25 Q 30 18 40 18 L 38 45 M 70 25 Q 70 18 60 18 L 62 45",
  },
  {
    id: "mohawk",
    name: "Mohawk",
    svgPath: "M 45 30 L 48 10 L 50 8 L 52 10 L 55 30",
  },
  {
    id: "wavy",
    name: "Wavy",
    svgPath: "M 30 25 Q 30 15 35 18 Q 40 21 45 18 Q 50 15 55 18 Q 60 21 65 18 Q 70 15 70 25",
  },
  {
    id: "bald",
    name: "Bald",
    svgPath: "",
  },
]
