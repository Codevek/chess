import { parseFEN } from "./fen.js";
import { getBishopMoves } from "./moves/bishop.js";
import { getKnightMoves } from "./moves/knight.js";
import { getPawnMoves } from "./moves/pawn.js";
import { getQueenMoves } from "./moves/queen.js";
import { getRookMoves } from "./moves/rook.js";
import { getKingMoves } from "./moves/king.js";

const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export class Chess {
  constructor(fen = START_FEN) {
    this.board = parseFEN(fen);

    this.turn = fen.split(" ")[1];
  }

  getBoard() {
    return this.board;
  }

  getMovesForPiece(pRow, pCol) {
    const piece = this.board[pRow][pCol];
    // console.log(piece);

    if (!piece) return [];
    if (piece.color == this.turn) {
      switch (piece.type) {
        case "p":
          return getPawnMoves(this.board, pRow, pCol, piece);
        case "r":
          // console.log("here");
          return getRookMoves(this.board, pRow, pCol, piece);
          // console.log("here");
        case "b":
          return getBishopMoves(this.board, pRow, pCol, piece)
        case "q":
          return getQueenMoves(this.board, pRow, pCol, piece)
        case "n":
          // console.log("here");
          return getKnightMoves(this.board, pRow, pCol, piece)
        case "k":
          return getKingMoves(this.board, pRow, pCol, piece)
        default:
          return [];
      }
    }else{
      return []
    }
  }
}
