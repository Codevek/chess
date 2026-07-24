import { useState } from "react";
import TopMenu from "./TopMenu";
import { MENU_MODE } from "@/lib/menuModes";
import ProfileCard from "./RightPanel/ProfileCard";
import PuzzleList from "./RightPanel/PuzzleList";
import CenterPanel from "./CenterPanel/CenterPanel";
import avatar3 from "../../assets/avtars/avatar1.jpg";
import Button from "./components/Button";
import BoardScreen from "../BoardScreen/BoardScreen";

export default function HomeScreen({
  mode,
  setMode,
  gameConfig,
  setGameConfig,
  onStart,
}) {
  console.log(gameConfig);

  return (
    <main className="min-h-screen bg-[#1b1b20] flex justify-evenly">
      <div className="flex flex-col justify-evenly items-center">
        <div className="w-[70vw] h-[30vh] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl p-6">
          <TopMenu
            mode={mode}
            setMode={setMode}
            gameConfig={gameConfig}
            setGameConfig={setGameConfig}
          />
        </div>
        <div className="w-[70vw] h-[60vh]">
          <CenterPanel
            mode={mode}
            onStart={onStart}
            gameConfig={gameConfig}
            setGameConfig={setGameConfig}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-evenly gap-5">
        <ProfileCard
          name={"Vivek Sharma"}
          country={"IND"}
          rating={"5000"}
          avatar={avatar3}
        />
        <div className="w-[25vw] h-[82vh] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl"></div>
      </div>
    </main>
  );
}
