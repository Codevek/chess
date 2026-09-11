export default function FriendPanel(){

  async function getFriends() {
    try {
      let res = await fetch("http://localhost:5000/friends/",{
        method: "GET",
        credentials: "include"
      })
      const json = await res.json()
      console.log(json.data.friends);
      const friendsIds = json.data.friends

      // friendsIds.map((friendId)=> {
      //   const
      // })



      return friends
    } catch (error) {
      
    } 
    
  }
  getFriends()

  return(
    <div className="h-[59vh] border-amber-300">
      <div className="h-full w-[30%] rounded-sm border border-white/10 shadow-xl p-2">
        <div className="flex justify-center text-amber-100 text-xl">
        Friends
        </div>

      </div>
    </div>
  )
}