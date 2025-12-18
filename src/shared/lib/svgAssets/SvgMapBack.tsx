import * as React from "react";

const SvgMapBack = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 1751 328"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full absolute inset-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g filter="url(#filter0_di_347_1151)">
            <rect
                x={-53}
                y={13.9473}
                width={1935}
                height={338}
                rx={65.5971}
                fill="#502D1B"
            />
            <rect
                x={-51.4078}
                y={15.5394}
                width={1931.82}
                height={334.816}
                rx={64.005}
                stroke="#3F1601"
                strokeWidth={3.18433}
            />
        </g>

        <defs>
            <filter
                id="filter0_di_347_1151"
                x={-60.5787}
                y={-0.0000858307}
                width={1959.33}
                height={368.697}
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy={-6.36865} />
                <feGaussianBlur stdDeviation={3.78935} />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_347_1151" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_347_1151" result="shape" />
            </filter>
        </defs>
    </svg>
);

export default SvgMapBack;
