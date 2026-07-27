import Button from "../components/Button";

export default function PracticePanel({
  onStart,
  gameConfig,
  setGameConfig,
  mode,
}) {
  // setGameConfig((prev) => {
  //   return { ...prev, mode: "practice" };
  // });
  return (
    <div>
      <Button onStart={onStart} gameConfig={gameConfig} />
    </div>
  );
}
