import MenuLayout from "./MenuLayout";

export default function LeftPanel({ onNewGame, onFlipBoard, onQuitGame }) {
  return (
   <MenuLayout
    onNewGame={onNewGame}
    onFlipBoard={onFlipBoard}
    onQuitGame={onQuitGame}
   />
  );
}
