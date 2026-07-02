import { Chess } from "chess-engine";

export default function Board() {
  const game = new Chess();
  const board = game.getBoard();

  console.log(board);

  return (
    <div className="w-166 h-166 bg-amber-200 ">
      <div className="grid grid-cols-8 w-160 h-160">
        {board.flatMap((row, rowIndex) =>
          row.map((_, colIndex) => {
            const isLight = (rowIndex + colIndex) % 2 === 0;
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-20 h-20 ${isLight ? "bg-[#b5bbe1]" : "bg-[#ffffff]"}`}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}
