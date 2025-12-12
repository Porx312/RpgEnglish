'use client'; // ← Necesario si estás en App Router y usas eventos como hover

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Definimos la interfaz para cada ítem del menú
interface MenuItem {
  url: string;
  src: string;
  name: string;
}

// Props del componente Menu (un array de MenuItem)
interface MenuProps {
  options: MenuItem[];
}

export const Menu: React.FC<MenuProps> = ({ options }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
      <div className="flex gap-6 pointer-events-auto">
        {options.map((item, index) => (
          <Link href={item.url} key={index} passHref legacyBehavior>
            <a className="block">
              <button
                aria-label={item.name}
                className="
    relative group                  /* para efectos hover */
    w-20 h-20 
    bg-gradient-to-b bg-[#946945]
    rounded-2xl 
    border-4 border-black 
    shadow-2xl 
    flex flex-col items-center justify-center 
    overflow-hidden
    transition-all duration-300
    hover:scale-110 hover:shadow-orange-800 hover:shadow-3xl
    active:scale-95 active:duration-100
    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-800/80
  "
              >
                {/* Brillo superior (luz divina) */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-70 pointer-events-none" />

                {/* Icono grande */}
                <Image
                  src={item.src}
                  alt={item.name}
                  width={56}
                  height={56}
                  className="relative z-10 drop-shadow-2xl 
               group-hover:brightness-110 
               group-active:brightness-125 
               transition-all duration-300"
                />

                {/* Bordes dorados brillantes al hover */}
                {/* Runas o marco inferior estilo RPG */}

              </button>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};