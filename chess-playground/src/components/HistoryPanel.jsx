export default function HistoryPanel(){

    const rows = []
    for(let i=0; i<history.length; i+=2){
        rows.push({
            white: history[i],
            black: history[i+1]
        })
    }

    // rows.map((move, index)=>(
        
    // ))

    return(
        <div className="w-60 h-160 border border-zinc-700 bg-zinc-900/40 backdrop-blur-2xl">
            {rows[0].white} and {rows[0].black}
        </div>
    )
}