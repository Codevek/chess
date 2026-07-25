import Button from "../components/Button";

export default function PracticePanel({ onStart, gameConfig, setGameConfig, mode }){
  return(
    <div>
      <Button onStart={onStart} gameConfig={gameConfig}/>
    </div>
  )
}