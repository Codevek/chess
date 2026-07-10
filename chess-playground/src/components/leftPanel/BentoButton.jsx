import { ParticleCard } from "../ui/MagicBento";

export default function BentoButton({
  title,
  description,
  className,
  children,
  clickEffect,
  enableTilt,
  enableMagnetism,
  particleCount,
  glowColor,
  onClick
}) {
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
        ${className} 
      `}
      clickEffect={clickEffect}
      enableTilt={enableTilt}
      enableMagnetism={enableMagnetism}
      particleCount={particleCount}
      glowColor={glowColor}
      onClick={onClick}
    >
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </ParticleCard>
  );
}
