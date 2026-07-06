const files = "abcdefgh";
function squareName(square) {
  return files[square[1]] + (8 - square[0]);
}

export default function HistoryPanel({ history }) {
  const rows = [];
  for (let i = 0; i < history.length; i += 2) {
    rows.push({
      white: history[i],
      black: history[i + 1],
    });
  }

  // rows.map((move, index)=>(

  // ))

  return (
    <div className="w-60 h-160 border border-zinc-700 bg-zinc-900/40 backdrop-blur-xl overflow-y-auto">
      {rows.map((move, index) => (
        <div
          key={index}
          className="
            grid
            grid-cols-[40px_1fr_1fr]
            items-center
            border-b
            border-zinc-800
            h-12
            px-3
            text-amber-50
          "        
        >
          <span>{index + 1}</span>

          <span>
            {move.white &&
              squareName(move.white.from) + squareName(move.white.to)}
          </span>

          <span>
            {move.black &&
              squareName(move.black.from) + squareName(move.black.to)}
          </span>
        </div>
      ))}
    </div>
  );
}
