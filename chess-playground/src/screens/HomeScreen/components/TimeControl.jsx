import { useState } from "react";
import SpotlightCard from "@/components/ui/SpotlightCard/SpotlightCard";
import ColorSlider from "@/components/ui/Slider/Slider";

export default function TimerControl() {
  const [selectedMode, setSelectedMode] = useState("blitz");
  const [minute, setMinute] = useState(30);
  const [increment, setIncrement] = useState(5);

  const timeControls = [
    {
      id: "bullet",
      name: "Bullet",
      time: "1 min",
      color: "rgba(239, 68, 68, 0.3)",
    }, // Red spotlight
    {
      id: "blitz",
      name: "Blitz",
      time: "3 min",
      color: "rgba(234, 179, 8, 0.3)",
    }, // Yellow spotlight
    {
      id: "rapid",
      name: "Rapid",
      time: "10 min",
      color: "rgba(34, 197, 94, 0.3)",
    }, // Green spotlight
    {
      id: "custom",
      name: "Custom",
      time: "⚙️",
      color: "rgba(168, 85, 247, 0.3)",
    }, // Purple spotlight
    {
      id: "unlimited",
      name: "Unlimited",
      time: "⚙️",
      color: "rgba(168, 85, 247, 0.3)",
      class: "span-col-2"
    }, // Purple spotlight
  ];

  return (
    <div className="h-[60vh] w-[30vw] grid grid-cols-2 grid-rows-2 gap-5">
      {timeControls.map((mode) => (
          <SpotlightCard
            key={mode.id}
            isSelected={selectedMode === mode.id}
            onClick={() => setSelectedMode(mode.id)}
            spotlightColor={mode.color}
            className="flex flex-col items-center justify-center text-center"
          >
            <h3
              className={`text-xl font-bold mb-1 transition-colors ${selectedMode === mode.id ? "text-white" : "text-neutral-300"}`}
            >
              {mode.name}
            </h3>
            <p className="text-neutral-400 font-mono">{mode.time}</p>
          </SpotlightCard>
      ))}
      <div className="col-span-2">
        {selectedMode === "custom" && (
          <ColorSlider label={"Minutes"} value={minute} setvalue={setMinute} />
        )}
      </div>
      <div className="col-span-2">
        {selectedMode === "custom" && (
          <ColorSlider
            label={"Increment"}
            value={increment}
            setvalue={setIncrement}
          />
        )}
      </div>
    </div>
  );
}
