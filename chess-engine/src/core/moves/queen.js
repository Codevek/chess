import { parseFEN } from "../fen.js";
import { isInsideBoard } from "../utils.js";

export function getQueenMoves(board, pRow, pCol, piece) {
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

    
    //emptySquare
    while (isInsideBoard(pNewRow, pNewCol)) {
      const target = board[pNewRow][pNewCol];
      if (target === null) { //empty square
        moves.push({
          from: [pRow, pCol],
          to: [pNewRow, pNewCol],
          captured: target
        });
      }

      else if (target.color !== piece.color){ //enemy piece
        moves.push({
          from: [pRow, pCol],
          to: [pNewRow, pNewCol],
          captured: target
        });
        break
      }

      else{ // friendly piece
        break
      }

      pNewRow += rowDir
      pNewCol += colDir
    }
  }
  // console.log(moves);

  return moves;
}

// getQueenMoves(
//   parseFEN("5R2/2b1n3/3P3K/N3PBp1/6N1/3P1p2/1p2k1Pp/8 w - - 0 1"),
//   3,
//   5,
//   parseFEN("5R2/2b1n3/3P3K/N3PBp1/6N1/3P1p2/1p2k1Pp/8 w - - 0 1")[3][5],
// );
