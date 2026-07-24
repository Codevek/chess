import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { max } from "three/src/nodes/math/MathNode.js";


export default function ColorSlider({value, setvalue, label, min, max}) {
  return (
    <div className="text-amber-50">
      <Slider
        aria-label={label}
        // defaultValue={30}
        value={value}
        onChange={(e, newValue) => setvalue(newValue)}
        // getAriaValueText={valuetext}
        color="secondary"
        valueLabelDisplay="auto"
        min={min}
        max={max}
      />
      {value}
    </div>
  );
}
