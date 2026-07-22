import Timer from "./Timer";

export default function PlayerCard({ avatar, name, rating, country, time }) {
  return (
    <div className="flex items-center gap-4">
      <img 
        src={avatar} 
        alt={name}
        className="w-14 h-14 rounded-full object-cover border border-zinc-600" 
      />
      {time && <Timer time={time}/>}
      <div className="flex flex-col">
        <h2 className="text-white text-lg font-medium leading-none">
            {name}
        </h2>
        <p className="text-zinc-700 text-sm mt-1">
            {rating} . {country}
        </p>
      </div>
    </div>
  );
}
