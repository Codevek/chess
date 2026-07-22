import { ParticleCard } from "./ParticleCard";
import { useMagicBento } from "./MagicBentoContext";

export default function BentoButton({
  title,
  description,
  className = "",
  titleClassName = "",
  descClassName = "",
  glowColor,
  active = false,
  onClick,
  children,
}) {
  const context = useMagicBento() || {};
  const {
    clickEffect = true,
    enableTilt = true,
    enableMagnetism = true,
    particleCount = 12,
    glowColor: contextGlowColor = "132, 0, 255",
  } = context;

  const finalGlowColor = glowColor 
    ? glowColor 
    : active 
      ? "124, 58, 237" 
      : contextGlowColor;

  return (
    <ParticleCard
      className={`
        card card--border-glow rounded-3xl p-5 border select-none
        transition-colors duration-300
        ${active 
          ? "border-purple-500 bg-[#1A1325] text-white" 
          : "border-[#2F293A] bg-[#120F17] text-amber-100 hover:bg-[#1A1325]"}
        ${className} 
      `}
      clickEffect={clickEffect}
      enableTilt={enableTilt}
      enableMagnetism={enableMagnetism}
      particleCount={particleCount}
      glowColor={finalGlowColor}
      onClick={onClick}
      active={active}
    >
      {title && (
        <h2 
          className={`transition-all duration-300 mb-2 
            ${active ? "text-purple-300" : "text-[#f5e6b8]"} 
            ${titleClassName || `text-xl`} 
          `}
        >
          {title}
        </h2>
      )}
      
      {description && (
        <p className={`opacity-80 ${descClassName || "text-sm"}`}>
          {description}
        </p>
      )}
      
      {children && (
        <div className="mt-4 grow flex flex-col justify-end">
          {children}
        </div>
      )}
    </ParticleCard>
  );
}