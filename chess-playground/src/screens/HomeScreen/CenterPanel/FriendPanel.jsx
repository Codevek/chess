import { useState, useEffect } from "react";
import Friend from "../components/Friend";
import TimerControl from "../components/TimerControl";
import ChessProfileSelector from "@/components/aicanvas/tilted-coverflow";
import MatchmakingPanel from "../components/MatchMakingPanel";
import socket from "@/lib/socket";

export default function FriendPanel() {
  const [friends, setFriends] = useState([]);
  const [friendIndex, setFriendIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  // const filteredFriends = friends.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  const handleInviteClick = (index, friend) => {
    // trigger toast
    // onShowToast(
    //   `Challenge dispatched to ${friend.fullName}! Waiting for accept...`,
    //   "send",
    // );

    // trigger socket
    socket.emit("inviteFriend", friend._id);

    // update state for MatchmakingPanel
    setFriendIndex(index + 1); // +1 because 0 is EMPTY_PROFILE
    setIsSpinning(true);
  };

  const handleSelectOpponent = (profile) => {
    console.log("Opponent selected:", profile);
  };

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
        console.log(friends);
      } catch (error) {
        console.log(error);
      }
    }
    getFriends();
  }, []); // run once on mount

  return (
    <div className="h-[59vh] border-amber-300 flex justify-evenly">
      <div className="h-full w-[50%] flex flex-col rounded-sm border border-white/10 shadow-xl p-2 gap-5">
        <div className="p-3">
          <h1 className="flex text-amber-100 text-2xl">Friends and Rivals</h1>
          <p className="text-zinc-400 text-xs">
            Send an instant challenge popup to friends currently logged in !
          </p>
        </div>
        <div className="flex flex-col gap-1">
          {friends.map((friend, index) => (
            <Friend
              name={friend.fullName}
              rating={friend.rating}
              lastSeen={friend.lastSeen}
              country={friend.country}
              friend={friend}
              onInviteClick={() => handleInviteClick(index, friend)}
            />
          ))}
        </div>
      </div>
      {/* <div className="flex flex-col">
        <h2 className="text-3xl text-shadow-accent-foreground text-zinc-400 underline">
          Invite a Friend to Play with Him
        </h2>
        <div className="flex">
          <div className="border border-zinc-500 h-30 w-30 rounded-full"></div>
          <div className="border border-zinc-500 h-30 w-30 rounded-full"></div>
        </div>
      </div> */}
      <MatchmakingPanel friends={friends} friendIndex={friendIndex} isSpinning={isSpinning} setIsSpinning={setIsSpinning} />
    </div>
  );
}
