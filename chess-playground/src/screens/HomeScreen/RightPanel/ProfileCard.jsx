
export default function ProfileCard({ avatar, name, rating, country }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col">
        <h2 className="text-white text-lg font-medium leading-none">
            {name}
        </h2>
        {(rating || country) && <p className="text-zinc-700 text-sm mt-1">
            {rating} . {country}
        </p>}
      </div>
      <img 
        src={avatar} 
        alt={name}
        className="w-14 h-14 rounded-full object-cover border border-zinc-600" 
      />
    </div>
  );
}