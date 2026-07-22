import { useRef } from "react";
import { GlobalSpotlight } from "./GlobalSpotlight";
import { MagicBentoProvider } from "./MagicBentoContext";
import "./Bento.css";

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "132, 0, 255";

export default function MagicBento({
  children,
  enableSpotlight = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
  className = "",
}) {
  const gridRef = useRef(null);

  return (
    <MagicBentoProvider
      value={{
        clickEffect,
        enableTilt,
        enableMagnetism,
        particleCount,
        glowColor,
      }}
    >
      <section ref={gridRef} className={`bento-section w-full h-full relative ${className}`}>
        {enableSpotlight && (
          <GlobalSpotlight 
            gridRef={gridRef} 
            glowColor={glowColor} 
            spotlightRadius={spotlightRadius} 
            disableAnimations={disableAnimations} 
          />
        )}
        {children}
      </section>
    </MagicBentoProvider>
  );
}