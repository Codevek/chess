import BentoButton from "../ui/MagicBento/BentoButton";
import MagicBento from "../ui/MagicBento/MagicBento";

export default function MenuLayout({
  clickEffect,
  enableTilt,
  enableMagnetism,
  particleCount,
  glowColor,
  onNewGame,
  onFlipBoard,
  onQuit
}) {
  const menuItems = [
    { title: "New Game", class: "col-span-3", action: onNewGame },
    { title: "Profile", class: "col-span-2 row-span-2" },
    { title: "Flip", action: onFlipBoard },
    { title: "Settings" },
    { title: "Chat" },
    { title: "Quit", class: "col-span-2", action: onQuit},
  ];

  return (
    // The wrapper provides these settings to all buttons automatically
    <MagicBento
      clickEffect={clickEffect}
      enableTilt={enableTilt}
      enableMagnetism={enableMagnetism}
      particleCount={particleCount}
      glowColor={glowColor}
    >
      <div className="grid grid-cols-3 grid-rows-4 gap-3 w-full h-full">
        {menuItems.map((item, index) => (
          <BentoButton
            key={index}
            className={item.class}
            title={item.title}
            onClick={item.action}
          />
        ))}
      </div>
    </MagicBento>
  );
}