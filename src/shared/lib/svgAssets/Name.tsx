import * as React from "react";
const NameMarco = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width={280}
        height={50}
        viewBox="0 0 280 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g filter="url(#filter0_ii_296_2)">
            <path
                d="M278.8 26.3008L257.8 1.80078L20.2998 1.30078L0.799805 24.8008L21.2998 49.3008H257.8L278.8 26.3008Z"
                fill="#98673C"
            />
        </g>
        <path
            d="M278.8 26.3008L257.8 1.80078L20.2998 1.30078L0.799805 24.8008L21.2998 49.3008H257.8L278.8 26.3008Z"
            stroke="#331709"
        />
        <g filter="url(#filter1_dii_296_2)">
            <path
                d="M22.7998 5.80078L256.3 6.80078L271.3 26.3008L255.3 43.8134H23.0092L7.7998 24.8008L22.7998 5.80078Z"
                fill="#4B2B1D"
            />
        </g>

        <defs>
            <filter
                id="filter0_ii_296_2"
                x={-0.851074}
                y={-1.19922}
                width={280.318}
                height={51.7}
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy={2} />
                <feGaussianBlur stdDeviation={0.35} />
                <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.31 0"
                />
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_296_2" />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dx={-1} dy={-2} />
                <feGaussianBlur stdDeviation={2} />
                <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                    mode="normal"
                    in2="effect1_innerShadow_296_2"
                    result="effect2_innerShadow_296_2"
                />
            </filter>
            <filter
                id="filter1_dii_296_2"
                x={-0.000195503}
                y={0.000781059}
                width={274.3}
                height={47.8117}
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
                <feOffset dx={-3} dy={-1} />
                <feGaussianBlur stdDeviation={2.4} />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_296_2"
                />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_296_2"
                    result="shape"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dx={3} dy={-3} />
                <feGaussianBlur stdDeviation={2} />
                <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_296_2" />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dx={3} dy={4} />
                <feGaussianBlur stdDeviation={2} />
                <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                    mode="normal"
                    in2="effect2_innerShadow_296_2"
                    result="effect3_innerShadow_296_2"
                />
            </filter>
        </defs>
    </svg>
);
export default NameMarco;
