import React from "react";
import Intro from "../components/intro";
import BodySeg from "../components/BodySegment";
import { useDarkMode } from "../context/DarkModeProvider";
import { ScreenStyle } from "../styles/ComponentStyles";

const MainScreen = () => {
  const { darkMode } = useDarkMode();

  return (
    <>
      <ScreenStyle darkMode={darkMode}>
        <Intro darkMode={darkMode} />
        <BodySeg darkMode={darkMode} />
      </ScreenStyle>
    </>
  );
};

export default MainScreen;
