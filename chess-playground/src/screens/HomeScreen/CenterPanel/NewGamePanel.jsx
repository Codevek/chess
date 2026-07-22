import Button from "../components/Button";
import Bot from "../components/Bot";

export default function NewGamePanel(){
  return(
    <div className="flex flex-col gap-10 items-center">
      <Bot/>
      <Button/>
    </div>
  )
}