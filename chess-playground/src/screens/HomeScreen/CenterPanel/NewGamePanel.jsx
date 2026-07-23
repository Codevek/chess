import Button from "../components/Button";
import Bot from "../components/Bot";
import { useState } from "react";
import BoardScreen from "@/screens/BoardScreen/BoardScreen";
import TimeControl from "../components/TimeControl";

export default function NewGamePanel({ onClick }) {
  return (
    <div className="flex justify-evenly">
      <TimeControl />
      <div className="h-[60vh] w-[30%] flex flex-col justify-evenly">
        <Bot />
        <div className="p-3 flex justify-center">
          <Button onClick={onClick} />
        </div>
      </div>
      {/* <TimeControl /> */}
    </div>
  );
}
