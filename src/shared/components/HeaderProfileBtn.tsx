"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { ProfilePreview } from "./AvatarPreview/ProfilePreview";

export default function ProfileDropdown() {
  const { openUserProfile, signOut } = useClerk();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) return null;

  return (
    <div ref={ref} className="relative">
      {/* AVATAR */}
      <div
        onClick={() => setOpen(!open)}
        className="w-24 h-20 bg-yellow-400 bg-gradient-to-r from-orange-500 flex items-center justify-center rounded-lg overflow-hidden border-4 border-black cursor-pointer"
      >
        <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center overflow-hidden border-2 border-black">
          <ProfilePreview
            className="w-12 h-12"
            skinColor="#D4A574"
            eyeColor="#000000"
            hairColor="#8B4513"
            hairSvg=""
            accesorysvg=""
          />
        </div>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0  mt-3 w-56 rounded-xl border-2 border-black bg-yellow-500 p-2 z-100">
          <div className="bg-orange-500 rounded-lg  flex items-center justify-center  border-2 border-black">

            <button
              onClick={() => signOut({ redirectUrl: "/" })}
              className="w-full px-4 py-2 text-left text-sm font-bold text-red-700 hover:bg-orange-400"
            >
              Cerrar sesión
            </button>
          </div>
          <div className="bg-orange-500 mt-2 rounded-lg flex items-center justify-center  border-2 border-black">

            <button
              onClick={() => {
                openUserProfile();
                setOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm font-bold text-black hover:bg-orange-400"
            >
              Perfil
            </button>
          </div>




        </div>
      )}
    </div>
  );
}
