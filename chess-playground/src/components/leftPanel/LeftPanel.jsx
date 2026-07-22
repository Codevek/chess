import MenuLayout from "./MenuLayout";

export default function LeftPanel({ onNewGame, onFlipBoard }) {
  return (
   <MenuLayout
    onNewGame={onNewGame}
    onFlipBoard={onFlipBoard}
   />
  );
}
