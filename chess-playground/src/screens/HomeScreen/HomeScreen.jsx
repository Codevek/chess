import { useState } from "react";
import TopMenu from "./TopMenu";
import { MENU_MODE } from "@/lib/menuModes";
import ProfileCard from "./RightPanel/ProfileCard";
import PuzzleList from "./RightPanel/PuzzleList";
import CenterPanel from "./CenterPanel/CenterPanel";
import avatar3 from "../../assets/avtars/avatar1.jpg";
import Button from "./components/Button";
import BoardScreen from "../BoardScreen/BoardScreen";
import socket from "@/lib/socket";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { useEffect } from "react";

export default function HomeScreen({
  mode,
  setMode,
  gameConfig,
  setGameConfig,
  onStart,
  onLogout,
}) {
  function disconnectSocket() {
    if (socket.disconnected) return Promise.resolve();
    socket.disconnect();
  }

  async function handleLogout(onLogout) {
    try {
      let res = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      console.log("hey");

      await disconnectSocket();
      onLogout();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    socket.on("gameInvite", ({ sender }) => {
      // setInvite({
      //   sender,
      //   visible: true,
      // });
      console.log(sender);
      
    });

    return () => {
      socket.off("gameInvite");
    };
  }, []);

  return (
    <>
      {/* <ConfirmationDialog active={true}/> */}
      <main className="min-h-screen bg-[#1b1b20] flex justify-evenly">
        <div className="flex flex-col justify-evenly items-center">
          <div className="w-[70vw] h-[30vh] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl p-6">
            <TopMenu
              mode={mode}
              setMode={setMode}
              gameConfig={gameConfig}
              setGameConfig={setGameConfig}
            />
          </div>
          <div className="w-[70vw] h-[60vh]">
            <CenterPanel
              mode={mode}
              onStart={onStart}
              gameConfig={gameConfig}
              setGameConfig={setGameConfig}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-evenly">
          <div className="flex items-center justify-evenly gap-5">
            <Button
              name={"Logout"}
              baseColor="red"
              textColor="red"
              size="md"
              onClick={() => handleLogout(onLogout)}
            />
            <ProfileCard
              name={"Vivek Sharma"}
              country={"IND"}
              rating={"5000"}
              avatar={avatar3}
            />
          </div>
          <div className="w-[25vw] h-[80vh] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl"></div>
        </div>
      </main>
    </>
  );
}
