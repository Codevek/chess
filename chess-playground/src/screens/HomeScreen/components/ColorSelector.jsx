import GooeySelector from "@/components/ui/GooeySelector/GooeySelector";
import black from "@/assets/pieces/qB.svg"
import white from "@/assets/pieces/qW.svg"

export default function ColorSelector({gameConfig, setGameConfig}) {
  const chessItems = [
    {
      id: 'black',
      className: 'col-span-1 h-32',
      // Custom colors for Black piece selection
      pillColor: '#FFFFFF', 
      activeTextColor: '#FFFFFF',
      particleColors: ['#333333', '#555555'],
      content: (
        <>
          <img src={black} alt="black" />
        </>
      )
    },
    {
      id: 'white',
      className: 'col-span-1 h-32',
      // Custom colors for White piece selection
      pillColor: '#FFFFFF',
      activeTextColor: '#000000',
      particleColors: ['#FFFFFF', '#f0116a'],
      content: (
        <>
          <img src={white} alt="white" />
        </>
      )
    },
    {
      id: 'random',
      className: 'col-span-2 h-24',
      pillColor: '#ffffff', // Blue pill
      activeTextColor: '#000000',
      particleColors: ['#3B82F6', '#60A5FA'], // Multiple shades of blue particles
      content: (
          <span className="text-2xl font-semibold tracking-wide">Random</span>
      )
    }
  ];

  return (
    <div className="max-w-[320px] mx-auto p-4">
      <GooeySelector 
        items={chessItems} 
        initialActiveIndex={3} 
        onSelect={(item) => {
          console.log('Selected:', item.id)
          setGameConfig(prev=>({
            ...prev,
            color: item.id
          }))
          console.log(gameConfig);
          
        }}
      />
    </div>
  );
}
