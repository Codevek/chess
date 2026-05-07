import { Chess } from "./core/game";

const game = new Chess();

const moves = game.getMovesForSquare(6, 4); // e2 pawn

console.log(moves);