import * as React from "react";
interface HpSvgProps extends React.SVGProps<SVGSVGElement> {
    greenBarRef?: React.Ref<SVGRectElement>;
}

const HpSvg = ({ greenBarRef, ...props }: HpSvgProps) => (
    <svg
        width={210}
        height={21}
        viewBox="0 0 210 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect

            y={1.77637}
            width={207.596}
            height={17.3432}
            rx={8.6716}
            fill="#FF1616"
        />
        <rect
            ref={greenBarRef}
            y={1.77637}
            width={206.127}
            height={17.3432}
            rx={8.6716}
            fill="#84FF00"
        />
        <g filter="url(#filter0_dd_377_6)">
            <rect
                x={1.49999}
                y={3.27638}
                width={204.596}
                height={14.3432}
                rx={7.1716}
                stroke="black"
                strokeWidth={3}
                shapeRendering="crispEdges"
            />
        </g>
        <defs>
            <filter
                id="filter0_dd_377_6"
                x={0}
                y={0.000255525}
                width={209.372}
                height={20.8969}
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
                <feOffset dx={1.3582} dy={1.3582} />
                <feGaussianBlur stdDeviation={0.208954} />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_377_6"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dx={0.73134} dy={-1.3582} />
                <feGaussianBlur stdDeviation={0.208954} />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                    mode="normal"
                    in2="effect1_dropShadow_377_6"
                    result="effect2_dropShadow_377_6"
                />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_377_6"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
);
export default HpSvg;
