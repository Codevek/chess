import { Chess } from "./core/game.js";

const game = new Chess("3qN3/7K/1k1P4/R3bp2/P5R1/1b1ppP2/5Pp1/8 b - - 0 1");

const moves = game.getMovesForPiece(2,1);

// console.table(game.getBoard());
console.log(moves);
