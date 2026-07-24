import Button from "../components/Button";
import Bot from "../components/Bot";
import { useState } from "react";
import BoardScreen from "@/screens/BoardScreen/BoardScreen";
import TimeControl from "../components/TimeControl";
import ColorSelector from "../components/ColorSelector";

export default function NewGamePanel({ onStart, gameConfig, setGameConfig, mode }) {
  return (
    <div className="flex justify-evenly">
      <TimeControl gameConfig={gameConfig} setGameConfig={setGameConfig}/>
      <div className="h-[60vh] w-[30%] flex flex-col justify-evenly">
        <Bot gameConfig={gameConfig} setGameConfig={setGameConfig}/>
        <div className="p-3 flex justify-center">
          <Button onStart={onStart} gameConfig={gameConfig}/>
        </div>
      </div>
      <div className="w-[30%]">
        <ColorSelector gameConfig={gameConfig} setGameConfig={setGameConfig}/>
      </div>
    </div>
  );
}
