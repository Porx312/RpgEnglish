"use client"

import { useState } from "react"
import type { AnimationType } from "@/shared/interface/AnimationType.interface"
import { prepareSvgPartsForAnimation } from "@/shared/lib/svgAssets/svgWrapper"
import { CharacterPreview } from "@/shared/components/AvatarPreview/CharacterPreview"

const mockDatabaseCharacter = {
    skinColor: "#D4A574",
    eyeColor: "#2ECC71",
    hairColor: "#E74C3C",
    weaponSvg: `
<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 790 974" width="790" height="974">
	<defs>
		<image width="378" height="153" id="img1" href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzc4IiBoZWlnaHQ9IjE1MyIgdmlld0JveD0iMCAwIDM3OCAxNTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2lfMjY1XzE4KSI+CjxwYXRoIGQ9Ik0zNjkuOTA5IDQ3LjM5QzM1MS4yNTggMjkuOTA4MiAyODIuNDc3IDI3LjI3NDEgMjY3Ljg0NCAyNy42NDU2QzI1Ni45ODIgMjcuOTIxNCAxOTMuODkgMzcuODgxMSAxNTcuMTA2IDQzLjg5ODRDMTU0LjI0NiA0NC4zNjYyIDE1MS41NDUgNDQuODEwMiAxNDkuMDQgNDUuMjI0TDE1OS41NzcgMTE2LjQzMkMxODAuMzAxIDExMy4yOCAyMzEuOTA3IDEwNS41MjUgMjcyLjU0MSA5OS43MTc0QzMyMy4zMzQgOTIuNDU4MyAzNjAuMjAxIDU5LjMzMTQgMzY5LjkwOSA0Ny4zOVoiIGZpbGw9IiNBOUE5QTkiLz4KPC9nPgo8cGF0aCBkPSJNMzY5LjkwOSA0Ny4zOUMzNTEuMjU4IDI5LjkwODIgMjgyLjQ3NyAyNy4yNzQxIDI2Ny44NDQgMjcuNjQ1NkMyNTYuOTgyIDI3LjkyMTQgMTkzLjg5IDM3Ljg4MTEgMTU3LjEwNiA0My44OTg0QzE1NC4yNDYgNDQuMzY2MiAxNTEuNTQ1IDQ0LjgxMDIgMTQ5LjA0IDQ1LjIyNEwxNTkuNTc3IDExNi40MzJDMTgwLjMwMSAxMTMuMjggMjMxLjkwNyAxMDUuNTI1IDI3Mi41NDEgOTkuNzE3NEMzMjMuMzM0IDkyLjQ1ODMgMzYwLjIwMSA1OS4zMzE0IDM2OS45MDkgNDcuMzlaIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjQuMjMxMTIiLz4KPHBhdGggZD0iTTE1Mi4xNTggNjYuMjg0QzE5Ni43NjYgNTcuNTQ4NyAyODYuNDAxIDQ0LjE2NjUgMjg4LjA4NyA2MC41MjAzQzI4OS45MDQgNzIuODA2MiAyMTUuMzggODQuMDg5MSAxNTcuNyA5Mi44Nzk4IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjQuMjMxMTIiLz4KPHBhdGggZD0iTTI4OC4zMSA2MC40ODc4TDM2OC4yNjEgNDguNjU4MSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSI0LjIzMTEyIi8+CjxwYXRoIGQ9Ik03Mi4wMzE1IDk4LjYzODVDNjguMTA5NCAxMDIuNjM1IDYwLjQxMjcgMTEyLjI0NiA2MS4wMDMxIDExOC43MTgiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iNC4yMzExMiIvPgo8cGF0aCBkPSJNNjIuOTk0OSAxMTIuMDE3QzUzLjgwNjcgMTA3LjgyNSAzNC4yOTE1IDk0LjUzNjIgMjkuNzM2MyA3NC45MTc1IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjQuMjMxMTIiLz4KPHBhdGggZD0iTTQ1Ljk0NTUgMTAwLjcwM0M0Mi4xMzc0IDEwMy40MDIgMzQuNTQ3NSAxMTEuNDYgMzQuNjUzNSAxMjIuMTAzIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjQuMjMxMTIiLz4KPHBhdGggZD0iTTM1LjQ4NDcgMTE1LjMxOUMyNi4zODcgMTA4LjYzNyA4LjY5NzU5IDkxLjg2NzIgMTAuNzIxMSA3OC4yNDQzIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjQuMjMxMTIiLz4KPHBhdGggZD0iTTIxLjkxNjYgMTAyLjcyM0MxOC45MTY5IDEwNy4yNjYgMTIuOTI0IDExNy4wMTggMTIuOTUwNSAxMTkuNjc5IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjQuMjMxMTIiLz4KPHBhdGggZD0iTTE0My4xNDcgODkuMTQwOUMxMzUuMDY3IDk2LjU3MTIgMTE5LjA2OCAxMTIuODQzIDExOS43MiAxMTguNDg2IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjQuMjMxMTIiLz4KPHBhdGggZD0iTTE0Ni41MjUgMTA4Ljg4NEMxNDIuOTA1IDExMC43ODcgMTM1LjA0OSAxMTYuNjI5IDEzMi41ODMgMTI0Ljc4MyIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSI0LjIzMTEyIi8+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIxX2lfMjY1XzE4KSI+CjxwYXRoIGQ9Ik0xMDUuMTQyIDU5LjQwNjZDOTguMTkyNiA2Mi42ODk2IDkzLjg3ODQgNjMuODkxNiA5Mi41OSA2NC4wODIyTDE1LjUxMTcgNzUuNDg2OEMxMS43NzE3IDc2LjM4MTggNC40OTc0NiA4MC4xOTExIDUuMzIwODEgODguMjY4M0M2LjE0NDE3IDk2LjM0NTUgOC41MzI4MSAxMTEuMDI0IDkuNjI0MjEgMTE3LjM1M0MxMC45Mjc4IDEyMC40MDUgMTYuMTE5NSAxMjYuMDc3IDI2LjQ1NzggMTI0LjM0MkMzNi43OTYyIDEyMi42MDggODQuOTAxIDExNi44MDUgMTA3LjY2MSAxMTQuMTIxQzExNC40NTUgMTE0LjA5MyAxMzguNDM5IDEyOC42MDkgMTUxLjg1MSAxMzAuOTFDMTU2LjIzNiAxMzEuNjYzIDE1OS40OTEgMTMxLjExIDE2MC42NDUgMTI4LjMxNkMxNjEuNjQxIDEyNS45MDcgMTM5LjY0OCAzNS45MzEgMTQ4LjE0MSAzMS44NDE3QzE0OC4zMTggMzEuNzkzNyAxNDguNDkxIDMxLjc0NzQgMTQ4LjY2MiAzMS43MDI1QzE0OC40NzcgMzEuNzE2NyAxNDguMzAzIDMxLjc2MzUgMTQ4LjE0MSAzMS44NDE3QzE0NC45MjggMzIuNzEzOCAxNDAuNzM3IDM0LjEwMDggMTM2LjE5OCAzNS45NzYxQzEyNC42MjQgNDAuNzU4MSAxMTAuNzg5IDQ4LjcxNTIgMTA1LjE0MiA1OS40MDY2WiIgZmlsbD0iIzM3MzczNyIvPgo8L2c+CjxwYXRoIGQ9Ik0xNDguNjc0IDMxLjY5OTVDMTQ1LjM5OCAzMi41NTkzIDE0MC45OTIgMzMuOTk1MyAxMzYuMTk4IDM1Ljk3NjFNMTQ4LjY3MiAzMS43MDE4QzEzOC43ODQgMzIuMzk2MiAxNjEuNjYxIDEyNS44NiAxNjAuNjQ1IDEyOC4zMTZDMTU5LjQ5MSAxMzEuMTEgMTU2LjIzNiAxMzEuNjYzIDE1MS44NTEgMTMwLjkxTTE1MS44NTEgMTMwLjkxQzEzOC40MzkgMTI4LjYwOSAxMTQuNDU1IDExNC4wOTMgMTA3LjY2MSAxMTQuMTIxQzg0LjkwMSAxMTYuODA1IDM2Ljc5NjIgMTIyLjYwOCAyNi40NTc4IDEyNC4zNDJDMTYuMTE5NSAxMjYuMDc3IDEwLjkyNzggMTIwLjQwNSA5LjYyNDIxIDExNy4zNTNDOC41MzI4MSAxMTEuMDI0IDYuMTQ0MTcgOTYuMzQ1NSA1LjMyMDgxIDg4LjI2ODNDNC40OTc0NiA4MC4xOTExIDExLjc3MTcgNzYuMzgxOCAxNS41MTE3IDc1LjQ4NjhMOTIuNTkgNjQuMDgyMkM5My44Nzg0IDYzLjg5MTYgOTguMTkyNiA2Mi42ODk2IDEwNS4xNDIgNTkuNDA2NkMxMTAuNzg5IDQ4LjcxNTIgMTI0LjYyNCA0MC43NTgxIDEzNi4xOTggMzUuOTc2MU0xNTEuODUxIDEzMC45MUMxNDguMzQzIDExNS40MyAxNDMuMjA5IDkxLjMxODkgMTM5LjY2MiA3MS4yMDg4TTEzNi4xOTggMzUuOTc2MUMxMzQuNjQxIDM4LjczMjcgMTM2LjQ5IDUzLjE1NzggMTM5LjU3OCA3MC43MzU1TTExMS4yNzIgNTIuMDkzMkMxMTkuMTUzIDU5LjQ2NzkgMTM1Ljg2NCA3My42MTU1IDEzOS42NjIgNzEuMjA4OE0xMzkuNjYyIDcxLjIwODhDMTM5LjYzNCA3MS4wNTA4IDEzOS42MDYgNzAuODkzIDEzOS41NzggNzAuNzM1NU0xMzkuNTc4IDcwLjczNTVDMTI5LjA1NiA3OC42MDM2IDEwNy44OTYgOTcuOTk1MiAxMDcuNDM4IDExMi42MTYiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iNC4yMzExMiIvPgo8cGF0aCBkPSJNODQuNjkxNyAxMTcuNTE5Qzg0Ljc5NzggMTE1Ljc3OCA4NS4wNDg1IDExMy40NjEgODUuNDgyOSAxMTAuOTk3TTkyLjE2NTkgOTYuNjg0NUM4OC41NjU0IDk4LjUxMzcgODYuNTEwMyAxMDUuMTY4IDg1LjQ4MjkgMTEwLjk5N004NS40ODI5IDExMC45OTdDNzQuMzgxNiAxMDEuNDUxIDUyLjA5OTkgNzkuOTYyNyA1MS43ODMgNzAuMzc1NyIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSI0LjIzMTEyIi8+CjxwYXRoIGQ9Ik0xMTkuNDkzIDkwLjU5MkMxMTEuMTQzIDg0LjMxMTcgOTQuMzkzNCA3MC4xNjk4IDk0LjE5MiA2My44NDUzIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjQuMjMxMTIiLz4KPHBhdGggZD0iTTczLjk4MDUgNjguMzcwNkM3OC4zOTcgNzcuNTM4OSA5MS4zMjkxIDk3LjgzMTMgMTA3LjcyNSAxMDUuNjU0IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjQuMjMxMTIiLz4KPHBhdGggZD0iTTE1Ny4xMjcgNDQuMDI3M0MxNTcuMTE5IDQ0LjAwOTggMTU3LjExMSA0My45OTI0IDE1Ny4xMDQgNDMuOTc0OEMxNTYuODYyIDQyLjcyMDIgMTU2Ljc1NyA0My4xNzkzIDE1Ny4wOTkgNDMuOTY0N0MxNTQuOTA5IDM5LjA2MTEgMTUwLjExNyAyOS45MDQxIDE0OC4yMzYgMzIuMDE5M0MxNDUuODc1IDM0LjY3NDcgMTU4LjI1IDEzMC43MiAxNjAuNzI0IDEyNy4yNzlDMTYzLjE5OCAxMjMuODM4IDE2My41NjcgMTE4LjU3NCAxNjMuOTU2IDExNi41NTJMMTYwLjcwMSAxMTYuMjY1TDE1MC4xNjUgNDUuMDU3NEwxNTcuMTE0IDQ0LjAyOTJMMTU3LjEyNyA0NC4wMjczWiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTE1Ny4xMjcgNDQuMDI3M0MxNTQuOTUgMzkuMTM5NSAxNTAuMTI1IDI5Ljg5NSAxNDguMjM2IDMyLjAxOTNDMTQ1Ljg3NSAzNC42NzQ3IDE1OC4yNSAxMzAuNzIgMTYwLjcyNCAxMjcuMjc5QzE2My4xOTggMTIzLjgzOCAxNjMuNTY3IDExOC41NzQgMTYzLjk1NiAxMTYuNTUyTDE2MC43MDEgMTE2LjI2NUwxNTAuMTY1IDQ1LjA1NzRMMTU3LjEyNyA0NC4wMjczWk0xNTcuMTI3IDQ0LjAyNzNDMTU2LjY4OSA0My4wNjcxIDE1Ni45MDQgNDIuNTIyNyAxNTcuMjM4IDQ0Ljc3OTMiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iNC4yMzExMiIvPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9pXzI2NV8xOCIgeD0iMTQ2LjY0NCIgeT0iMjQuMjI4MiIgd2lkdGg9IjIyNy44NDMiIGhlaWdodD0iOTQuNjE1IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9InNoYXBlIi8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHg9IjEyLjY5MzQiIGR5PSItMS4yNjkzNCIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIwLjg0NjIyNSIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJhcml0aG1ldGljIiBrMj0iLTEiIGszPSIxIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjI1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9InNoYXBlIiByZXN1bHQ9ImVmZmVjdDFfaW5uZXJTaGFkb3dfMjY1XzE4Ii8+CjwvZmlsdGVyPgo8ZmlsdGVyIGlkPSJmaWx0ZXIxX2lfMjY1XzE4IiB4PSIzLjE0MDYyIiB5PSIyOS41OTEzIiB3aWR0aD0iMTYxLjM0NiIgaGVpZ2h0PSIxMDUuNDMzIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9InNoYXBlIi8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHg9IjcuNjE2MDIiIGR5PSIyMi44NDgxIi8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjAuODQ2MjI1Ii8+CjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9ImFyaXRobWV0aWMiIGsyPSItMSIgazM9IjEiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0ic2hhcGUiIHJlc3VsdD0iZWZmZWN0MV9pbm5lclNoYWRvd18yNjVfMTgiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg=="/>
	</defs>
	<style>
	</style>
	<use id="Group 12" href="#img1" transform="matrix(1,0,0,1,186,653)"/>
</svg>
  `
}

