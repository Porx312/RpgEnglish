'use client'; // ← Necesario si estás en App Router y usas eventos como hover

import { InventoryModal } from '@/shared/components/inventory/InventoryModal';
import { ShopModal } from '@/shared/components/shop/ShopModal';
import { Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

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

export const Menu: React.FC<MenuProps> = () => {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false)
  const [isShopOpen, setIsShopOpen] = useState(false)
  let options = [
    { url: '/blattle', src: '/icons-menu/battle.png', name: 'Battle' },
    { url: '/adventure', src: '/icons-menu/map.png', name: 'Adventure' },

  ]
  return (
    <>
      <div className="fixed md:bottom-8 bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none md:bg-transparent w-full bg-black flex items-center p-1 justify-center  ">
        <div className="flex gap-6 pointer-events-auto">
          {options.map((item, index) => (
            <Link href={item.url} key={index} passHref legacyBehavior>
              <a className="block">
                <button
                  aria-label={item.name}
                  className="
    relative group                  /* para efectos hover */
    w-24  h-20 
    md:w-24 md:h-20
    bg-gradient-to-b bg-[#373342]
    rounded-2xl 
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
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-70 pointer-events-none" />
                  {/* Runas o marco inferior estilo RPG */}

                </button>
              </a>
            </Link>
          ))}
          <button
            onClick={() => setIsInventoryOpen(true)}
            className="relative group 
    w-24  h-20 
    md:w-24 md:h-20
    bg-gradient-to-b bg-[#373342]
    rounded-2xl 
    shadow-2xl 
    flex flex-col items-center justify-center 
    overflow-hidden
    transition-all duration-300
    hover:scale-110 hover:shadow-orange-800 hover:shadow-3xl
    active:scale-95 active:duration-100
    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-800/80
  "
          >
            <Image
              src={'/icons-menu/inventory.png'}
              alt={'inventory'}
              width={56}
              height={56}
              className="relative z-10 drop-shadow-2xl 
               group-hover:brightness-110 
               group-active:brightness-125 
               transition-all duration-300"
            />
          </button>
          <button
            onClick={() => setIsShopOpen(true)}
            className="relative group 
    w-24  h-20 
    md:w-24 md:h-20
    bg-gradient-to-b bg-[#373342]
    rounded-2xl 
    shadow-2xl 
    flex flex-col items-center justify-center 
    overflow-hidden
    transition-all duration-300
    hover:scale-110 hover:shadow-orange-800 hover:shadow-3xl
    active:scale-95 active:duration-100
    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-800/80
  "
          >
            <Image
              src={'/icons-menu/store.png'}
              alt={'store'}
              width={56}
              height={56}
              className="relative z-10 drop-shadow-2xl 
               group-hover:brightness-110 
               group-active:brightness-125 
               transition-all duration-300"
            />
          </button>
        </div>
      </div>
      <InventoryModal isOpen={isInventoryOpen} onClose={() => setIsInventoryOpen(false)} />
      <ShopModal isOpen={isShopOpen} onClose={() => setIsShopOpen(false)} />
    </>
  );
};