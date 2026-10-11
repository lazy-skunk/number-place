import { mergeClassNames } from "./mergeConditionalClasses";
import type { Difficulty } from "./numberPlace";

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

const buttonClassName =
  "rounded bg-gray-700 px-3 py-2 transition-[background-color,transform] hover:bg-gray-600 active:translate-y-px active:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900";

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
            buttonClassName,
            "capitalize",
            difficulty === difficultyOption && "bg-green-700 hover:bg-green-600",
          )}
          onClick={() => onNewGame(difficultyOption)}
        >
          {difficultyOption}
        </button>
      ))}

      <div className="mx-2 h-px w-full bg-gray-500 sm:h-6 sm:w-px" />

      <button className={buttonClassName} onClick={onReset}>
        Reset
      </button>

      <button
        className={mergeClassNames(buttonClassName, isSolutionVisible && "bg-gray-600")}
        onClick={onToggleSolutionVisibility}
      >
        {isSolutionVisible ? "Hide Solution" : "Show Solution"}
      </button>

      <button
        className={mergeClassNames(
          buttonClassName,
          isVerifyResultVisible && "bg-green-700 hover:bg-green-600",
        )}
        onClick={onToggleVerifyResultVisibility}
      >
        Verify
      </button>
    </div>
  );
}
