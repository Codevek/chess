import Square from "./Square";

export default function Board({ board, onSquareClick, selectedSquare, legalMoves, lastMove, kingInCheck}) {
  const squares = [];
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < 8; col++) {
      squares.push(
        <Square
          key={`${row} - ${col}`}
          row={row}
          col={col}
          piece={board[row][col]}
          selectedSquare={selectedSquare}
          legalMoves={legalMoves}
          lastMove={lastMove}
          kingInCheck={kingInCheck}

          onClick={onSquareClick}
        />,
      );
    }
  }

  return (
    <div className="grid grid-cols-8 aspect-square w-[min(8vw, 640px)]">
      {squares}
    </div>
  );
}
