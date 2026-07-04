import ChessPiece from "./ChessPiece";

export default function Square({
  row,
  col,
  piece,
  onClick,
  selectedSquare,
  legalMoves,
  lastMove,
  kingInCheck
}) {
  // console.log(row,col);
  const isLight = (row + col) % 2;
  const isSelected =
    selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;
  const isLegalMove = legalMoves.some(
    (move) => move.to[0] === row && move.to[1] === col,
  );
  const isLastMove =
    lastMove &&
    (
        (lastMove.from[0] === row && lastMove.from[1] === col) ||
        (lastMove.to[0] === row && lastMove.to[1] === col)
    );
  const isKingInCheck = kingInCheck && kingInCheck[0] === row && kingInCheck[1] === col
    // console.log(legalMoves);
    


  return (
    <div
      className={`
            w-20 h-20
            ${isLight === 0 ? "bg-[#c9c1b5]" : "bg-[#a79f94]"}
            ${isSelected ? "bg-green-300" : ""}
            ${isLegalMove ? "bg-blue-300" : ""}
            ${isLastMove ? "bg-amber-600" : ""}
            ${isKingInCheck? "bg-red-800": ""}
            
        `}
      onClick={() => onClick(row, col)}
    >
      <ChessPiece
        piece={piece}
        // onSquareClick={()=> onClick(row, col)}
      />
    </div>
  );
}
