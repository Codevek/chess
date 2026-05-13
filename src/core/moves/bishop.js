import { isInsideBoard } from "../utils.js";

export function getBishopMoves(board, pRow, pCol, piece) {
  const moves = [];
  const direction = [
    [-1, -1], //topLeft
    [-1, 1], //topRight
    [1, -1], //botLeft
    [1, 1], //botRight
  ];

  for (const [rowDir, colDir] of direction) {
    let pNewRow = pRow + rowDir;
    let pNewCol = pCol + colDir;

    const target = board[pNewRow][pNewCol];

    //emptySquare
    if (target === null) {
      moves.push({
        from: [pRow, pCol],
        to: [pNewRow, pNewCol],
      });
    } 
  }
  return moves;
}
