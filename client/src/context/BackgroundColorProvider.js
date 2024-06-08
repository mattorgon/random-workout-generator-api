// BackgroundColorProvider.js
import React, { useEffect } from "react";
import { useDarkMode } from "./DarkModeProvider";
import styled from "@emotion/styled";
import { darkModeStyles, lightModeStyles } from "../styles";

const BackgroundContainer = styled.div`
  height: 100%;
  margin: 0;
  padding: 0;
`;

const BackgroundColorProvider = ({ children }) => {
  const { darkMode } = useDarkMode();

  useEffect(() => {
    document.body.style.backgroundColor = darkMode
      ? darkModeStyles.mainScreen.backgroundColor
      : lightModeStyles.mainScreen.backgroundColor;
  }, [darkMode]);

  return <BackgroundContainer>{children}</BackgroundContainer>;
};

export default BackgroundColorProvider;
