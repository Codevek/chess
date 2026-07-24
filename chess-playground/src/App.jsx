import { useState } from "react";
import BoardScreen from "./screens/BoardScreen/BoardScreen";
import Button from "./screens/HomeScreen/components/Button";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import { MENU_MODE } from "./lib/menuModes";
import { DEFAULT_GAME_CONFIG } from "@/lib/gameConfig";
import createGameSesssion from "./lib/createGameSession";

export default function App() {
  const [mode, setMode] = useState(MENU_MODE.HOME);
  // const [startGame, setStartGame] = useState(false);
  const [gameConfig, setGameConfig] = useState(DEFAULT_GAME_CONFIG);
  const [screen, setScreen] = useState("homeScreen");
  const [gameSession, setGameSession] = useState(null);

  function handleStart(config) {
    const session = createGameSesssion(config)
    setGameSession(session)
    setScreen("boardScreen");
  }

  if (screen === "homeScreen"){
    return (
      <HomeScreen
        mode={mode}
        setMode={setMode}
        gameConfig={gameConfig}
        setGameConfig={setGameConfig}
        onStart={handleStart}
      />
    );
  }
  else if(screen === "boardScreen"){
    return(
      <BoardScreen
        session={gameSession}
      />
    )
  }
}
