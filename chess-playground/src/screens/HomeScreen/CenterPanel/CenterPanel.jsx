import RecentGames from "./RecentGames";
import NewGamePanel from "./NewGamePanel";
import OnlinePanel from "./OnlinePanel";
import PracticePanel from "./PracticePanel";
import SettingsPanel from "./SettingsPanel";
import FriendPanel from "./FriendPanel";
import { MENU_MODE } from "@/lib/menuModes";

export default function CenterPanel({ mode, onClick }) {
  let content;

  switch (mode) {
    case MENU_MODE.HOME:
      content = <RecentGames />;
      break;

    case MENU_MODE.NEW_GAME:
      content = <NewGamePanel onClick={onClick}/>;
      break;

    case MENU_MODE.ONLINE:
      content = <OnlinePanel />;
      break;

    case MENU_MODE.PRACTICE:
      content = <PracticePanel />;
      break;

    case MENU_MODE.FRIEND:
      content = <FriendPanel />;
      break;

    case MENU_MODE.SETTINGS:
      content = <SettingsPanel />;
      break;

    default:
      content = <RecentGames />;
  }

  const req = content

  return (
    <div>
        {content}
    </div>
  );
}
