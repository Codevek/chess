import { createContext, useContext } from "react";

const MagicBentoContext = createContext(null);

export const useMagicBento = () => useContext(MagicBentoContext);

export const MagicBentoProvider = ({ children, value }) => {
  return (
    <MagicBentoContext.Provider value={value}>
      {children}
    </MagicBentoContext.Provider>
  );
};