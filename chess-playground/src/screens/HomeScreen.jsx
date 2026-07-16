import { useState } from "react";
import App from "./BoardScreen";
import LiquidEther from "@/components/ui/LiquidEther";
import BoardScreen from "./BoardScreen";
// import App from "../../App";

export default function HomeScreen() {
  const [startGame, setStartGame] = useState(false);

  if (startGame) return <BoardScreen />;

  return (
    <>
      <div className="h-screen w-screen bg-black flex items-center">
        {/* <div className="h-[90vh] w-screen isolate aspect-video rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5"> */}
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B497CF"]}
          mouseForce={10}
          cursorSize={130}
          isViscous
          viscous={44}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.4}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={3.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          color0="#5227FF"
          color1="#FF9FFC"
          color2="#B497CF"
        />
        {/* </div> */}
      </div>

      <button
        className="bg-purple-900 p-2 rounded-xl text-white"
        onClick={() => setStartGame(true)}
      >
        New Game
      </button>
    </>
  );
}
