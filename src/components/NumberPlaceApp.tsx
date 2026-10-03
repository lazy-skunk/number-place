import { NumberPlaceBoard } from "./NumberPlaceBoard";
import { NumberPlaceControls } from "./NumberPlaceControls";
import { NumberPlaceSolution } from "./NumberPlaceSolution";
import { useNumberPlaceState } from "../hooks/useNumberPlaceState";

export function NumberPlaceApp() {
  const {
    cells,
    difficulty,
    hasUserEditsSinceStart,
    applyDigitInput,
    startNewGame,
    resetToInitialPuzzle,
    isVerifyResultVisible,
    isSolutionVisible,
    solutionBoard,
    toggleVerifyResultVisibility,
    toggleSolutionVisibility,
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

  return (
    <main className="flex flex-col items-center p-5 gap-5">
      <h1 className="text-3xl font-bold">Number Place</h1>

      <NumberPlaceControls
        difficulty={difficulty}
        onNewGame={handleNewGame}
        onReset={handleReset}
        isSolutionVisible={isSolutionVisible}
        onToggleSolutionVisibility={toggleSolutionVisibility}
        isVerifyResultVisible={isVerifyResultVisible}
        onToggleVerifyResultVisibility={toggleVerifyResultVisibility}
      />

      <NumberPlaceBoard
        cells={cells}
        onInput={applyDigitInput}
        isVerifyResultVisible={isVerifyResultVisible}
        solutionBoard={solutionBoard}
      />

      {isSolutionVisible && <NumberPlaceSolution solutionBoard={solutionBoard} />}
    </main>
  );
}
