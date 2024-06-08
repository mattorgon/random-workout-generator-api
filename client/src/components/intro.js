import React from "react";
import { useDarkMode } from "../context/DarkModeProvider";
import { IntroStyle } from "../styles/ComponentStyles";

const Intro = () => {
  let introText =
    "Welcome to the randomized workout generator where you only need to choose which body segment you want to target and how many exercises you have time for today.";

  const { darkMode } = useDarkMode();

  return (
    <>
      <IntroStyle darkMode={darkMode}>{introText}</IntroStyle>
    </>
  );
};

export default Intro;
