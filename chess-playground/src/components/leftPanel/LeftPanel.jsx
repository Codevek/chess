import MenuLayout from "./MenuLayout";

export default function LeftPanel({ onNewGame, onFlipBoard, onQuit }) {
  return (
   <MenuLayout
    onNewGame={onNewGame}
    onFlipBoard={onFlipBoard}
    onQuit={onQuit}
   />
  );
}
