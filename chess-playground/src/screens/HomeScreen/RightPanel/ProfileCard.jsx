import { useEffect, useState } from "react";

export default function ProfileCard({ avatar, name, rating, country }) {
  const [me, setMe] = useState([])

  useEffect(()=> {
    async function getMe() {
      try {
        let res = await fetch("http://localhost:5000/auth/me", {
          method: "GET",
          credentials: "include"
        })
        const json = await res.json()
        console.log(json.data);
        setMe(json.data)
        
        
      } catch (error) {
        console.log(error);
      }
    }
    getMe()
  }, [])

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col">
        <h2 className="text-white text-lg font-medium leading-none">
            {me.fullName}
        </h2>
        {(me.rating || me.country) && <p className="text-zinc-700 text-sm mt-1">
            {me.rating} . {me.country.toUpperCase()}
        </p>}
      </div>
      <img 
        src={avatar} 
        alt={me.name}
        className="w-14 h-14 rounded-full object-cover border border-zinc-600" 
      />
    </div>
  );
}