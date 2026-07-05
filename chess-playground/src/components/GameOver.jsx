// import { Chess } from "chess-engine"

export default function GameOver({result, game}){
    return(
        <div className="absolute inset-0 bg-black/60 flex justify-center items-center">
            <div className="bg-zinc-800 p-8 rounded-xl">
                <h1 className="text-4xl text-white">
                    {result.type} by {result.winner}
                </h1>
                <button onClick={game}>Restart</button>
            </div>
        </div>
    )
}