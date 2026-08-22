export default function QuitPopup({result}){
    return(
        <div className="absolute inset-0 bg-black/60 flex justify-center items-center">
            <div className="bg-zinc-800 p-8 rounded-xl">
               Do You Really want to QUIT ??
                <button onClick={result}>Yes</button>
                <button>No</button>
            </div>

        </div>
    )
}