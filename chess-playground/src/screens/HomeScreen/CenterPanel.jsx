export default function CenterPanel({ mode }) {
  switch (mode) {
    case "home":
      return <RecentGames />;

    case "newgame":
      return <NewGamePanel />;

    case "online":
      return <OnlinePanel />;

    case "practice":
      return <PracticePanel />;

    case "friend":
      return <FriendPanel />;

    case "settings":
      return <SettingsPanel />;

    default:
      return <RecentGames />;
  }
}
