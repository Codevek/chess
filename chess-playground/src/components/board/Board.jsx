import Square from "./Square";

export default function Board({
  board,
  onSquareClick,
  selectedSquare,
  legalMoves,
  lastMove,
  kingInCheck,
  flipped,
}) {
  const displayBoard = flipped
    ? [...board].reverse().map((row) => [...row].reverse())
    : board;

  console.log(displayBoard === board);
  

  const squares = [];
  for (let row = 0; row < displayBoard.length; row++) {
    for (let col = 0; col < 8; col++) {
      const actualRow = flipped ? 7 - row : row;
      const actualCol = flipped ? 7 - col : col;
      function toDisplayCoords(row, col, flipped) {
        return flipped ? [7 - row, 7 - col] : [row, col];
      }
      squares.push(
        <Square
          key={`${row} - ${col}`}
          row={row}
          col={col}
          piece={displayBoard[row][col]}
          selectedSquare={selectedSquare}
          legalMoves={legalMoves}
          lastMove={lastMove}
          kingInCheck={kingInCheck}
          onClick={() => onSquareClick(actualRow, actualCol)}
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
