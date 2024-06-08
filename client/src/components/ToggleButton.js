import React from "react";
import { useDarkMode } from "../context/DarkModeProvider";
import { ToggleableButton } from "../styles/ComponentStyles";

const ToggleableButtonComponent = ({ buttonText, onButtonClick, checked }) => {
  const { darkMode } = useDarkMode();

  return (
    <ToggleableButton
      checked={checked}
      onClick={() => onButtonClick(buttonText)}
      darkMode={darkMode}
    >
      {buttonText}
    </ToggleableButton>
  );
};

export default ToggleableButtonComponent;
