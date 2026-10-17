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
    <div className="border-foreground/50 grid aspect-square w-full max-w-xl grid-cols-9 grid-rows-9 border-2">
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
              className={[
                "border-foreground/50 min-h-0 min-w-0 border",
                rowIndex > 0 && rowIndex % 3 === 0 && "border-t-2",
                columnIndex > 0 && columnIndex % 3 === 0 && "border-l-2",
                cell.fixed && "bg-gray-200 dark:bg-gray-800",
                isWrongVisible && "bg-red-900 text-red-100",
                isCorrectVisible && "bg-green-900 text-green-100",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <input
                aria-label={`Row ${rowIndex + 1}, column ${columnIndex + 1}`}
                inputMode="numeric"
                pattern="[1-9]*"
                maxLength={1}
                className="size-full bg-transparent text-center text-3xl"
                value={cell.value === 0 ? "" : String(cell.value)}
                onFocus={(event) => event.currentTarget.select()}
                onClick={(event) => event.currentTarget.select()}
                onChange={(event) => {
                  onInput(rowIndex, columnIndex, event.currentTarget.value);
                  event.currentTarget.select();
                }}
                disabled={cell.fixed}
              />
            </div>
          );
        }),
      )}
    </div>
  );
}
