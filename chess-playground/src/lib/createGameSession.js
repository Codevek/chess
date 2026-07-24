import { BOT_DEPTH } from "./botLevel";

export default function createGameSesssion(config) {
  const playerColor =
    config.color === "random"
      ? Math.random() < 0.5
        ? "black"
        : "white"
      : config.color;
  const botColor = playerColor === "white" ? "black" : "white";
  const botDepth = BOT_DEPTH[config.difficulty];

  return {
    mode: config.mode,

    difficulty: config.difficulty,

    depth: BOT_DEPTH[config.difficulty],

    playerColor,

    botColor,

    whiteTime: config.time,

    blackTime: config.time,

    increment: config.increment,

    flipped: playerColor === "black",
  };
}
