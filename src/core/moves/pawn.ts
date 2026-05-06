import type { Piece } from "../../types/piece";
import type { Move } from "../../types/move";
import type { isInsideBoard } from "../utils"
import type { Chess } from "../game"
import { parseFen } from "../fen";

export function getPawnMove(
    board: (Piece | null)[][],
    row: number,
    column: number,
    piece: Piece,
    // isInsideBoard: boolean
): Move[]{

    const moves: Move[] = []
    
    return moves

}

getPawnMove((parseFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')), 8, 7, ({
  type: "p",
  color: "w"
}))