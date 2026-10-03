import { mergeClassNames } from "../lib/mergeConditionalClasses";
import type { Difficulty } from "../lib/numberPlace";

type NumberPlaceControlsProps = {
  difficulty: Difficulty;
  onNewGame: (difficulty: Difficulty) => void;
  onReset: () => void;
  isSolutionVisible: boolean;
  onToggleSolutionVisibility: () => void;
  isVerifyResultVisible: boolean;
  onToggleVerifyResultVisibility: () => void;
};

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export function NumberPlaceControls({
  difficulty,
  onNewGame,
  onReset,
  isSolutionVisible,
  onToggleSolutionVisibility,
  isVerifyResultVisible,
  onToggleVerifyResultVisibility,
}: NumberPlaceControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {DIFFICULTIES.map((difficultyOption) => (
        <button
          key={difficultyOption}
          className={mergeClassNames(
            "px-3 py-2 rounded border capitalize",
            difficulty === difficultyOption && "border-green-500",
          )}
          onClick={() => onNewGame(difficultyOption)}
        >
          {difficultyOption}
        </button>
      ))}

      <div className="mx-2 h-px w-full bg-zinc-500 sm:h-6 sm:w-px" />

      <button className="px-3 py-2 rounded border" onClick={onReset}>
        Reset
      </button>

      <button className="px-3 py-2 rounded border" onClick={onToggleSolutionVisibility}>
        {isSolutionVisible ? "Hide Solution" : "Show Solution"}
      </button>

      <button
        className={mergeClassNames(
          "px-3 py-2 rounded border",
          isVerifyResultVisible && "border-green-500",
        )}
        onClick={onToggleVerifyResultVisibility}
      >
        Verify
      </button>
    </div>
  );
}
