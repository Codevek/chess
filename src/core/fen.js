import { Piece } from "../types/piece.js";

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

// const newboard = parseFEN("7q/1n1r2P1/5N2/1p2k2p/2p4n/1PK3P1/p7/R1B5 w - - 0 1")

// // // console.log(!newboard[4][4]); //this means wheather its null or not (true ==  null  or false == !null(i.e some piece is there))
// console.log(newboard[6][1]);

