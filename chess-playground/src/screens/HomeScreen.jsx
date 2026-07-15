import { useState } from "react";
import App from "./BoardScreen";
import BoardScreen from "./BoardScreen";
// import App from "../../App";

export default function HomeScreen() {
  const [startGame, setStartGame] = useState(false);

  if (startGame) return <BoardScreen />;

  return (
    <div
      className="
        min-h-screen
        bg-[#1b1b20]
        flex
        overflow-hidden
        justify-center
        items-center
        gap-14"
    >
      <div className="h-[90vh] w-[95vw] isolate aspect-video rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 flex justify-center items-center">
        <button
          className="bg-purple-900 p-2 rounded-xl text-white"
          onClick={()=>setStartGame(true)}
        >
          New Game
        </button>
      </div>
    </div>
  );
}
