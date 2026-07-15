import { PIECES } from "./board/ChessPiece";

const files = "abcdefgh";
function squareName(square) {
  return files[square[1]] + (8 - square[0]);
}

function moveText(move) {
  if (!move) return "";

  let text = "";

  // text += PIECES[move.piece];

  text += squareName(move.from);

  if (move.captured) {
    text += "❌";
  }

  text += squareName(move.to);

  return text;
}

export default function HistoryPanel({ history }) {
  const rows = [];
  for (let i = 0; i < history.length; i += 2) {
    rows.push({
      white: history[i],
      black: history[i + 1],
    });
  }

  // console.log(rows);

  // rows.map((move, index)=>(

  // ))

  return (
    <div className="history w-96.5 h-96.5 border border-zinc-700 bg-zinc-900/40 backdrop-blur-xl overflow-y-auto rounded-xl">
      {rows.map((move, index) => (
        <div
          key={index}
          className="
            grid
            grid-cols-[50px_1fr_1fr]
            items-center
            border-b
            border-zinc-800
            h-12
            px-5
            text-amber-50
          "
        >
          <span>{index + 1}</span>

          <span className="flex items-center gap-1">
            {move.white && (
              <img
                className="w-10 h-10 inline-block align-middle"
                src={PIECES[move.white.piece + move.white.color.toUpperCase()]}
                alt=""
              />
            )}
            {move.white && moveText(move.white)}
          </span>

          <span className="flex items-center gap-1">
            {move.black && (
              <img
                className="w-10 h-10 inline-block align-middle"
                src={PIECES[move.black.piece + move.black.color.toUpperCase()]}
                alt=""
              />
            )}
            {move.black && moveText(move.black)}
          </span>
        </div>
      ))}
    </div>
  );
}
