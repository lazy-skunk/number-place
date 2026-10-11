import { useState } from "react";
import type { Difficulty } from "./numberPlace";

type NumberPlaceControlsProps = {
  difficulty: Difficulty;
  onNewGame: (difficulty: Difficulty) => void;
  onReset: () => void;
  isVerifyResultVisible: boolean;
  onToggleVerifyResultVisibility: () => void;
};

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export function NumberPlaceControls({
  difficulty,
  onNewGame,
  onReset,
  isVerifyResultVisible,
  onToggleVerifyResultVisibility,
}: NumberPlaceControlsProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <label>
        Difficulty:{" "}
        <select
          className="rounded bg-gray-800/50 px-2 py-1"
          value={selectedDifficulty}
          onChange={(event) => setSelectedDifficulty(event.target.value as Difficulty)}
        >
          {DIFFICULTIES.map((difficultyOption) => (
            <option key={difficultyOption} value={difficultyOption} className="bg-gray-800">
              {difficultyOption.charAt(0).toUpperCase() + difficultyOption.slice(1)}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        className="rounded-full bg-green-900/50 px-3 py-1 transition hover:bg-green-900 active:scale-95"
        onClick={() => onNewGame(selectedDifficulty)}
      >
        New Game
      </button>

      <button
        type="button"
        className="rounded-full bg-red-900/50 px-3 py-1 transition hover:bg-red-900 active:scale-95"
        onClick={onReset}
      >
        Reset
      </button>

      <button
        type="button"
        className="rounded-full bg-green-900/50 px-3 py-1 transition hover:bg-green-900 active:scale-95"
        onClick={onToggleVerifyResultVisibility}
      >
        {isVerifyResultVisible ? "Hide Result" : "Verify"}
      </button>
    </div>
  );
}
