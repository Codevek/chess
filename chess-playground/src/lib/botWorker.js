import { Chess } from "chess-engine";
import { findBestMove } from "chess-engine/src/ai/minimax";

self.onmessage = (e) => {
  const { fen, depth, withBonus } = e.data;
  const game = new Chess(fen);
  const bestMove = findBestMove(game, depth, withBonus);

  self.postMessage(bestMove);
};
