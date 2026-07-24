import { useState } from "react";
import SpotlightCard from "@/components/ui/SpotlightCard/SpotlightCard";
import ColorSlider from "@/components/ui/Slider/Slider";

export default function TimerControl({ gameConfig, setGameConfig }) {
  const [selectedMode, setSelectedMode] = useState("blitz");
  const [minute, setMinute] = useState(30);
  const [increment, setIncrement] = useState(5);

  const timeControls = [
    {
      id: "bullet",
      name: "Bullet",
      displayTime: "2+1 min",
      minute: 2,
      increment: 1,
      color: "rgba(239, 68, 68, 0.3)",
    }, // Red spotlight
    {
      id: "blitz",
      name: "Blitz",
      displayTime: "5 min",
      minute: 5,
      increment: 0,
      color: "rgba(234, 179, 8, 0.3)",
    }, // Yellow spotlight
    {
      id: "rapid",
      name: "Rapid",
      displayTime: "10+3 min",
      minute: 10,
      increment: 3,
      color: "rgba(34, 197, 94, 0.3)",
    }, // Green spotlight
    {
      id: "unlimited",
      name: "Unlimited",
      displayTime: "⚙️",
      minute: null,
      increment: null,
      color: "rgba(168, 85, 247, 0.3)",
    }, // Purple spotlight
    {
      id: "custom",
      name: "Custom",
      displayTime: "⚙️",
      color: "rgba(219, 37, 192, 0.3)",
      class: "col-span-2",
    }, // Purple spotlight
  ];

  return (
    <div className="h-[60vh] w-[30vw] grid grid-cols-2 grid-rows-2 gap-5">
      {timeControls.map((mode) => (
        <SpotlightCard
          key={mode.id}
          isSelected={selectedMode === mode.id}
          spotlightColor={mode.color}
          onClick={() => {
            setSelectedMode(mode.id)
            setMinute(mode.minute)
            setIncrement(mode.increment)
            setGameConfig(prev=>({
              ...prev,
              time: mode.minute*60,
              increment: mode.increment*60
            }));
            // console.log(gameConfig)
          }}
          className={`flex flex-col items-center justify-center text-center ${mode.class}`}
        >
          <h3
            className={`text-xl font-bold mb-1 transition-colors ${selectedMode === mode.id ? "text-white" : "text-neutral-300"}`}
          >
            {mode.name}
          </h3>
          <p className="text-neutral-400 font-mono">{mode.displayTime}</p>
        </SpotlightCard>
      ))}
      <div className="col-span-2">
        {selectedMode === "custom" && (
          <ColorSlider
            label={"Minutes"}
            value={minute}
            setvalue={setMinute}
            min={1}
            max={60}
          />
        )}
      </div>
      <div className="col-span-2">
        {selectedMode === "custom" && (
          <ColorSlider
            label={"Increment"}
            value={increment}
            setvalue={setIncrement}
            min={0}
            max={minute <= 10 ? minute : 10}
          />
        )}
      </div>
    </div>
  );
}
