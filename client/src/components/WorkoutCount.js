import React from "react";
import SlidingScale from "./SlidingScale";
import { useDarkMode } from "../context/DarkModeProvider";
import {
  TitleStyle,
  SubtitleStyle,
  Underline,
  TitleWrapper,
} from "../styles/ComponentStyles";

let subtitleText = "How many are we hitting today?";

const WorkoutCount = ({ onSliderChange, maxSliderValue }) => {
  const { darkMode } = useDarkMode();

  let titleText = "Number of Exercises";

  return (
    <>
      <TitleWrapper>
        <TitleStyle darkMode={darkMode}>{titleText}</TitleStyle>
        <Underline />
      </TitleWrapper>
      <SubtitleStyle darkMode={darkMode}>{subtitleText}</SubtitleStyle>
      <SlidingScale
        onChange={onSliderChange}
        value={Math.floor(maxSliderValue / 2)}
        max={maxSliderValue}
      />
    </>
  );
};

export default WorkoutCount;
