"use client"

import type * as React from "react"
import { useEffect, useState } from "react"

const GameFrameSvg = (props: React.SVGProps<SVGSVGElement>) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (isMobile) {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 702 1020"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        {...props}
      >
        <g filter="url(#filter0_diii_348_2515)">
          <rect x={-29} y={3} width={772} height={1010} rx={199} fill="#FFF7F0" />
          <rect x={-26.5} y={5.5} width={767} height={1005} rx={196.5} stroke="#7E5343" strokeWidth={5} />
        </g>
        <defs>
          <filter
            id="filter0_diii_348_2515"
            x={-31}
            y={-1}
            width={782}
            height={1021}
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
            <feMorphology radius={5} operator="dilate" in="SourceAlpha" result="effect1_dropShadow_348_2515" />
            <feOffset dx={3} dy={2} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.305882 0 0 0 0 0.156863 0 0 0 0 0.0745098 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_348_2515" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_348_2515" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy={9} />
            <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
            <feColorMatrix type="matrix" values="0 0 0 0 0.305882 0 0 0 0 0.156863 0 0 0 0 0.0745098 0 0 0 1 0" />
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_348_2515" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy={21} />
            <feGaussianBlur stdDeviation={2} />
            <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="effect2_innerShadow_348_2515" result="effect3_innerShadow_348_2515" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy={-19} />
            <feGaussianBlur stdDeviation={2} />
            <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="effect3_innerShadow_348_2515" result="effect4_innerShadow_348_2515" />
          </filter>
        </defs>
      </svg>
    )
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1000 641"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      {...props}
    >
      <g filter="url(#filter0_diii_347_1384)">
        <rect x={1.43848} y={2.1582} width={992} height={633} rx={143.136} fill="#FFF7F0" />
        <rect
          x={3.23666}
          y={3.95639}
          width={988.404}
          height={629.404}
          rx={141.338}
          stroke="#7E5343"
          strokeWidth={3.59637}
        />
      </g>
      <defs>
        <filter
          id="filter0_diii_347_1384"
          x={-0.0000731945}
          y={-0.718897}
          width={999.193}
          height={640.912}
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
          <feMorphology radius={3.59637} operator="dilate" in="SourceAlpha" result="effect1_dropShadow_347_1384" />
          <feOffset dx={2.15782} dy={1.43855} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.305882 0 0 0 0 0.156863 0 0 0 0 0.0745098 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_347_1384" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_347_1384" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={6.47347} />
          <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
          <feColorMatrix type="matrix" values="0 0 0 0 0.305882 0 0 0 0 0.156863 0 0 0 0 0.0745098 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_347_1384" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={15.1048} />
          <feGaussianBlur stdDeviation={1.43855} />
          <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="effect2_innerShadow_347_1384" result="effect3_innerShadow_347_1384" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={-13.6662} />
          <feGaussianBlur stdDeviation={1.43855} />
          <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="effect3_innerShadow_347_1384" result="effect4_innerShadow_347_1384" />
        </filter>
      </defs>
    </svg>
  )
}

export default GameFrameSvg
