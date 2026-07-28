import Slider from "@mui/material/Slider";

export default function ColorSlider({
  value,
  setvalue,
  label,
  min,
  max,
}) {

  return (
    <div className="text-amber-50 px-4">
      <span className="mb-2 block text-sm font-semibold text-neutral-300">
        {label}: {value}
      </span>
      <Slider
        aria-label={label}
        // defaultValue={30}
        value={value || 0}
        onChange={(e, newValue) => setvalue(newValue)}
        // getAriaValueText={valuetext}
        color="secondary"
        valueLabelDisplay="auto"
        min={min}
        max={max}
      />
    </div>
  );
}
