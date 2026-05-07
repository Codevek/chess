import type { Piece } from "../../types/piece";
import type { Move } from "../../types/move";
import { isInsideBoard } from "../utils"
// import type { Chess } from "../game"
import { parseFen } from "../fen";

export function getPawnMoves(
    board: (Piece | null)[][],
    row: number,
    col: number,
    piece: Piece,
    // isInsideBoard: boolean
): Move[]{

const moves: Move[] = []
const direction = piece.color === "w" ? -1 : 1;
const startRow = piece.color === "w" ? 6 : 1;

  // 1. Forward move
  const forwardRow = row + direction;

  if (isInsideBoard(forwardRow, col) && !board[forwardRow]?.[col]) {
    moves.push({
      from: [row, col],
      to: [forwardRow, col]
    });

    // 2. Double move from start
    if (row === startRow && !board[row + 2 * direction]?.[col]) {
      moves.push({
        from: [row, col],
        to: [row + 2 * direction, col]
      });
    }
  }

  // 3. Captures (diagonal)
  for (const dc of [-1, 1]) {
    const newCol = col + dc;
    const newRow = row + direction;

    if (!isInsideBoard(newRow, newCol)) continue;

    const target = board[newRow]?.[newCol];

    if (target && target.color !== piece.color) {
      moves.push({
        from: [row, col],
        to: [newRow, newCol]
      });
    }
  }

  return moves;
}

// getPawnMoves((parseFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')), 8, 7, ({
//   type: "p",
//   color: "w"
// }))