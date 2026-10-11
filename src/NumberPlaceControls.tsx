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
  "cursor-pointer rounded-full bg-gray-800/50 px-3 py-1 transition hover:bg-gray-800 active:scale-95";

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
            difficulty === difficultyOption && "bg-green-700/50 hover:bg-green-700",
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
        className={mergeClassNames(
          buttonClassName,
          isSolutionVisible && "bg-gray-600/50 hover:bg-gray-600",
        )}
        onClick={onToggleSolutionVisibility}
      >
        {isSolutionVisible ? "Hide Solution" : "Show Solution"}
      </button>

      <button
        className={mergeClassNames(
          buttonClassName,
          isVerifyResultVisible && "bg-green-700/50 hover:bg-green-700",
        )}
        onClick={onToggleVerifyResultVisibility}
      >
        Verify
      </button>
    </div>
  );
}
