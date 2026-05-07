import { parseFen } from "./fen";
import type { Piece } from "../types/piece";
import { getPawnMoves } from "./moves/pawn";


const START_FEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export class Chess {
  board: (Piece | null)[][];
  turn: "w" | "b";

  constructor(fen: string = START_FEN) {
    this.board = parseFen(fen) as any;
    this.turn = fen.split(" ")[1] as "w" | "b";
  }
  
  getBoard() {
    return this.board;
  }

  getMovesForSquare(row: number, col: number) {
    const piece = this.board[row]?.[col];
    if (!piece) return [];

    switch (piece.type) {
      case "p":
        return getPawnMoves(this.board, row, col, piece);

      default:
        return [];
    }
  }
}

// const c1 = new Chess()
// console.log(c1.getBoard());


