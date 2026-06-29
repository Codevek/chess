import { Chess } from "../core/game.js";
import { evaluate } from "./evaluate.js";

export function findBestMove(game) {
  const moves = game.getAllLegalMoves();
  let bestMove = null;
  let bestScore = -Infinity;
  let score;

  for (const move of moves) {
    game.makeMove(move);
    score = evaluate(game);
    game.undoMove();

    if (score > bestScore) {
      bestMove = move;
      bestScore = score;
    }
    // console.log(score, bestMove); 
  }
  console.log(bestMove);
  console.log(score);

  return bestMove;
}


export function minimax(game, depth){
  if(depth === 0){
    return evaluate(game)
  }
  
  const moves = game.getAllLegalMoves()
  
  if(game.getTurn() === "w"){
    let bestScore = -Infinity
    for(const move of moves){
      game.makeMove(move)
      let score = minimax(game, depth-1)
      game.undoMove()
      
      bestScore = Math.max(bestScore, score)
    }
    console.log(bestScore);
    
    return bestScore
  }
  else{
    let bestScore = Infinity
    for(const move of moves){
      game.makeMove(move)
      let score = minimax(game, depth-1)
      game.undoMove()
      
      bestScore = Math.min(bestScore, score)
    }
    console.log(bestScore);
    
    return bestScore
  }
  
}

const game = new Chess("4k3/8/8/8/8/8/3q4/3QK3 w - - 0 1");
minimax(game, 2);