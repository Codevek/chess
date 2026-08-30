export default function LoginScreen() {
  return (
    <main
      className="
      min-h-screen
      bg-[#1b1b20]
      flex
      overflow-hidden
      justify-center
      items-center
      gap-14"
    >
      <div className="h-[80vh] w-[80vw] border border-zinc-700 rounded-2xl shadow-xl shadow-zinc-800 flex items-center flex-col justify-center">
        <form className="form flex flex-col items-center p-6 gap-5" action="http://localhost:5000/auth/login" method="POST">
          <div>
            <label for="email" className="text-zinc-500">Email/Username:</label><br/>
            <input
              id="email"
              type="text"
              name="username"
              placeholder="SendText"
              onChange={(e) => setMessage(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label for="pass" className="text-zinc-500">Password:</label><br/>
            <input
              id="pass" 
              type="text"
              name="password"
              placeholder="SendText"
              onChange={(e) => setMessage(e.target.value)}
              className="input"
            />
          </div>
          <button type="submit" className="counter">
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
