import React, { useState } from "react";
import { useDarkMode } from "../context/DarkModeProvider";
import { SliderContainer, Slider, ScaleValue } from "../styles/ComponentStyles";

const SlidingScale = ({ value: propValue, onChange, max }) => {
  const { darkMode } = useDarkMode();

  const [sliderValue, setSliderValue] = useState(propValue);
  const handleSliderChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setSliderValue(newValue);
    onChange(newValue);
  };

  return (
    <SliderContainer>
      {/* <HashMarks>
                {[...Array(10)].map((_, index) => (
                    <HashMark key={index} />
                ))}
            </HashMarks> */}
      <Slider
        type="range"
        min="1"
        max={max}
        value={sliderValue}
        onChange={handleSliderChange}
        darkMode={darkMode}
      />
      <ScaleValue>{sliderValue}</ScaleValue>
    </SliderContainer>
  );
};

export default SlidingScale;