export default function DatabaseExamplePage() {
    const [animation, setAnimation] = useState<AnimationType>("idle")

    const svgParts = prepareSvgPartsForAnimation({
        weapon: mockDatabaseCharacter.weaponSvg,
    })

    const animations: AnimationType[] = ["idle", "attack", "hurt", "heal", "victory", "defend"]

    return (
        <main className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-800 flex flex-col items-center justify-center p-8">
            <div className="max-w-4xl w-full">
                <h1 className="text-4xl font-bold text-center mb-4 text-white">Ejemplo con SVGs de Base de Datos</h1>
                <p className="text-center text-purple-200 mb-8">
                    Este personaje usa SVGs cargados dinámicamente, simulando una base de datos
                </p>

                <div className="bg-purple-700 rounded-lg p-8 mb-8">
                    <CharacterPreview
                        skinColor={mockDatabaseCharacter.skinColor}
                        eyeColor={mockDatabaseCharacter.eyeColor}
                        hairColor={mockDatabaseCharacter.hairColor}
                        hairSvg={svgParts.hairSvg}
                        outfitSvg={svgParts.outfitSvg}
                        weaponSvg={svgParts.weaponSvg}
                        accesorysvg={svgParts.accessorySvg}
                        animation={animation}
                        className="mx-auto"
                    />
                </div>

                <div className="flex flex-wrap gap-4 justify-center mb-8">
                    {animations.map((anim) => (
                        <button
                            key={anim}
                            onClick={() => setAnimation(anim)}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all ${animation === anim
                                ? "bg-purple-500 text-white scale-110"
                                : "bg-purple-600 text-purple-200 hover:bg-purple-500"
                                }`}
                        >
                            {anim.charAt(0).toUpperCase() + anim.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="bg-purple-700 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Estructura de Datos:</h2>
                    <pre className="bg-purple-900 text-purple-100 p-4 rounded overflow-x-auto text-sm">
                        {JSON.stringify(
                            {
                                skinColor: mockDatabaseCharacter.skinColor,
                                eyeColor: mockDatabaseCharacter.eyeColor,
                                hairColor: mockDatabaseCharacter.hairColor,
                                hairSvg: "SVG string from database...",
                                outfitSvg: "SVG string from database...",
                                weaponSvg: "SVG string from database...",
                                accessorySvg: "SVG string from database...",
                            },
                            null,
                            2,
                        )}
                    </pre>
                </div>
            </div>
        </main>
    )
}
