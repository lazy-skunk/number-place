import { mergeClassNames } from "../lib/mergeConditionalClasses";
import { type Board } from "../lib/sudoku";
import type { Cell } from "../hooks/useSudokuState";

type SudokuBoardProps = {
  cells: Cell[][];
  isVerifyResultVisible: boolean;
  solutionBoard: Board;
  onInput: (rowIndex: number, columnIndex: number, value: string) => void;
};

export function SudokuBoard({
  cells,
  isVerifyResultVisible,
  solutionBoard,
  onInput,
}: SudokuBoardProps) {
  return (
    <div className="grid grid-cols-9 border-2 border-current select-none">
      {cells.map((row, rowIndex) =>
        row.map((cell, columnIndex) => {
          const isWrongVisible =
            isVerifyResultVisible &&
            cell.value !== 0 &&
            solutionBoard[rowIndex][columnIndex] !== cell.value &&
            !cell.fixed;
          const isCorrectVisible =
            isVerifyResultVisible &&
            cell.value !== 0 &&
            solutionBoard[rowIndex][columnIndex] === cell.value &&
            !cell.fixed;

          return (
            <div
              key={`${rowIndex}-${columnIndex}`}
              className={mergeClassNames(
                "relative w-[clamp(2rem,10vw,3rem)] h-[clamp(2rem,10vw,3rem)] border border-zinc-500 flex items-center justify-center focus-within:ring focus-within:ring-green-500",
                rowIndex % 3 === 0 && "border-t-2",
                columnIndex % 3 === 0 && "border-l-2",
                rowIndex === 8 && "border-b-2",
                columnIndex === 8 && "border-r-2",
                isWrongVisible && "bg-red-500/10",
                isCorrectVisible && "bg-green-500/10",
              )}
            >
              <input
                inputMode="numeric"
                pattern="[1-9]*"
                maxLength={1}
                className={mergeClassNames(
                  "w-full h-full text-center text-[clamp(1.5rem,5vw,2.5rem)] outline-none bg-transparent",
                  cell.fixed ? "font-bold" : "text-green-500",
                )}
                value={cell.value === 0 ? "" : String(cell.value)}
                onChange={(event) => onInput(rowIndex, columnIndex, event.target.value)}
                disabled={cell.fixed}
              />
            </div>
          );
        }),
      )}
    </div>
  );
}
