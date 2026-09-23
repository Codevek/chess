export default function InvitePopup({ sender , setInvite}) {

  setTimeout(()=> {setInvite(null)}, 5000)

  return (
    <div className="fixed inset-0 bg-black/50 flex flex-col border border-zinc-800 h-fit w-fit text-amber-50 justify-center items-center rounded-md top-[78%] left-[80%]">
      <h2 className="p-3">{sender} challenged you.</h2>
      <div className="p-3 pt-0 flex gap-3">
        <button className="accept">Accept</button>

        <button className="decline" onClick={()=> setInvite(null)}>Decline</button>
      </div>
    </div>
  );
}
