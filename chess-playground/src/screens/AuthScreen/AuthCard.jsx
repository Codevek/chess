import { useState } from "react";

export default function AuthCard({
  handleSubmit,
  handleRegister,
  error,
  isLoggingIn,
  isRegistering,
}) {
  const [mode, setMode] = useState("signin"); // 'signin' or 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [regPassword, setRegPassword] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("India");

  const handleSignIn = (e) => {
    e.preventDefault();
    // alert('Logging in with CHESSMAN Security Protocol...');
    handleSubmit({
      username,
      password,
    });
  };

  // const handleRegister = (e) => {
  //   e.preventDefault();
  //   alert("Grandmaster Account Initialized!");
  // };

  // Password strength logic
  const getStrength = (val) => {
    if (val.length >= 10)
      return {
        text: "Elite Master (4/4)",
        textColor: "text-emerald-400",
        barColor: "bg-emerald-500",
      };
    if (val.length >= 6)
      return {
        text: "Competitive (3/4)",
        textColor: "text-purple-400",
        barColor: "bg-slate-700",
      };
    return {
      text: "Weak Key (1/4)",
      textColor: "text-rose-400",
      barColor: "bg-slate-700",
    };
  };

  //   const handleRegister = (e) => {
  //   e.preventDefault();

  //   if (regPassword !== confirmPassword) {
  //     alert("Passwords do not match!");
  //     return;
  //   }

  //   if (regPassword.length < 8) {
  //     alert("Password must contain at least 8 characters.");
  //     return;
  //   }

  //   if (fullName.trim().length < 4) {
  //     alert("Full name must contain at least 4 characters.");
  //     return;
  //   }

  //   if (chessHandle.trim().length < 3) {
  //     alert("Chess handle must contain at least 3 characters.");
  //     return;
  //   }

  //   handleRegisterRequest({
  //     fullName: fullName.trim(),
  //     username: chessHandle.trim(),
  //     email: email.trim(),
  //     password: regPassword,
  //     country,
  //   });
  // };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    handleRegister({
      fullName,
      username: registerUsername,
      email,
      password: regPassword,
      country,
    });
  };

  const strength = getStrength(regPassword);

  return (
    <div className="w-full flex justify-center items-center">
      <section className="w-full max-w-xl">
        <div className="bg-apex-card border border-apex-border rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-purple-500 to-transparent"></div>

          <div className="flex items-center justify-between pb-6 border-b border-apex-border">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-apex-elevated border border-purple-500/40 p-1.5 shadow-glow-purple flex items-center justify-center">
                <img
                  alt="Icon"
                  className="w-full h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLtQmkhzY9Wzqga_Ys12wJEK9vbiuSXWXE7t6yBjHLdQZFKLd5G0P7w46PfjZo8sbVBF5QJbalIBmUsLyNL_tOtgXULjoKW8Fk56Xgmg1OVloaYsgAujEpWbtLDtTHFNusubiqxUC0FWdV0yV9ykE-wB2yzqdXD2NAKNybtFAxy5WTCNoNv2EK5uatzZR_biPfohpXuP3b0_vXBgLCZ3NV5q0u2KmSoiOCEoUyY-jm0h8Pviu0mBtR"
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  CHESSMAN Arena
                </h1>
                <p className="text-xs text-slate-400">
                  Select your path to enter the grandmaster matchmaking.
                </p>
              </div>
            </div>
          </div>

          <div className="my-6 p-1 bg-apex-elevated rounded-xl border border-apex-border flex gap-1 relative">
            <button
              onClick={() => setMode("signin")}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${mode === "signin" ? "bg-purple-600 text-white shadow-glow-purple" : "text-slate-400 hover:text-white"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${mode === "register" ? "bg-purple-600 text-white shadow-glow-purple" : "text-slate-400 hover:text-white"}`}
            >
              Create Account
            </button>
          </div>

          {mode === "signin" ? (
            <form className="space-y-4" onSubmit={handleSignIn}>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address or Chess Handle
                </label>
                <div className="relative">
                  <input
                    className="w-full pl-4 pr-4 py-2.5 bg-apex-elevated border border-apex-border rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-sans"
                    placeholder="name@domain.com or @username"
                    required
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Password
                  </label>
                  <a
                    className="text-xs text-purple-400 hover:text-purple-300 hover:underline"
                    href="#"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    className="w-full pl-4 pr-10 py-2.5 bg-apex-elevated border border-apex-border rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-sans"
                    placeholder="Enter your secure password"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white focus:outline-none"
                  >
                    {/* Eye Logo */}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    defaultChecked
                    className="w-4 h-4 rounded bg-apex-elevated border-apex-border text-purple-600 focus:ring-purple-500 focus:ring-offset-apex-bg"
                    type="checkbox"
                  />
                  <span className="text-xs text-slate-300">
                    Keep session active for 30 days
                  </span>
                </label>
                {/* <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>{" "}
                  2FA Supported
                </span> */}
              </div>

              {error && (
                <p className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                className="w-full mt-3 py-3 px-4 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wider uppercase shadow-glow-purple transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                type="submit"
              >
                <span>Enter Arena & Play</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleRegisterSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Full Name <span className="text-purple-400">*</span>
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-apex-elevated border border-apex-border rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-sans"
                    placeholder="e.g. Vivek Sharma"
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Chess Handle <span className="text-purple-400">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-emerald-400">
                      ✓ Available
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 text-sm font-mono">
                      @
                    </span>
                    <input
                      className="w-full pl-8 pr-3.5 py-2.5 bg-apex-elevated border border-apex-border rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono"
                      placeholder="grandmaster_vivek"
                      required
                      type="text"
                      value={registerUsername}
                      onChange={(e) => setRegisterUsername(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Email Address <span className="text-purple-400">*</span>
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-apex-elevated border border-apex-border rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-sans"
                    placeholder="vivek@chess.com"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Country{" "}
                    <span className="text-purple-400">*</span>
                  </label>
                  <select
                    className="w-full px-3.5 py-2.5 bg-apex-elevated border border-apex-border rounded-lg text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all cursor-pointer font-sans"
                    defaultValue="India"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="India">🇮🇳 India</option>
                    <option value="Norway">🇳🇴 Norway</option>
                    <option value="United States">🇺🇸 United States</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Set Password <span className="text-purple-400">*</span>
                  </label>
                  <input
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-apex-elevated border border-apex-border rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-sans"
                    placeholder="Min 8 alphanumeric"
                    required
                    type="password"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Confirm Password <span className="text-purple-400">*</span>
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-apex-elevated border border-apex-border rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-sans"
                    placeholder="Re-enter key"
                    required
                    type="password"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-400">ENTROPY STRENGTH</span>
                  <span className={`${strength.textColor} font-bold`}>
                    {strength.text}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-apex-elevated rounded-full overflow-hidden flex gap-1">
                  <div className="h-full w-1/4 bg-purple-500 rounded-full"></div>
                  <div className="h-full w-1/4 bg-purple-500 rounded-full"></div>
                  <div className="h-full w-1/4 bg-purple-500 rounded-full"></div>
                  <div
                    className={`h-full w-1/4 rounded-full ${strength.barColor}`}
                  ></div>
                </div>
              </div>

              {error && (
                <p className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                className="w-full mt-3 py-3 px-4 rounded-xl bg-linear-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-500 text-white font-bold text-sm tracking-wider uppercase shadow-glow-purple transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                disabled={isLoggingIn}
                type="submit"
              >
                <span>
                  {isLoggingIn ? "Authenticating..." : "Enter Arena & Play"}
                </span>

                <span>Create Grandmaster Account</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-xs text-slate-400 border-t border-apex-border/80 pt-4">
            <span>
              {mode === "signin"
                ? "Don't have a verified chess handle?"
                : "Already have a verified grandmaster handle?"}
            </span>
            <button
              onClick={() => setMode(mode === "signin" ? "register" : "signin")}
              className="text-purple-400 hover:text-purple-300 font-bold ml-1 hover:underline focus:outline-none"
              type="button"
            >
              {mode === "signin" ? "Create Account" : "Sign In Instead"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
