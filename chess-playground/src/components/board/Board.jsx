import Square from "./Square";

export default function Board({
  board,
  onSquareClick,
  isSelected,
  isLastMove,
  isKingInCheck,
  isLegalMove,
  flipped,
}) {
  // console.log(flipped);

  const displayBoard = flipped
    ? [...board].reverse().map((row) => [...row].reverse())
    : board;

  const toBoardCoords = (row, col) => {
    if (!flipped) return [row, col];
    return [7 - row, 7 - col];
  };

  const squares = [];
  for (let row = 0; row < displayBoard.length; row++) {
    for (let col = 0; col < 8; col++) {
      const actualRow = flipped ? 7 - row : row;
      const actualCol = flipped ? 7 - col : col;
      const [boardRow, boardCol] = toBoardCoords(row, col, flipped);
      function toDisplayCoords(row, col) {
        return flipped ? [7 - row, 7 - col] : [row, col];
      }
      squares.push(
        <Square
          key={`${row} - ${col}`}
          row={boardRow}
          col={boardCol}
          piece={displayBoard[row][col]}
          isSelected={isSelected}
          isLegalMove={isLegalMove}
          isLastMove={isLastMove}
          isKingInCheck={isKingInCheck}
          onClick={() => onSquareClick(actualRow, actualCol)}
        />,
      );
    }
  }

  return (
    <div className="grid grid-cols-8 aspect-square w-[min(8vw, 640px)] rounded-sm overflow-hidden shadow-2xl">
      {squares}
    </div>
  );
}
// board.map((row)=>{
//   row.map((col)=>{
//     return(
//       <Square
//       key={`${row} - ${col}`}
//       row={row}
//       col={col}
//       piece={board[row][col]}
//       selectedSquare={selectedSquare}
//       legalMoves={legalMoves}
//       lastMove={lastMove}
//       kingInCheck={kingInCheck}

//       onClick={onSquareClick}
//     />
//     )
//   })
// })
