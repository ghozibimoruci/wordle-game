import { useState } from "preact/hooks";

export const Hint = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div class="relative">
        {/* Trigger Button */}
            <button className="btn btn-vite-blue p-0! flex items-center justify-center w-[25px] h-[25px] text-neutral-white rounded-full!" onClick={() => setIsOpen(true)}>?</button>
            {/* Modal Overlay */}
            {isOpen && (
                <div class="fixed inset-0 bg-white bg-opacity-50 flex justify-center z-50 overflow-auto">
                    <div class="bg-white text-black p-6 rounded-lg max-w-lg w-full relative">
                        {/* Close Button */}
                        <button
                        class="absolute top-2 right-2 text-black text-xl cursor-pointer"
                        onClick={() => setIsOpen(false)}
                        >
                        ✖
                        </button>

                        <h2 class="text-2xl font-bold text-center text-vite-blue mb-4">
                        Game Rules
                        </h2>
                        <p class="text-lg">
                        <strong>Objective:</strong> Guess the secret word within{" "}
                        <span class="font-bold">5 attempts</span>.
                        </p>

                        <h3 class="text-xl font-semibold mt-4 text-vite-blue">
                        Difficulty Levels:
                        </h3>
                        <ul class="list-disc pl-5 space-y-1">
                        <li>
                            <strong>Easy:</strong> 3-letter words
                        </li>
                        <li>
                            <strong>Medium:</strong> 4-letter words
                        </li>
                        <li>
                            <strong>Hard:</strong> 5-letter words
                        </li>
                        </ul>

                        <h3 class="text-xl font-semibold mt-4 text-vite-blue">
                        How to Play:
                        </h3>
                        <ul class="list-disc pl-5 space-y-1">
                        <li>Enter a word with the correct length.</li>
                        <li>After each guess, the game provides color-coded hints:</li>
                        <ul class="list-none pl-5 space-y-1">
                            <li>🟣{" "}
                            Letter is in the correct position.
                            </li>
                            <li>🟡{" "}
                            Letter is in the word but in the wrong position.
                            </li>
                            <li>⚫{" "}
                            Letter is not in the word.
                            </li>
                            <li>🔵{" "}
                            Letter appears more than once in the word.
                            </li>
                        </ul>
                        </ul>

                        <h3 class="text-xl font-semibold mt-4 text-vite-blue">Winning:</h3>
                        <ul class="list-disc pl-5 space-y-1">
                        <li>Win by guessing the word before running out of attempts.</li>
                        <li>If you fail after 5 attempts, the correct word is revealed.</li>
                        </ul>

                        <h3 class="text-xl font-semibold mt-4 text-vite-blue">
                        Strategy Tip:
                        </h3>
                        <ul class="list-disc pl-5 space-y-1">
                        <li>Use the color hints wisely to refine your guesses.</li>
                        <li>Start with common letters to narrow down possibilities.</li>
                        </ul>

                        <p class="text-center text-lg font-bold mt-6 text-vite-blue">
                        Good luck and have fun guessing!
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}