import BentoButton from "@/components/leftPanel/BentoButton";

export default function TopMenu({ mode, setMode }) {
  const menuItems = [
    { id: "newgame", title: "New Game", class: "col-span-2 row-span-2" },
    { id: "online", title: "Play Online", class: "col-span-3 row-span-1" },
    { id: "settings", title: "Settings", class: "col-span-2 row-span-1" },
    { id: "practice", title: "Practice", class: "col-span-2" },
    { id: "friend", title: "Play With Friend", class: "col-span-3" },
  ];

  return (
    <div className="grid grid-cols-7 grid-rows-2 gap-3">
      {menuItems.map((item) => {
        return (
          <BentoButton
            key={item.id}
            className={item.class}
            title={item.title}
            active={mode === item.id}
            onClick={() => {
              setMode(mode === item.id ? "home" : item.id);
            }}
          />
        );
      })}
    </div>
  );
}
