import { useState, useEffect } from "react";

export default function FriendPanel() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    async function getFriends() {
      try {
        let res = await fetch("http://localhost:5000/friends/", {
          method: "GET",
          credentials: "include",
        });
        const json = await res.json();
        // console.log(json.data);
        setFriends(json.data);
      } catch (error) {
        console.log(error);
      }
    }
    getFriends();
  }, []); // run once on mount

  return (
    <div className="h-[59vh] border-amber-300">
      <div className="h-full w-[30%] flex flex-col rounded-sm border border-white/10 shadow-xl p-2 gap-5">
        <div className="flex justify-center text-amber-100 text-xl">
          Friends
        </div>
        <div>
          {friends.map((friend, index) => (
            <div className="flex justify-evenly">
              <div key={index} className="text-2xl text-zinc-200">
                {friend.fullName}
              </div>
              <button
                className="text-amber-50 text-2xl"
                onClick={() => console.log(friend.fullName)}
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
