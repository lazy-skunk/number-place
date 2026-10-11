import { mergeClassNames } from "./mergeConditionalClasses";
import { type Board } from "./numberPlace";
import type { Cell } from "./useNumberPlaceState";

type NumberPlaceBoardProps = {
  cells: Cell[][];
  isVerifyResultVisible: boolean;
  solutionBoard: Board;
  onInput: (rowIndex: number, columnIndex: number, value: string) => void;
};

export function NumberPlaceBoard({
  cells,
  isVerifyResultVisible,
  solutionBoard,
  onInput,
}: NumberPlaceBoardProps) {
  return (
    <div className="grid grid-cols-9 border-2 border-gray-500">
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
                "size-9 border border-gray-500",
                rowIndex > 0 && rowIndex % 3 === 0 && "border-t-2",
                columnIndex > 0 && columnIndex % 3 === 0 && "border-l-2",
                cell.fixed && "bg-gray-800/50",
                isWrongVisible && "bg-red-900",
                isCorrectVisible && "bg-green-900",
              )}
            >
              <input
                aria-label={`Row ${rowIndex + 1}, column ${columnIndex + 1}`}
                inputMode="numeric"
                pattern="[1-9]*"
                maxLength={1}
                className={mergeClassNames(
                  "size-full bg-transparent text-center text-3xl",
                  cell.fixed && "font-bold",
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
