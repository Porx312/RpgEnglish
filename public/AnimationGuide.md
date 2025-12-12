# Sistema de Animaciones con GSAP

Este sistema permite animar personajes SVG usando GSAP con soporte completo para SVGs dinámicos de base de datos.

## Cómo Funciona

El sistema utiliza atributos `data-part` para identificar las partes del personaje que serán animadas. Esto permite que las animaciones funcionen con cualquier SVG, ya sea estático o cargado desde una base de datos.

### Partes Animables

Cada parte del personaje debe tener un atributo `data-part`:

- `data-part="head"` - Cabeza
- `data-part="body"` - Cuerpo/Torso
- `data-part="arm-left"` - Brazo izquierdo
- `data-part="arm-right"` - Brazo derecho
- `data-part="leg-left"` - Pierna izquierda
- `data-part="leg-right"` - Pierna derecha
- `data-part="weapon"` - Arma
- `data-part="eyes"` - Ojos
- `data-part="accessory"` - Accesorios

## Animaciones Disponibles

1. **idle** - Respiración suave y parpadeo
2. **attack** - Golpe de ataque con arma
3. **hurt** - Recibe daño con shake y flash rojo
4. **heal** - Curación con brillo verde
5. **victory** - Celebración de victoria
6. **defend** - Posición defensiva

## Uso con SVGs de Base de Datos

### Ejemplo: Obtener SVGs de la base de datos

\`\`\`typescript
// Ejemplo de obtención de datos de base de datos
const character = await db.query(`
  SELECT 
    hair_svg,
    outfit_svg,
    weapon_svg,
    accessory_svg
  FROM characters
  WHERE id = $1
`, [characterId])

// Preparar los SVGs para animación
import { prepareSvgPartsForAnimation } from '@/lib/svg-wrapper'

const svgParts = prepareSvgPartsForAnimation({
  hair: character.hair_svg,
  outfit: character.outfit_svg,
  weapon: character.weapon_svg,
  accessory: character.accessory_svg,
})
\`\`\`

### Ejemplo: Usar en componente

\`\`\`tsx
import { CharacterAnimations } from '@/components/character-animations'

export default function CharacterDisplay({ character }) {
  const [animation, setAnimation] = useState('idle')

  // Preparar SVGs de base de datos
  const svgParts = prepareSvgPartsForAnimation({
    hair: character.hairSvg,
    outfit: character.outfitSvg,
    weapon: character.weaponSvg,
    accessory: character.accessorySvg,
  })

  return (
    <CharacterAnimations
      skinColor={character.skinColor}
      eyeColor={character.eyeColor}
      hairColor={character.hairColor}
      hairSvg={svgParts.hairSvg}
      outfitSvg={svgParts.outfitSvg}
      weaponSvg={svgParts.weaponSvg}
      accesorysvg={svgParts.accessorySvg}
      animation={animation}
    />
  )
}
\`\`\`

## Crear Nuevas Animaciones

Para agregar una nueva animación, edita `hooks/use-character-animations.ts`:

\`\`\`typescript
const playCustomAnimation = useCallback(() => {
  if (!containerRef.current) return null

  const timeline = gsap.timeline()
  
  // Obtener partes usando data-part
  const body = containerRef.current.querySelector('[data-part="body"]')
  const armRight = containerRef.current.querySelector('[data-part="arm-right"]')
  
  // Crear animación
  if (body) {
    timeline.to(body, {
      y: -20,
      duration: 0.5,
      ease: "power2.out"
    })
  }
  
  return timeline
}, [containerRef])
\`\`\`

## Formato de SVG en Base de Datos

Los SVGs guardados en la base de datos pueden estar en cualquier formato. La función `wrapSvgWithDataPart` los preparará automáticamente:

\`\`\`sql
-- Ejemplo de estructura de tabla
CREATE TABLE character_assets (
  id SERIAL PRIMARY KEY,
  hair_svg TEXT,
  outfit_svg TEXT,
  weapon_svg TEXT,
  accessory_svg TEXT
);

-- Los SVGs pueden ser simples paths o grupos complejos
INSERT INTO character_assets (weapon_svg) VALUES (
  '<path d="M100 100 L200 200" fill="silver"/>'
);
\`\`\`

## Ventajas del Sistema

- Funciona con SVGs estáticos y dinámicos
- No requiere refs específicos
- Fácil de extender con nuevas animaciones
- Compatible con cualquier estructura de SVG
- Separa la lógica de animación de los componentes
