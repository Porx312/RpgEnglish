"use client";

import * as React from "react";

interface SoundButtonWrapperProps {
  children: React.ReactNode;
  soundUrl?: string; // URL del sonido a reproducir
  volume?: number; // 0 a 1, opcional
}

export const SoundButtonWrapper = ({
  children,
  soundUrl = "/sounds/pop.mp3",
  volume = 0.5,
}: SoundButtonWrapperProps) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Creamos el audio solo una vez
  React.useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(soundUrl);
      audioRef.current.volume = volume;
    }
  }, [soundUrl, volume]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      // Reiniciamos el sonido si ya está sonando
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => console.warn(err));
    }

    // Si el hijo es un botón, llamamos al onClick original
    const target = e.target as HTMLElement;
    if (target.tagName === "BUTTON") {
      target.click();
    }
  };

  return (
    <div onClick={handleClick} className="inline-block">
      {children}
    </div>
  );
};
