import React, { useState } from "react";
import { SubmitButtonStyle } from "../styles/ComponentStyles";

const SubmitButton = ({ buttonText, onButtonClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    onButtonClick();
    setTimeout(() => setIsLoading(false), 2000); // Simulate loading time
  };

  return (
    <SubmitButtonStyle
      onClick={handleClick}
      className={isLoading ? "loading" : ""}
    >
      {buttonText}
    </SubmitButtonStyle>
  );
};

export default SubmitButton;
