import Stack from "@/components/ui/Stack/Stack";
import easy from "../../../assets/bots/easy.png";
import med from "../../../assets/bots/med.png";
import hard from "../../../assets/bots/hard.png";
import god from "../../../assets/bots/god.png";

export default function BotDifficultySelector() {
  const botLevels = [
    {
      id: "god",
      value: 4,
      content: (
        <img src={god} alt="" className="select-none [-webkit-user-drag:none]"/>
        // <img src={hard} alt="" />
      )
    },
    {
      id: "hard",
      value: 3,
      content: (
        // <img src={god} alt={id} />
        <img src={hard} alt="" className="select-none [-webkit-user-drag:none]"/>
      )
    },
    {
      id: "medium",
      value: 2,
      content: (
        <img src={med} alt="" className="select-none [-webkit-user-drag:none]"/>
        
      )
    },
    {
      id: "easy",
      value: 1,
      content: (
        <img src={easy} alt="" className="select-none [-webkit-user-drag:none]"/>
      )
    }
  ];

  const handleDifficultyChange = (selectedCard) => {
    console.log("Currently selected bot difficulty:", selectedCard.id);
    // Call your game logic setup here
    // e.g., setBotLevel(selectedCard.value)
  };

  return (
    <div className="flex justify-center items-center">
      <Stack 
        cards={botLevels} 
        onActiveCardChange={handleDifficultyChange}
        width="w-50"       // Easy control of width
        height="h-80"      // Easy control of height
        randomRotation={true}
      />
    </div>
  );
}