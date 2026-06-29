import { Chess } from "../core/game.js";

const PIECE_VALUES = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 0,
};

export function evaluate(game) {
  let score = 0;
  const board = game.getBoard();

  for (const row of board) {
    for (const piece of row) {
      if (piece === null) continue;

      if (piece.color === "w") score += PIECE_VALUES[piece.type];
      else score -= PIECE_VALUES[piece.type];
    }
  }
//   console.log(score);

  return score;
}

// const game = new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNB1KBNR w KQkq - 0 1");
// evaluate(game);
