import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";


export default function ColorSlider({value, setvalue, label}) {
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
      />
      {value}
    </div>
  );
}
