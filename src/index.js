import { Chess } from "./core/game.js";

const game = new Chess("r3k2r/8/8/8/8/5r2/8/R3K2R w KQkq - 0 1");

const moves1 = game.getLegalMoves(7,4)
console.log(moves1);
console.table(game.getBoard());
game.makeMove({
    from: [7,4],
    to: [7,5]
})
console.table(game.getBoard());
game.makeMove({
    from: [7,5],
    to: [7,4]
})
console.table(game.getBoard());
const moves2 = game.getLegalMoves(7,4)
console.log(moves2);




