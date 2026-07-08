import { PIECES } from "./board/ChessPiece";

export default function CapturedPieces({ history, color }) {
  const capturedPieces = history.filter(
    (move) => move.captured !== null && move.color === color,
  );
//   console.log(capturedPiece);
  const VALUES = {
    p: 1,
    n: 3,
    b: 3,
    r: 5,
    q: 9,
  };
  let score = 0;

  capturedPieces.forEach((move) => {
    score += VALUES[move.captured.type];
  });

  return (
    <div className="flex justify-center items-center h-30 w-96">
      <span className="text-amber-100">+{score}</span>
      {capturedPieces.map((move, index) => {
        const pieceKey = move.captured.type + move.captured.color.toUpperCase();
        return (
          <img
            key={index}
            src={PIECES[pieceKey]}
            alt={pieceKey}
            className="w-15 h-15"
          />
        );
      })}
    </div>
  );
}
