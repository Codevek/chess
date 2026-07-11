import MagicBento from "../ui/MagicBento";

export default function LeftPanel({onNewGame, onFlipBoard}) {
  // if(onFlipBoard) console.log("hey");
  return (
    <div className="w-85 h-105">
      <MagicBento 
        onNewGame= {onNewGame}
        onFlipBoard={onFlipBoard}
       />
    </div>
  );
}