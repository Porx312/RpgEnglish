export interface OutfitOption {
  id: string
  name: string
  bodyColor: string
  armsColor: string
}

export const OUTFITS: OutfitOption[] = [
  {
    id: "tunic-brown",
    name: "Brown Tunic",
    bodyColor: "#8B6914",
    armsColor: "#8B6914",
  },
  {
    id: "tunic-green",
    name: "Green Tunic",
    bodyColor: "#4A7C59",
    armsColor: "#4A7C59",
  },
  {
    id: "tunic-blue",
    name: "Blue Tunic",
    bodyColor: "#4682B4",
    armsColor: "#4682B4",
  },
  {
    id: "tunic-red",
    name: "Red Tunic",
    bodyColor: "#DC143C",
    armsColor: "#DC143C",
  },
  {
    id: "armor-silver",
    name: "Silver Armor",
    bodyColor: "#C0C0C0",
    armsColor: "#A9A9A9",
  },
  {
    id: "armor-gold",
    name: "Gold Armor",
    bodyColor: "#FFD700",
    armsColor: "#DAA520",
  },
  {
    id: "robe-purple",
    name: "Purple Robe",
    bodyColor: "#8B008B",
    armsColor: "#9932CC",
  },
  {
    id: "robe-white",
    name: "White Robe",
    bodyColor: "#F5F5F5",
    armsColor: "#DCDCDC",
  },
]
