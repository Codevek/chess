import SpecularButton from "@/components/ui/SpecularButton/SpecularButton";

export default function Button({
  onClick,
  name,
  size="lg",
  textColor="#f5f5f5",
  tint="#ffffff",
  baseColor="#525252",
  lineColor="#ffffff",
}) {
  return (
    <SpecularButton
      size={size}
      radius={18}
      tint={tint}
      tintOpacity={0}
      blur={0}
      textColor={textColor}
      lineColor={lineColor}
      baseColor={baseColor}
      intensity={1}
      shineSize={10}
      shineFade={40}
      thickness={1}
      speed={0.35}
      followMouse
      proximity={250}
      autoAnimate
      onClick={onClick}
    >
      {name}
    </SpecularButton>
  );
}
