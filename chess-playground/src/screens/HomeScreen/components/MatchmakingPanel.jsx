import React, { useState, useEffect } from 'react';
import ProfileCoverflow from '@/components/aicanvas/tilted-coverflow';

const EMPTY_PROFILE = {
  id: 'empty',
  isEmpty: true,
  fullName: 'Invite a friend to play',
};

// Example Friend Data
const FRIENDS_LIST = [
  EMPTY_PROFILE,
  { id: 1, fullName: 'Tactics Wizard', username: 'IM', rating: 2450, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=750&fit=crop&auto=format' },
  // { id: 2, fullName: 'Magnus Carlsen', username: 'GM', rating: 2882, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=750&fit=crop&auto=format' },
  // { id: 3, fullName: 'Judit Polgar', username: 'GM', rating: 2735, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=750&fit=crop&auto=format' },
  // ... pad with a few more profiles so the carousel loops smoothly during spins
];

export default function MatchmakingPanel({friends}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [targetIndex, setTargetIndex] = useState(0); // Starts on EMPTY_PROFILE

  console.log(friends);
  console.log("friends");
  

  friends.map((friend, index)=> {
    FRIENDS_LIST.push(friend)
    console.log(friend)
  })

  const sendFriendInvite = (friendIndex) => {
    // 1. Start spinning in the UI immediately
    setIsSpinning(true);
    
    // 2. Simulate 5 second network wait/invite duration
    setTimeout(() => {
      const friendAccepted = Math.random() > 0.5; // Simulate yes/no for demo

      if (friendAccepted) {
        // Friend accepted: Stop spinning and land on their profile
        setIsSpinning(false);
        setTargetIndex(friendIndex);
        console.log(`Matched with ${FRIENDS_LIST[friendIndex].name}!`);
      } else {
        // Timeout/Rejected: Stop spinning and land back on the empty card
        setIsSpinning(false);
        setTargetIndex(0); // Index 0 is EMPTY_PROFILE
        console.log('Invite timed out.');
      }
    }, 5000); 
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-6 bg-transparent">
      
      {/* The Visual Coverflow */}
      <ProfileCoverflow
        profiles={FRIENDS_LIST}
        isSpinning={isSpinning}
        targetIndex={targetIndex}
        onManualSelect={(index) => setTargetIndex(index)}
      />

      {/* Temporary trigger buttons for testing the flow */}
      <div className="mt-8 flex gap-4">
        <button 
          onClick={() => sendFriendInvite(1)} 
          disabled={isSpinning}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          Invite Tactics Wizard
        </button>
        <button 
          onClick={() => sendFriendInvite(2)} 
          disabled={isSpinning}
          className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          Invite Magnus
        </button>
      </div>

    </div>
  );
}