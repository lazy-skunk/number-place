import { NumberPlaceBoard } from "./NumberPlaceBoard";
import { NumberPlaceControls } from "./NumberPlaceControls";
import { useNumberPlaceState } from "./useNumberPlaceState";

export function NumberPlaceApp() {
  const {
    cells,
    difficulty,
    hasUserEditsSinceStart,
    applyDigitInput,
    startNewGame,
    resetToInitialPuzzle,
    isVerifyResultVisible,
    solutionBoard,
    toggleVerifyResultVisibility,
  } = useNumberPlaceState();

  const handleNewGame = (nextDifficulty: typeof difficulty) => {
    if (
      hasUserEditsSinceStart &&
      !window.confirm("Current entries will be lost. Start a new puzzle?")
    ) {
      return;
    }
    startNewGame(nextDifficulty);
  };

  const handleReset = () => {
    if (
      hasUserEditsSinceStart &&
      !window.confirm("Current entries will be lost. Reset the puzzle?")
    ) {
      return;
    }
    resetToInitialPuzzle();
  };

  const isComplete = cells.every((row, rowIndex) =>
    row.every((cell, columnIndex) => cell.value === solutionBoard[rowIndex][columnIndex]),
  );

  return (
    <section className="flex flex-col items-center gap-5 p-3">
      <h1 className="text-3xl font-bold">Number Place</h1>

      <NumberPlaceControls
        difficulty={difficulty}
        onNewGame={handleNewGame}
        onReset={handleReset}
        isVerifyResultVisible={isVerifyResultVisible}
        onToggleVerifyResultVisibility={toggleVerifyResultVisibility}
      />

      <NumberPlaceBoard
        cells={cells}
        onInput={applyDigitInput}
        isVerifyResultVisible={isVerifyResultVisible}
        solutionBoard={solutionBoard}
      />

      {isComplete && <p className="font-semibold">Completed⭐</p>}
    </section>
  );
}
