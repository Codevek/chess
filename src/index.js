import { Chess } from "./core/game.js";

const game = new Chess("8/8/8/3pP3/8/8/8/8 w - d6 0 1");

console.table(game.getBoard())
const moves1 = game.getLegalMoves(3,4)
console.log(moves1);
// console.table(game.getBoard());
// game.makeMove({
//     from: [7,4],
//     to: [7,5]
// })
// console.table(game.getBoard());
// game.makeMove({
//     from: [7,5],
//     to: [7,4]
// })
// console.table(game.getBoard());
// const moves2 = game.getLegalMoves(7,4)
// console.log(moves2);




