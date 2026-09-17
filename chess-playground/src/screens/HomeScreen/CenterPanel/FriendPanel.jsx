import { useState, useEffect } from "react";
import Friend from "../components/Friend";

export default function FriendPanel() {
  const [friends, setFriends] = useState([]);

  const [search, setSearch] = useState('');

  // const filteredFriends = friends.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  const handleInvite = (name) => {
    onShowToast(`Challenge dispatched to ${name}! Waiting for accept...`, 'send');
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
    <div className="h-[59vh] border-amber-300">
      <div className="h-full w-[50%] flex flex-col rounded-sm border border-white/10 shadow-xl p-2 gap-5">
      <div className="p-3">

        <h1 className="flex text-amber-100 text-2xl">
          Friends and Rivals
        </h1>
        <p className="text-zinc-400 text-xs">Send an instant challenge popup to friends currently logged in !</p>
      </div>
        <div className="flex flex-col gap-1">
          {friends.map((friend, index) => (
            // <div className="flex justify-evenly">
            //   <div key={index} className="text-2xl text-zinc-200">
            //     {friend.fullName}
            //   </div>
            //   <button
            //     className="text-amber-50 text-2xl"
            //     onClick={() => console.log(friend.fullName)}
            //   >
            //     +
            //   </button>
            // </div>
            <Friend name= {friend.fullName} rating={friend.rating} lastSeen={friend.lastSeen} country={friend.country}/>
          ))}
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="bg-surface-container-low rounded-xl p-space-xl shadow-xl flex flex-col gap-space-lg">
  //     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
  //       <div className="flex items-center gap-space-sm">
  //         <span className="material-symbols-outlined text-secondary text-[24px]">group</span>
  //         <div>
  //           <h3 className="font-headline-md text-headline-md text-on-surface">Online Comrades & Rivals</h3>
  //           <span className="font-body-sm text-body-sm text-on-surface-variant">Send an instant challenge popup to friends currently logged in</span>
  //         </div>
  //       </div>
  //       <div className="relative w-full sm:w-64">
  //         <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
  //         <input 
  //           value={search}
  //           onChange={(e) => setSearch(e.target.value)}
  //           className="w-full bg-surface-container-lowest rounded-lg pl-9 pr-space-md py-space-xs font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary" 
  //           placeholder="Search comrades..." 
  //           type="text"
  //         />
  //       </div>
  //     </div>

  //     <div className="flex flex-col gap-space-xs">
  //       {filteredFriends.map((friend) => (
  //         <div key={friend.id} className={`p-space-md rounded-xl ${friend.isOnline ? 'bg-surface-container hover:bg-surface-container-high' : 'bg-surface-container/60 opacity-75'} transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-space-md`}>
  //           <div className="flex items-center gap-space-md">
  //             <div className="relative">
  //               <div className={`w-12 h-12 rounded-xl bg-surface-bright ${!friend.isOnline && 'grayscale'}`}></div>
  //               <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ring-2 ring-surface-container ${friend.badgeColor}`}></span>
  //             </div>
  //             <div className="flex flex-col">
  //               <div className="flex items-center gap-space-xs">
  //                 {friend.title && <span className="font-label-sm text-label-sm px-1 rounded bg-secondary-container text-on-secondary-container font-bold">{friend.title}</span>}
  //                 <span className={`font-headline-md text-body-lg font-bold ${friend.isOnline ? 'text-on-surface' : 'text-on-surface-variant'}`}>{friend.name}</span>
  //                 <span className="font-label-sm text-label-sm text-outline">{friend.country}</span>
  //               </div>
  //               <div className="flex items-center gap-space-sm font-label-tactical text-label-sm">
  //                 <span className={friend.isOnline ? 'text-secondary font-bold' : 'text-outline font-medium'}>{friend.elo} ELO</span>
  //                 <span className="text-outline">•</span>
  //                 <span className={friend.statusColor}>{friend.status}</span>
  //               </div>
  //             </div>
  //           </div>
            
  //           <div className="flex items-center gap-space-xs">
  //             {friend.isOnline ? (
  //               <button onClick={() => handleInvite(friend.name)} className="px-space-md py-space-xs rounded-lg bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container font-headline-md text-body-sm font-semibold transition-all flex items-center gap-space-xs">
  //                 <span className="material-symbols-outlined text-[16px]">swords</span>
  //                 <span>Direct Duel</span>
  //               </button>
  //             ) : (
  //               <button className="px-space-md py-space-xs rounded-lg bg-surface-container-highest text-outline font-headline-md text-body-sm hover:text-on-surface transition-colors flex items-center gap-space-xs">
  //                 <span className="material-symbols-outlined text-[16px]">mail</span>
  //                 <span>Leave Invite</span>
  //               </button>
  //             )}
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
}
