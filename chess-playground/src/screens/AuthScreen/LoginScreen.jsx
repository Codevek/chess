import { useState } from "react";
import socket from "../../lib/socket.js";
import AuthCard from "./AuthCard.jsx";

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  function connectSocket() {
    if (socket.connected) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const onConnect = () => {
        cleanup();
        resolve();
      };
      const onConnectError = (connectionError) => {
        cleanup();
        reject(connectionError);
      };
      const cleanup = () => {
        socket.off("connect", onConnect);
        socket.off("connect_error", onConnectError);
      };

      socket.once("connect", onConnect);
      socket.once("connect_error", onConnectError);
      socket.connect();
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);

    try {
      let res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });
      let body = await res.json();

      if (!res.ok) {
        res = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        body = await res.json();
        if (!res.ok) {
          setError(body.message || "Login failed");
        } 
      }

      await connectSocket();
      onLogin();
    } catch (requestError) {
      setError(requestError.message || "Unable to log in. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#1b1b20] flex overflow-hidden justify-center items-center gap-14">
      <div className="h-[80vh] w-[80vw] border border-zinc-700 rounded-2xl shadow-xl shadow-zinc-800 flex items-center flex-col justify-center">
        <form
          className="form flex flex-col items-center p-6 gap-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="email" className="text-zinc-500">
              Email/Username:
            </label>
            <br />
            <input
              id="email"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label htmlFor="pass" className="text-zinc-500">
              Password:
            </label>
            <br />
            <input
              id="pass"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>
          {error && <p className="text-red-400">{error}</p>}
          <button type="submit" className="counter" disabled={isLoggingIn}>
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <AuthCard/>
    </main>
  );
}
