import React from "react";
import ToggleableButtonComponent from "./ToggleButton";
import { ButtonRowStyle } from "../styles/ComponentStyles";

const ButtonRows = ({ darkMode, handleButtonClick, toggledButtons }) => (
  <>
    <ButtonRowStyle darkMode={darkMode}>
      {["Back", "Biceps", "Chest", "Triceps", "Legs"].map((text) => (
        <ToggleableButtonComponent
          key={text}
          buttonText={text}
          onButtonClick={handleButtonClick}
          checked={toggledButtons.includes(text)}
        />
      ))}
    </ButtonRowStyle>
    <ButtonRowStyle darkMode={darkMode}>
      {["Shoulders", "Core", "Cardio", "Push", "Pull"].map((text) => (
        <ToggleableButtonComponent
          key={text}
          buttonText={text}
          onButtonClick={handleButtonClick}
          checked={toggledButtons.includes(text)}
        />
      ))}
    </ButtonRowStyle>
  </>
);

export default ButtonRows;
