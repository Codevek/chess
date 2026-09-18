import InviteButton from "./InviteButton";

export default function Friend({
  name,
  avatar,
  rating,
  country,
  isOnline,
  isPlaying,
  inMatchFor,
  lastSeen,
}) {
  //   const [relSeen, relLastSeen] = useState(null);
  let relLastSeen;
  const now = new Date();
  const lastSeenDate = new Date(lastSeen);

  const diffInMs = Math.round(lastSeenDate - now);
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  console.log(lastSeenDate);
  if (lastSeen) {
    if (Math.abs(diffInSecs) >= 60) {
      if (Math.abs(diffInMins) >= 60) {
        if (Math.abs(diffInHours) >= 24) {
          relLastSeen = rtf.format(diffInDays, "day");
        } else {
          relLastSeen = rtf.format(diffInHours, "hour");
        }
      } else {
        relLastSeen = rtf.format(diffInMins, "minute");
      }
    } else {
      relLastSeen = rtf.format(diffInSecs, "second");
    }
  } else {
    relLastSeen = "N.A";
  }

  return (
    <div className=" p-3 rounded-md bg-[#120F17] flex gap-3 justify-between">
      <div className="flex">
        <img
          src="avatar"
          alt={name}
          className="border border-zinc-600 rounded-full h-10 w-10"
        />
        <div>
          <div className="text-amber-50 text-xl">
            {name}
            <span className="p-4 text-xs text-zinc-700">
              {country.toUpperCase()}
            </span>
          </div>
          <div className="flex gap-3">
            <span className="text-yellow-600 font-mono font-extrabold text-sm">
              {rating}
            </span>
            {isOnline && inMatchFor === null ? (
              <h1 className="text-green-700 font-mono font-extrabold text-sm">
                ONLINE in Lobby
              </h1>
            ) : (
              <h1 className="text-zinc-400 font-mono font-extrabold text-sm">
                Offline (Last seen {relLastSeen})
              </h1>
            )}
          </div>
        </div>
      </div>
      <InviteButton />
    </div>
  );
}
