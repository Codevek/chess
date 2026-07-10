import BentoButton from "./BentoButton";

export default function MenuLayout({
  clickEffect,
  enableTilt,
  enableMagnetism,
  particleCount,
  glowColor,
  onClick
}) {
  const menuItems = [
    { title: "New Game", class: "col-span-3" },
    { title: "Profile", class: "col-span-2 row-span-2" },
    { title: "Flip" },
    { title: "Settings" },
    { title: "Chat" },
    { title: "Analysis", class: "col-span-2" },
  ];

  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-3 w-full h-full">
      {menuItems.map((item) => {
        return (
          <BentoButton
            className={item.class}
            title={item.title}
            onClick={onClick}
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
