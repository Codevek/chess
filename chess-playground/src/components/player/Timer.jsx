export default function Timer({ time }) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const displaySeconds = seconds.toString().padStart(2, 0);
  return (
    <div className="text-white text-6xl font-light tracking-tight">
      {minutes}:{seconds}
    </div>
  );
}
