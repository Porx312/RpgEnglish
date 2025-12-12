interface HPBarProps {
    playerHP: number; // Valor de 0 a 100
}

const HPBar: React.FC<HPBarProps> = ({ playerHP }) => {
    const hpPercent = Math.max(0, Math.min(playerHP, 100));

    // Ancho total de la barra dentro del SVG
    const totalWidth = 304.263 - 25.7627;
    const greenWidth = (hpPercent / 100) * totalWidth;

    return (
        <div className="w-full">
            <svg
                width="324"
                height="52"
                viewBox="0 0 324 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
            >
                {/* Barra roja de fondo */}
                <path
                    d="M24.7627 48.5C9.96267 25.3 18.596 8.16667 24.7627 2.5H295.263C312.063 22.9 302.263 41.6667 295.263 48.5H24.7627Z"
                    fill="#ff0000"
                />

                {/* Barra verde animada usando rect dentro del g */}
                <g>
                    <rect
                        x="21.7627"
                        y="2.5"

                        width={greenWidth}
                        height={46}
                        fill="#57D738"
                        rx={10}
                        style={{ transition: "width 0.5s ease-in-out" }}
                    />
                </g>

                {/* Contorno */}
                <path
                    d="M24.7627 48.5C9.96267 25.3 18.596 8.16667 24.7627 2.5H295.263C312.063 22.9 302.263 41.6667 295.263 48.5H24.7627Z"
                    stroke="#844C32"
                    strokeWidth="5"
                />

                {/* Triángulos decorativos */}
                <g filter="url(#filter1_i_273_17)">
                    <path d="M3.2627 26L14.6081 14L27.2627 26.5L13.7354 40L3.2627 26Z" fill="#D51C12" />
                </g>
                <path d="M3.2627 26L14.6081 14L27.2627 26.5L13.7354 40L3.2627 26Z" stroke="#844C32" strokeWidth="5" />

                <g filter="url(#filter2_i_273_17)">
                    <path d="M296.263 26L307.608 14L320.263 26.5L306.735 40L296.263 26Z" fill="#D51C12" />
                </g>
                <path d="M296.263 26L307.608 14L320.263 26.5L306.735 40L296.263 26Z" stroke="#844C32" strokeWidth="5" />

                {/* Filtros */}
                <defs>
                    <filter id="filter1_i_273_17" x="0" y="6.42578" width="34.811" height="37.3809" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dx="6" dy="-4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_273_17" />
                    </filter>

                    <filter id="filter2_i_273_17" x="293" y="6.42578" width="34.811" height="37.3809" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_273_17" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default HPBar;
