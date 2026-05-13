import { Chess } from "./core/game.js";

const game = new Chess("7q/1n1r2P1/5N2/1p2k2p/2p4n/1PK3P1/p7/R1B5 w - - 0 1");

const moves = game.getMovesForPiece(7,2)

// console.table(game.getBoard());
console.log(moves);
