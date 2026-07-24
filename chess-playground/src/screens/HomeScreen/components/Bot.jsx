import Stack from "@/components/ui/Stack/Stack";
import easy from "../../../assets/bots/easy.png";
import med from "../../../assets/bots/med.png";
import hard from "../../../assets/bots/hard.png";
import god from "../../../assets/bots/god.png";
import { useCallback } from "react";

// 1. Move this OUTSIDE the component so its memory reference never changes on re-renders
const botLevels = [
  {
    id: "god",
    value: 4,
    content: <img src={god} alt="" className="select-none [-webkit-user-drag:none]"/>
  },
  {
    id: "hard",
    value: 3,
    content: <img src={hard} alt="" className="select-none [-webkit-user-drag:none]"/>
  },
  {
    id: "medium",
    value: 2,
    content: <img src={med} alt="" className="select-none [-webkit-user-drag:none]"/>
  },
  {
    id: "easy",
    value: 1,
    content: <img src={easy} alt="" className="select-none [-webkit-user-drag:none]"/>
  }
];

export default function BotDifficultySelector({gameConfig, setGameConfig}) {
  
  const handleDifficultyChange = useCallback((selectedCard) => {
    console.log("Currently selected bot difficulty:", selectedCard.id);
    
    setGameConfig(prev => {
      if (prev.difficulty === selectedCard.id) return prev;
      return {
        ...prev,
        difficulty: selectedCard.id
      };
    });
    
  }, [setGameConfig]);

  return (
    <div className="flex justify-center items-center">
      <Stack 
        cards={botLevels} 
        onActiveCardChange={handleDifficultyChange}
        width="w-50"
        height="h-80"
        randomRotation={true}
      />
    </div>
  );
}