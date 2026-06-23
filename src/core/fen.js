import { Color, Piece } from "../types/piece.js";
import { PieceType } from "../types/piece.js";
import { Chess } from "./game.js";

export function parseFEN(fen) {
  const [boardPart = ""] = fen.split(" ");

  const rows = boardPart.split("/");

  return rows.map((row) => {
    const result = [];

    for (const char of row) {
      if (!isNaN(Number(char))) {
        const empty = Number(char);

        for (let i = 0; i < empty; i++) {
          result.push(null);
        }
      } else {
        const isWhite = char === char.toUpperCase();

        result.push({
          type: char.toLowerCase(),
          color: isWhite ? "w" : "b",
        });
      }
    }
    // console.log(result[0]);

    return result;
  });
}
// console.table(parseFEN("r3k2r/8/8/8/8/8/8/R3K2R b KQkq - 0 1"))
// const newboard = parseFEN("7q/1n1r2P1/5N2/1p2k2p/2p4n/1PK3P1/p7/R1B5 w - - 0 1")

// // // console.log(!newboard[4][4]); //this means wheather its null or not (true ==  null  or false == !null(i.e some piece is there))
// console.log(newboard[6][1]);

export function generateFEN(board) {
  const fenArr = [];
  let nullCount = 0;
  let pType;
  let mtSpace = 0
  for (let i = 0; i < board.length; i++) {
    nullCount = 0;
    pType = "";
    for (let j = 0; j < board[i].length; j++) {
      const piece = board[i][j];
      if (piece === null) {
        nullCount += 1;
      } else {
        // mtSpace += nullCount
        nullCount = 0;
        if (piece.color === "w") {
          pType += piece.type.toUpperCase();
        } else {
          pType += piece.type;
        }
        // continue
      }
    }
    console.log(mtSpace);
    
    // var req
    // req+= nullCount
    // req += pType
    // console.log(req);
    
  }
}

const game = new Chess("8/5P1q/6p1/3k2P1/R2pp3/P1bP2N1/1p6/1K1nQ3 w - - 0 1");
generateFEN(game.getBoard());
