const files = ["a","b","c","d","e","f","g","h"];
const ranks = ["8","7","6","5","4","3","2","1"];

export default function BoardCoordinates({ flipped }) {

    const displayFiles = flipped
        ? [...files].reverse()
        : files;

    const displayRanks = flipped
        ? [...ranks].reverse()
        : ranks;

    return (
        <>
            <div className="absolute -left-8.5 top-0 h-full flex flex-col justify-between py-8">
                {displayRanks.map(rank=>(
                    <span key={rank} className="text-[#7c7468] text-[15px] font-medium">
                        {rank}
                    </span>
                ))}
            </div>

            <div className="absolute -bottom-8.5 left-0 w-full flex justify-between px-8">
                {displayFiles.map(file=>(
                    <span key={file} className="text-[#7c7468] text-[15px] font-medium">
                        {file}
                    </span>
                ))}
            </div>
        </>
    );
}