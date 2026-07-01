import { parseFEN } from "../fen.js";
import { isInsideBoard } from "../utils.js";
// import { isSquareAttacked } from "../game.js";

// let includeCastle
export function getKingMoves(
  game,
  board,
  pRow,
  pCol,
  piece,
  includeCastle = true,
) {
  const moves = [];
  const direction = [
    [-1, 0], //top
    [1, 0], //bottom
    [0, 1], //right
    [0, -1], //left

    [-1, -1], //topLeft
    [-1, 1], //topRight
    [1, -1], //botLeft
    [1, 1], //botRight
  ];

  for (const [rowDir, colDir] of direction) {
    let pNewRow = pRow + rowDir;
    let pNewCol = pCol + colDir;

    if (!isInsideBoard(pNewRow, pNewCol)) continue;
    const target = board[pNewRow][pNewCol];
    if (target === null) {
      moves.push({
        from: [pRow, pCol],
        to: [pNewRow, pNewCol],
      });
    } else if (target.color !== piece.color) {
      moves.push({
        from: [pRow, pCol],
        to: [pNewRow, pNewCol],
      });
    }
  }

  //castling moves
  if (includeCastle) {
    //WHITE
    if (piece.color === "w" && pRow === 7 && pCol === 4) {
      //white kingSide
      if (game.castlingRights.w.kingSide) {
        if (board[7][5] === null && board[7][6] === null) {
          if (
            !game.isSquareAttacked(7, 4, "b") &&
            !game.isSquareAttacked(7, 5, "b") &&
            !game.isSquareAttacked(7, 6, "b")
          ) {
            moves.push({
              from: [7, 4],
              to: [7, 6],
              castle: "w-kingSide",
            });
          }
        }
      }
      //white queenSide
      if (game.castlingRights.w.queenSide) {
        if (
          board[7][3] === null &&
          board[7][2] === null &&
          board[7][1] === null
        ) {
          if (
            !game.isSquareAttacked(7, 4, "b") &&
            !game.isSquareAttacked(7, 3, "b") &&
            !game.isSquareAttacked(7, 2, "b")
            // !game.isSquareAttacked(7, 1, "b")
          ) {
            moves.push({
              from: [7, 4],
              to: [7, 2],
              castle: "w-queenSide",
            });
          }
        }
      }
    }
    //BLACK
    if (piece.color === "b" && pRow === 0 && pCol === 4) {
      //black kingSide
      if (game.castlingRights.b.kingSide) {
        if (board[0][5] === null && board[0][6] === null) {
          if (
            !game.isSquareAttacked(0, 4, "w") &&
            !game.isSquareAttacked(0, 5, "w") &&
            !game.isSquareAttacked(0, 6, "w")
          ) {
            moves.push({
              from: [0, 4],
              to: [0, 6],
              castle: "b-kingSide",
            });
          }
        }
      }
      //black queenSide
      if (game.castlingRights.b.queenSide) {
        if (
          board[0][3] === null &&
          board[0][2] === null &&
          board[0][1] === null
        ) {
          if (
            !game.isSquareAttacked(0, 4, "w") &&
            !game.isSquareAttacked(0, 3, "w") &&
            !game.isSquareAttacked(0, 2, "w")
            // !game.isSquareAttacked(0, 1, "w")
          ) {
            moves.push({
              from: [0, 4],
              to: [0, 2],
              castle: "b-queenSide",
            });
          }
        }
      }
    }
  }

  return moves;
}

// getKingMoves(
//   parseFEN("3qN3/7K/1k1P4/R3bp2/P5R1/1b1ppP2/5Pp1/8 w - - 0 1"),
//   3,
//   5,
//   parseFEN("3qN3/7K/1k1P4/R3bp2/P5R1/1b1ppP2/5Pp1/8 w - - 0 1")[3][5],
// );
