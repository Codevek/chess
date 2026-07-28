import { BOT_DEPTH } from "./botLevel";

export default function createGameSesssion(config) {
  const playerColor =
    config.color === "random"
      ? Math.random() < 0.5
        ? "black"
        : "white"
      : config.color;
  const botColor = playerColor === "white" ? "black" : "white";

  return {
    mode: config.mode,
    difficulty: config.difficulty,
    depth: BOT_DEPTH[config.difficulty],
    withBonus: config.difficulty === "hard"? false: true,
    playerColor,
    botColor,
    whiteTime: config.time,
    blackTime: config.time,
    increment: config.increment,
    flipped: playerColor === "black",
  };
}
