import React, { useState, useEffect } from "react";
import ProfileCoverflow from "@/components/aicanvas/tilted-coverflow";

const EMPTY_PROFILE = {
  id: "empty",
  isEmpty: true,
  fullName: "Invite a friend to play",
};

export default function MatchmakingPanel({
  friends,
  acceptedFriend,
  isSpinning,
  setIsSpinning,
}) {
  const [targetIndex, setTargetIndex] = useState(0); // Starts on EMPTY_PROFILE
  const [profiles, setProfiles] = useState([EMPTY_PROFILE]);

  // console.log(friends);
  // console.log("friends");

  useEffect(() => {
    setProfiles([EMPTY_PROFILE, ...friends]);
  }, [friends]);

  useEffect(() => {
    if (!acceptedFriend || profiles.length === 0) return;

    const index = profiles.findIndex(
      (profile) => profile.id === acceptedFriend.id,
    );

    if (index !== -1) {
      setTargetIndex(index);
    }
  }, [acceptedFriend, profiles]);

  // useEffect(() => {
  //   if (isSpinning) {
  //     // Spin every 120ms
  //     const spin = () => setTargetIndex((prev) => (prev + 1) % profiles.length);
  //     const intervalId = setInterval(spin, 120);

  //     // Auto-stop after 10 seconds
  //     const timeoutId = setTimeout(() => {
  //       setIsSpinning(false); // stop spinning
  //       setTargetIndex(0); // reset to EMPTY_PROFILE if you want
  //       console.log("Invite timed out after 5s");
  //     }, 5000);

  //     // Cleanup both timers
  //     return () => {
  //       clearInterval(intervalId);
  //       clearTimeout(timeoutId);
  //     };
  //   }
  // }, [isSpinning, profiles.length, setIsSpinning]);

  // console.log(profiles);

  useEffect(() => {
    if (isSpinning) {
      const spin = () => {
        setTargetIndex((prev) => (prev + 1) % profiles.length);
      };

      const intervalId = setInterval(spin, 120);

      const timeoutId = setTimeout(() => {
        setIsSpinning(false);
        setTargetIndex(0);
      }, 5000);

      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [isSpinning, profiles.length, setIsSpinning]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-6 bg-transparent">
      {/* The Visual Coverflow */}
      <ProfileCoverflow
        profiles={profiles}
        isSpinning={isSpinning}
        targetIndex={targetIndex}
        onManualSelect={(index) => setTargetIndex(index)}
      />

      {/* Temporary trigger buttons for testing the flow */}
      <div className="mt-8 flex gap-4"></div>
    </div>
  );
}
