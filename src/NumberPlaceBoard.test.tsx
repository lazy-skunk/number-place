// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vite-plus/test";

import { NumberPlaceBoard } from "./NumberPlaceBoard";

afterEach(cleanup);

function renderBoard(verify = false) {
  const cells = Array.from({ length: 9 }, (_, row) =>
    Array.from({ length: 9 }, (_, column) => ({
      value: row === 0 && column === 0 ? 1 : 0,
      fixed: row === 0 && column === 0,
    })),
  );
  cells[0][1].value = 2;
  render(
    <NumberPlaceBoard
      cells={cells}
      solutionBoard={Array.from({ length: 9 }, () => Array<number>(9).fill(1))}
      isVerifyResultVisible={verify}
      onInput={vi.fn()}
    />,
  );
}

function input(row: number, column: number) {
  return screen.getByLabelText(`Row ${row}, column ${column}`);
}

function cell(row: number, column: number) {
  return input(row, column).parentElement!;
}

function pointer(row: number, column: number, type = "pointerover") {
  const event = new MouseEvent(type, { bubbles: true });
  fireEvent(cell(row, column), event);
}

test("highlights the hovered row, column and box, including fixed cells", () => {
  renderBoard();
  pointer(2, 2);

  expect(cell(2, 8).className).toContain("bg-blue-100");
  expect(cell(8, 2).className).toContain("bg-blue-100");
  expect(cell(3, 3).className).toContain("bg-blue-100");
  expect(cell(1, 1).className).toContain("bg-blue-200");
  expect(cell(4, 4).className).not.toContain("bg-blue");

  pointer(2, 2, "pointerout");
  expect(cell(2, 8).className).not.toContain("bg-blue");
  expect(cell(1, 1).className).toContain("bg-gray-200");
});

test("falls back to the focused cell after the pointer leaves the board", () => {
  renderBoard();
  fireEvent.focus(input(5, 5));
  pointer(2, 2);
  expect(cell(8, 2).className).toContain("bg-blue-100");

  pointer(2, 2, "pointerout");
  expect(cell(8, 5).className).toContain("bg-blue-100");
  expect(cell(8, 2).className).not.toContain("bg-blue");

  fireEvent.blur(input(5, 5));
  expect(cell(8, 5).className).not.toContain("bg-blue");
});

test("preserves verification colors over the highlight", () => {
  renderBoard(true);
  pointer(1, 2);
  expect(cell(1, 2).className).toContain("bg-red-900");
  expect(cell(1, 2).className).not.toContain("bg-blue");
});

test("does not activate a fixed cell when touched", () => {
  renderBoard();
  pointer(1, 1);
  expect(cell(1, 1).className).toContain("bg-gray-200");
  expect(cell(1, 8).className).not.toContain("bg-blue");
  expect(cell(8, 1).className).not.toContain("bg-blue");
  expect((input(1, 1) as HTMLInputElement).disabled).toBe(true);
});
