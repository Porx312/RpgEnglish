/**
 * Utility functions to wrap database SVG strings with animation data attributes
 */

export function wrapSvgWithDataPart(svgString: string, partName: string): string {
    // Remove any existing svg tags and wrap content in g with data-part
    const svgContent = svgString
        .replace(/<svg[^>]*>/gi, "")
        .replace(/<\/svg>/gi, "")
        .trim()

    return `<g data-part="${partName}">${svgContent}</g>`
}

export interface SvgParts {
    hair?: string
    outfit?: string
    weapon?: string
    accessory?: string
}

/**
 * Wraps multiple SVG parts from database with proper data-part attributes
 */
export function prepareSvgPartsForAnimation(svgParts: SvgParts): {
    hairSvg?: string
    outfitSvg?: string
    weaponSvg?: string
    accessorySvg?: string
} {
    return {
        hairSvg: svgParts.hair ? wrapSvgWithDataPart(svgParts.hair, "hair") : undefined,
        outfitSvg: svgParts.outfit ? wrapSvgWithDataPart(svgParts.outfit, "body") : undefined,
        weaponSvg: svgParts.weapon ? wrapSvgWithDataPart(svgParts.weapon, "weapon") : undefined,
        accessorySvg: svgParts.accessory ? wrapSvgWithDataPart(svgParts.accessory, "accessory") : undefined,
    }
}
