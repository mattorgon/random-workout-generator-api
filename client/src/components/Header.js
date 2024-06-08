import React, { useState } from "react";
import styled from "@emotion/styled";
import { useDarkMode } from "../context/DarkModeProvider";
import { darkModeStyles, lightModeStyles } from "../styles";
import SignUpButton from "./SignUpButton";
import LoginButton from "./LoginButton";
import { useAuth } from "../context/AuthContext";
import SlidingPane from "react-sliding-pane";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/parent-slide-pane.css";
import "../styles/sliding-pane.css";
import {
  PaneButton,
  HeaderStyle,
  HeaderUnderline,
  HeaderTitleWrapper,
  HeaderTitleStyle,
  Welcome,
  LoginButtonComps,
} from "../styles/ComponentStyles";

const Header = () => {
  let title = "I Pick, U Lift";
  let space = "\u00A0";

  const { isSignedIn, username, signOut } = useAuth();

  const { darkMode, toggleDarkMode } = useDarkMode();

  const [isPaneOpen, setIsPaneOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPathname = location.pathname;

  const handleNavigateToSavedWorkouts = () => {
    navigate("/savedWorkouts");
    closeUserMenu();
  };

  const handleNavigateToMainScreen = () => {
    navigate("/");
    closeUserMenu();
  };

  const openUserMenu = () => {
    setIsPaneOpen(true);
  };

  const closeUserMenu = () => {
    setIsPaneOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    setIsPaneOpen(false); // Close the modal if onClose is a function
  };

  // useEffect(() => {
  //   console.log("username: ", username);
  // }, [isSignedIn]);

  return (
    <HeaderStyle darkMode={darkMode}>
      <HeaderTitleWrapper>
        <HeaderTitleStyle darkMode={darkMode}>{title}</HeaderTitleStyle>

        <HeaderUnderline />
      </HeaderTitleWrapper>

      {isSignedIn ? (
        <Welcome>
          Welcome,{space}
          <span
            onClick={openUserMenu}
            style={{ cursor: "pointer", textDecorationLine: "underline" }}
          >
            {username}
          </span>
          <StyledSlidingPane
            className="my-custom-slide-pane custom-width-panes slide-pane_from_right"
            isOpen={isPaneOpen}
            title={username}
            onRequestClose={() => setIsPaneOpen(false)}
            darkMode={darkMode}
          >
            <PaneButton darkMode={darkMode} onClick={toggleDarkMode}>
              Toggle Dark Mode
            </PaneButton>
            {currentPathname === "/" && (
              <PaneButton onClick={handleNavigateToSavedWorkouts}>
                My Workouts
              </PaneButton>
            )}

            {currentPathname === "/savedWorkouts" && (
              <PaneButton onClick={handleNavigateToMainScreen}>
                Generate Workouts
              </PaneButton>
            )}

            <PaneButton onClick={handleSignOut}>Sign Out</PaneButton>
            <br />
          </StyledSlidingPane>
        </Welcome>
      ) : (
        <LoginButtonComps>
          <LoginButton />
          <SignUpButton />
        </LoginButtonComps>
      )}
    </HeaderStyle>
  );
};

export default Header;

const StyledSlidingPane = styled(SlidingPane)`
  .slide-pane__header {
    background-color: ${(props) =>
      props.darkMode
        ? darkModeStyles.slidingPane.header.backgroundColor
        : lightModeStyles.slidingPane.header.backgroundColor};
    color: ${(props) =>
      props.darkMode
        ? darkModeStyles.slidingPane.header.color
        : lightModeStyles.slidingPane.header.color};
  }

  .slide-pane__content {
    background-color: ${(props) =>
      props.darkMode
        ? darkModeStyles.slidingPane.backgroundColor
        : lightModeStyles.slidingPane.backgroundColor};
  }

  .slide-pane__close {
    color: ${(props) =>
      props.darkMode
        ? darkModeStyles.slidingPane.close.color
        : lightModeStyles.slidingPane.close.color};
  }
`;
