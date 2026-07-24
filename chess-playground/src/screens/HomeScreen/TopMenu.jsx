import BentoButton from "@/components/ui/MagicBento/BentoButton";
import MagicBento from "@/components/ui/MagicBento/MagicBento";

export default function TopMenu({
  mode,
  setMode,
  enableTilt,
  enableMagnetism,
  particleCount,
  glowColor,
  clickEffect,
  gameConfig,
  setGameConfig
}) {
  const menuItems = [
    { id: "newgame", title: "New Game", class: "col-span-2 row-span-2" },
    { id: "online", title: "Play Online", class: "col-span-3 row-span-1" },
    { id: "settings", title: "Settings", class: "col-span-2 row-span-1" },
    { id: "practice", title: "Practice", class: "col-span-2" },
    { id: "friend", title: "Play With Friend", class: "col-span-3" },
  ];

  return (
    <MagicBento>
    <div className="grid grid-cols-7 grid-rows-2 gap-3">
      {menuItems.map((item) => {
        return (
          <BentoButton
            key={item.id}
            className={item.class}
            title={item.title}
            titleClassName="text-3xl font-semibold"
            active={mode === item.id}
            clickEffect={clickEffect}
            enableTilt={enableTilt}
            enableMagnetism={enableMagnetism}
            particleCount={particleCount}
            glowColor={glowColor}
            onClick={() => {
              setMode(mode === item.id ? "home" : item.id);
              setGameConfig(prev=>({
                ...prev,
                mode: item.id
              }))
            }
          }
          />
        );
      })}
    </div>
    </MagicBento>
  );
}
