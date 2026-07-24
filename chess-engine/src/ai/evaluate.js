import { Chess } from "../core/game.js";
import { BISHOP_TABLE } from "./tables/bishop.js";
import { KING_MIDDLE_TABLE } from "./tables/kingMiddle.js";
import { KNIGHT_TABLE } from "./tables/knight.js";
import { PAWN_TABLE } from "./tables/pawn.js";
import { QUEEN_TABLE } from "./tables/queen.js";
import { ROOK_TABLE } from "./tables/rook.js";

const PIECE_VALUES = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 0,
};

const PIECE_SQUARE_TABLES = {
  p: PAWN_TABLE,
  r: ROOK_TABLE,
  n: KNIGHT_TABLE,
  b: BISHOP_TABLE,
  q: QUEEN_TABLE,
  k: KING_MIDDLE_TABLE
}

export function evaluate(game) {
  let score = 0;
  const board = game.getBoard();

  for (let row=0; row<board.length; row++) {
    for (let col=0; col<7; col++) {
      if (board[row][col] === null) continue;
      
      const piece = board[row][col]
      
      // const table = PIECE_SQUARE_TABLES[piece.type]

      // const tableRow = piece.color === "w" ? row: 7-row 
      // const bonus = table[tableRow][col] 

      if (piece.color === "w") score += PIECE_VALUES[piece.type] 
      else score -= PIECE_VALUES[piece.type]
    }
  }
  // console.log(score);

  return score;
}

// const game = new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB1KBNR w KQkq - 0 1");
// // console.table(game.getBoard());

// console.log(evaluate(game));
