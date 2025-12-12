"use client"

import type React from "react"

interface CreateQuizFormProps {
    form: any
    worlds: any[]
    onChange: (form: any) => void
    onSubmit: (e: React.FormEvent) => void
    loading: boolean
}

export function CreateQuizForm({ form, worlds, onChange, onSubmit, loading }: CreateQuizFormProps) {
    const updateOption = (index: number, value: string) => {
        const newOptions = [...form.options]
        newOptions[index] = value
        onChange({ options: newOptions })
    }

    return (
        <div className="mt-6 bg-slate-800 border-2 border-amber-600 rounded-xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-amber-300">❓ Create Quiz Question</h2>
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold mb-2 text-amber-200">Select World</label>
                    <select
                        value={form.selectedWorldId}
                        onChange={(e) => onChange({ selectedWorldId: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                        required
                    >
                        <option value="">-- Select World --</option>
                        {worlds.map((world) => (
                            <option key={world._id} value={world.worldId}>
                                {world.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-amber-200">Level Number</label>
                    <input
                        type="number"
                        value={form.levelNumber}
                        onChange={(e) => onChange({ levelNumber: Number(e.target.value) })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                        min="1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-amber-200">Quiz Type</label>
                    <select
                        value={form.type}
                        onChange={(e) => {
                            onChange({
                                type: e.target.value,
                                options: ["", "", "", ""],
                                correctAnswer: 0,
                            })
                        }}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    >
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="true-false">True/False</option>
                        <option value="fill-blank">Fill in the Blank</option>
                        <option value="translation">Translation</option>
                        <option value="matching">Matching</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2 text-amber-200">Order Index</label>
                    <input
                        type="number"
                        value={form.orderIndex}
                        onChange={(e) => onChange({ orderIndex: Number(e.target.value) })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                        min="0"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-2 text-amber-200">Question</label>
                    <textarea
                        value={form.question}
                        onChange={(e) => onChange({ question: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                        rows={2}
                        placeholder="Enter quiz question..."
                        required
                    />
                </div>

                {form.type === "multiple-choice" && (
                    <>
                        {[0, 1, 2, 3].map((index) => (
                            <div key={index}>
                                <label className="block text-sm font-bold mb-2 text-amber-200">Option {index + 1}</label>
                                <input
                                    type="text"
                                    value={form.options[index]}
                                    onChange={(e) => updateOption(index, e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                                    required
                                />
                            </div>
                        ))}

                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold mb-2 text-amber-200">Correct Answer (Select One)</label>
                            <div className="grid grid-cols-4 gap-2">
                                {[0, 1, 2, 3].map((index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => onChange({ correctAnswer: index })}
                                        className={`px-4 py-2 rounded-lg font-bold border-2 transition-all ${form.correctAnswer === index
                                            ? "bg-green-600 border-green-400 text-white"
                                            : "bg-slate-700 border-slate-600 text-slate-400 hover:border-green-500"
                                            }`}
                                    >
                                        Option {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {form.type === "true-false" && (
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold mb-2 text-amber-200">Correct Answer</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => onChange({ correctAnswer: 0, options: ["True", "False"] })}
                                className={`px-6 py-3 rounded-lg font-bold border-2 transition-all ${form.correctAnswer === 0
                                    ? "bg-green-600 border-green-400 text-white"
                                    : "bg-slate-700 border-slate-600 text-slate-400 hover:border-green-500"
                                    }`}
                            >
                                True
                            </button>
                            <button
                                type="button"
                                onClick={() => onChange({ correctAnswer: 1, options: ["True", "False"] })}
                                className={`px-6 py-3 rounded-lg font-bold border-2 transition-all ${form.correctAnswer === 1
                                    ? "bg-green-600 border-green-400 text-white"
                                    : "bg-slate-700 border-slate-600 text-slate-400 hover:border-green-500"
                                    }`}
                            >
                                False
                            </button>
                        </div>
                    </div>
                )}

                {(form.type === "fill-blank" || form.type === "translation") && (
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold mb-2 text-amber-200">Correct Answer</label>
                        <input
                            type="text"
                            value={form.options[0]}
                            onChange={(e) => onChange({ options: [e.target.value] })}
                            className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                            placeholder="Enter correct answer..."
                            required
                        />
                    </div>
                )}

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold mb-2 text-amber-200">Explanation (Optional)</label>
                    <textarea
                        value={form.explanation}
                        onChange={(e) => onChange({ explanation: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                        rows={2}
                        placeholder="Explain the correct answer..."
                    />
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-6 py-3 bg-amber-600 text-white font-bold rounded-lg shadow-lg hover:bg-amber-700 disabled:opacity-50 border-2 border-amber-400"
                    >
                        {loading ? "Creating..." : "❓ Create Quiz"}
                    </button>
                </div>
            </form>
        </div>
    )
}
