import BentoButton from "./BentoButton";

export default function MenuLayout({
  clickEffect,
  enableTilt,
  enableMagnetism,
  particleCount,
  glowColor,
  onNewGame,
  onFlipBoard
}) {
  const menuItems = [
    { title: "New Game", class: "col-span-3", action: onNewGame },
    { title: "Profile", class: "col-span-2 row-span-2" },
    { title: "Flip", action: onFlipBoard },
    { title: "Settings" },
    { title: "Chat" },
    { title: "Analysis", class: "col-span-2" },
  ];
  
  

  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-3 w-full h-full">
      {menuItems.map((item, index) => {
        return (
          <BentoButton
            key={index}
            className={item.class}
            title={item.title}
            onClick={item.action}
            clickEffect={clickEffect}
            enableTilt={enableTilt}
            enableMagnetism={enableMagnetism}
            particleCount={particleCount}
            glowColor={glowColor}
          />
        );
      })}
    </div>
  );
}
