import { PIECES } from "./board/ChessPiece";

export default function CapturedPieces({ pieces, score }) {

  return (
    <div className="flex justify-center items-center h-30 w-96">
      <span className="text-amber-100">{score}</span>
      {pieces.map((move, index) => {
        const pieceKey = move.captured.type + move.captured.color.toUpperCase();
        return (
          <img
            key={index}
            src={PIECES[pieceKey]}
            alt={pieceKey}
            className="w-15 h-15 flex items-center justify-center"
          />
        );
      })}
    </div>
  );
}
