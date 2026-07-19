import { useState } from "react";
import TopMenu from "./TopMenu";
import { MENU_MODE } from "@/lib/menuModes";

export default function HomeScreen() {

  const [mode, setMode] = useState(MENU_MODE.HOME)


  return (
    <main className="min-h-screen bg-[#1b1b20] flex justify-center items-center p-8">
      <div className="w-[95vw] h-[90vh] rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md flex gap-6 p-6">
        <div className="flex-1 flex flex-col gap-6">
          <TopMenu 
            mode = {mode}
            setMode = {setMode}
          />
          {/* <CenterPanel /> */}
        </div>

        {/* <RightPanel /> */}
      </div>
    </main>
  );
}

// import { useState } from "react";
// import App from "../BoardScreen/BoardScreen";
// import LiquidEther from "@/components/ui/LiquidEther";
// import BoardScreen from "../BoardScreen/BoardScreen";
// // import App from "../../App";

// export default function HomeScreen() {
//   const [startGame, setStartGame] = useState(false);

//   if (startGame) return <BoardScreen />;

//   return (
//     <>
//       <div className="h-screen w-screen bg-black flex items-center">
//         {/* <div className="h-[90vh] w-screen isolate aspect-video rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5"> */}
//         <LiquidEther
//           colors={["#5227FF", "#FF9FFC", "#B497CF"]}
//           mouseForce={10}
//           cursorSize={130}
//           isViscous
//           viscous={44}
//           iterationsViscous={32}
//           iterationsPoisson={32}
//           resolution={0.4}
//           isBounce={false}
//           autoDemo
//           autoSpeed={0.5}
//           autoIntensity={3.2}
//           takeoverDuration={0.25}
//           autoResumeDelay={3000}
//           autoRampDuration={0.6}
//           color0="#5227FF"
//           color1="#FF9FFC"
//           color2="#B497CF"
//         />
//         {/* </div> */}
//       </div>

//       <button
//         className="bg-purple-900 p-2 rounded-xl text-white"
//         onClick={() => setStartGame(true)}
//       >
//         New Game
//       </button>
//     </>
//   );
// }
