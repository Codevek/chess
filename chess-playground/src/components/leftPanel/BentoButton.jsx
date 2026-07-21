import { ParticleCard } from "../ui/MagicBento";

export default function BentoButton({
  title,
  description,
  className,
  children,
  clickEffect = true,
  enableTilt,
  enableMagnetism,
  particleCount,
  active,
  onClick
}) {
  const enableParticles = true;

  return (
    <ParticleCard
      className={`
        card
        card--border-glow
        rounded-3xl
        text-amber-100
        p-5
        border
        border-[#2F293A]
        bg-[#120F17]
        select-none
        ${active ? "border-3 border-purple-500 bg-[#1A1325]" : "border-[#2F293A]"}
        ${className} 
      `}
      clickEffect={clickEffect}
      enableTilt={enableTilt}
      enableMagnetism={enableMagnetism}
      particleCount={enableParticles ? particleCount : 0}
      glowColor={active ? "124,58,237" : "132,0,255"}
      onClick={onClick}
      active={active}
    >
      <h2
        className={`
          text-3xl
          font-semibold
          transition-all
          duration-300
          ${active ? "text-purple-300" : "text-[#f5e6b8]"}
          `}
      >
        {title}
      </h2>
      <p>{description}</p>
      {children}
    </ParticleCard>
  );
}
