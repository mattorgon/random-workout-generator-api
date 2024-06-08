import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { darkModeStyles, lightModeStyles } from "../styles";

export const SubtitleStyle = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${(props) =>
    props.darkMode
      ? darkModeStyles.mainScreen.backgroundColor
      : lightModeStyles.backgroundColor};
  color: ${(props) =>
    props.darkMode ? darkModeStyles.mainScreen.color : lightModeStyles.color};
`;

export const ButtonRowStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin: 10px;
  background-color: ${(props) =>
    props.darkMode
      ? darkModeStyles.mainScreen.backgroundColor
      : lightModeStyles.backgroundColor};
`;

export const Pushup = styled.img`
  width: 300px;
  height: 300px;
  margin-bottom: 5px;
  border: none;
  border-radius: 10px;
`;

export const TitleStyle = styled.div`
  font-weight: bold;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0);
  color: ${(props) =>
    props.darkMode
      ? darkModeStyles.titleText.color
      : lightModeStyles.titleText.color};
  display: inline;
  z-index: 1;
  position: relative;
  line-height: 0;
  margin-bottom: 0;
  padding: 0;
`;

export const TitleWrapper = styled.div`
  position: relative;
  z-index: 0;
`;

export const Underline = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  border-radius: 1.5px;
  transform: translateX(-50%);
  width: 250px;
  height: 2px;
  background-color: #f1ba66;
  z-index: 0;
  margin: 0;
  padding: 0;
  margin-bottom: 2px;
  line-height: 0;
`;

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const dotAnimation = keyframes`
  0% { content: "Working"; }
  33% { content: "Working."; }
  66% { content: "Working.."; }
  100% { content: "Working..."; }
`;

export const TextOverlay = styled.div`
  position: absolute;
  top: 60%;
  font-size: 24px;
  margin-top: 10px;
  &::after {
    content: "Working";
    animation: ${dotAnimation} 1s steps(3, end) infinite;
  }
`;

export const fadeIn = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ExerciseListStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
  flex-wrap: wrap;
`;

export const ExerciseCardWrapper = styled.div`
  opacity: 0;
  animation: fadeIn 2s forwards; // Apply the fade-in animation
  ${({ delay }) =>
    `animation-delay: ${delay}s;`}// Set the animation delay dynamically
`;

export const SliderContainer = styled.div`
  flex-wrap: nowrap;
  max-width: 600px;
  width: 90%;
  margin: 20px auto; /* Center the container horizontally */
  position: relative;
`;

export const Slider = styled.input`
  width: 100%;
  height: 4px; /* Set the height to make the bar thinner */
  appearance: none; /* Remove default styles */
  border-radius: 2px;
  background-color: ${(props) =>
    props.darkMode
      ? darkModeStyles.slider.backgroundColor
      : lightModeStyles.slider.backgroundColor};
  outline: none; /* Remove default focus style */

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px; /* Set the width of the thumb (circle) */
    height: 20px; /* Set the height of the thumb (circle) */
    background-color: ${(props) =>
      props.darkMode
        ? darkModeStyles.slider.thumb.backgroundColor
        : lightModeStyles.slider.thumb.backgroundColor};
    border: 2px solid
      ${(props) =>
        props.darkMode
          ? darkModeStyles.slider.thumb.border
          : lightModeStyles.slider.thumb.border};
    border-radius: 50%; /* Make it a circle */
    cursor: pointer;
    transition: background 0.3s, border 0.3s;
  }
`;

export const ScaleValue = styled.span`
  display: block;
  margin-top: 10px;
  text-align: center;
`;

export const SubmitButtonStyle = styled.button`
  background-color: #cc2936;
  color: white;
  border: none;
  border-radius: 6px;
  width: 200px;
  height: 50px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;
  transition: transform 0.1s ease-in-out;

  &:hover {
    background-color: darkred;
  }

  &:active {
    transform: scale(0.95);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    transition: transform 0.4s ease-in-out;
  }

  &.loading::before {
    animation: loading 1s linear infinite;
  }

  @keyframes loading {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

export const ButtonStyle = styled.button`
  background-color: DarkSlateGray;
  color: white;
  border: none;
  border-radius: 6px;
  width: 100px;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }
`;

export const LockButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  //background-color: DarkSlateGray;
  background-color: ${(props) =>
    props.darkMode
      ? darkModeStyles.lockButton.backgroundColor
      : lightModeStyles.lockButton.backgroundColor};
  color: white;
  border: ${(props) =>
    props.darkMode
      ? darkModeStyles.lockButton.border
      : lightModeStyles.lockButton.border};
  //border: none;
  border-radius: 6px;
  width: 100px;
  height: 30px;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }

  /* Dynamic font size based on text length */
  font-size: ${(props) => props.fontSize}px;
  overflow-wrap: break-word;
`;

export const ExerciseGif = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 5px;
  border: ${(props) =>
    props.darkMode
      ? darkModeStyles.exerciseGif.border
      : lightModeStyles.exerciseGif.border};
  border-radius: 10px;
`;

export const LockImg = styled.img`
    width: 10px;
    height: 10px;
    border: solid;
    border-radius: 10px;
    margin-left: 5px;
    //margin-right: 5px;
    justify-content: center;
    position: absolute
    background-color: ${(props) => (props.checked ? "#5B7564" : "white")};

`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Vertical alignment */
  margin-bottom: 10px; /* Adjust the margin as needed */
  // background-color: red;
`;

export const SaveButtonStyle = styled.button`
  background-color: #cc2936;
  color: white;
  border: none;
  border-radius: 6px;
  width: 200px;
  height: 50px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;
  transition: transform 0.1s ease-in-out;

  &:hover {
    background-color: darkred;
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    transition: transform 0.4s ease-in-out;
  }

  &.loading::before {
    animation: loading 1s linear infinite;
  }

  @keyframes loading {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

export const LoginButtonStyled = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 0px 10px;
  border: none;
  cursor: pointer;
  // z-index: 2;
  border-radius: 5px;
  font-size: 0.5em;
`;

export const ModalContent = styled.div`
  padding: 20px;
  z-index: 3;
  width: 50%;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1px; /* Adjust top position as needed */
  right: 10px; /* Adjust right position as needed */
  margin-top: 10px;
  color: darkgrey;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  &:hover {
    background-color: darkgrey;
    color: black;
  }
`;

export const Form = styled.form`
  max-width: 400px;
  margin: auto;
`;

export const Label = styled.label`
  display: block;
  font-size: 60%;
`;

export const Input = styled.input`
  width: 100%;
  margin-top: 0px;
`;

export const Button = styled.button`
  background-color: #3498db;
  color: #fff;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
`;

export const InvalidLogin = styled.div`
  // height: 20px;
  width: 100px;
  background-color: red;
  color: black;
`;

export const UsernameTaken = styled.div`
  // height: 20px;
  width: 100px;
  background-color: red;
  color: black;
`;

export const SignUpButtonStyled = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 0px 10px;
  border: none;
  cursor: pointer;
  //z-index: 2;
  border-radius: 5px;
  font-size: 0.5em;
  white-space: nowrap;
`;

export const ToggleableButton = styled.button`
  // background-color: ${(props) =>
    props.checked ? "DarkSlateGray" : "white"};

  background-color: ${
    (props) =>
      props.checked
        ? props.darkMode
          ? darkModeStyles.toggleButton.checked_backgroundColor // Background color when checked in dark mode
          : lightModeStyles.toggleButton.checked_backgroundColor // Background color when checked in light mode
        : props.darkMode
        ? darkModeStyles.toggleButton.backgroundColor // Dark mode background color when not checked
        : lightModeStyles.toggleButton.backgroundColor // Light mode background color when not checked
  };

  color: ${
    (props) =>
      props.checked
        ? props.darkMode
          ? darkModeStyles.toggleButton.checked_color // Background color when checked in dark mode
          : lightModeStyles.toggleButton.checked_color // Background color when checked in light mode
        : props.darkMode
        ? darkModeStyles.toggleButton.color // Dark mode background color when not checked
        : lightModeStyles.toggleButton.color // Light mode background color when not checked
  };

  //background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: ${(props) =>
    props.darkMode
      ? darkModeStyles.toggleButton.border_radius
      : lightModeStyles.toggleButton.border_radius};
  height: 30px;
  width: 100px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.darkMode
        ? darkModeStyles.toggleButton.hover_backgroundColor
        : lightModeStyles.toggleButton.hover_backgroundColor};
  }

  border: ${(props) =>
    props.darkMode
      ? darkModeStyles.toggleButton.border
      : lightModeStyles.toggleButton.border};
`;

export const PaneButton = styled.button`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 80%;
  height: 15px;
  font-size: 5px;
  margin-bottom: 1vh;
  margin-top: 1vh;
  &:hover {
    background-color: ${(props) =>
      props.darkMode
        ? lightModeStyles.toggleButton.hover_backgroundColor
        : lightModeStyles.toggleButton.hover_backgroundColor};
  }
`;

export const HeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between; /* Align children to the start and end */
  padding: 0 20px; /* Add some padding for better spacing */
  background-color: ${(props) =>
    props.darkMode
      ? darkModeStyles.header.backgroundColor
      : lightModeStyles.header.backgroundColor};
  color: ${(props) =>
    props.darkMode
      ? darkModeStyles.header.color
      : lightModeStyles.header.color};
  line-height: 0; /* Adjust line-height to remove gap */
  margin-bottom: 0; /* Reset margin-bottom */
  padding: 0; /* Reset padding */
  padding-left: 10px;
  padding-bottom: 10px;
  padding-top: 5px;
`;

export const HeaderUnderline = styled.div`
  border-radius: 1.5px;
  width: 100px;
  height: 2px;
  background-color: #f1ba66;
  margin-top: 6px;
`;

export const HeaderTitleWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 0;
`;

export const HeaderTitleStyle = styled.div`
  font-weight: bold;
  font-size: 15px;
  background-color: rgba(0, 0, 0, 0);

  color: ${(props) =>
    props.darkMode
      ? darkModeStyles.titleText.color
      : darkModeStyles.titleText.color};
  display: inline;
  z-index: 2;
  position: relative;

  line-height: 0; /* Adjust line-height to remove gap */
  margin-bottom: 0; /* Reset margin-bottom */
  padding: 0px; /* Reset padding */
  margin-top: 10px;
`;

export const Welcome = styled.div`
  display: flex;
  align-items: center;
  margin-right: 4vw;
`;

export const LoginButtonComps = styled.div`
  display: flex;
  gap: 5px; /* Add space between the buttons */
  align-items: stretch;
  padding-right: 5px;

  & > button {
    flex: 1;
    max-width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const IntroStyle = styled.div`
display: flex
width: 100%;
left: 10px;
padding: 10px;
//color: #232323;
//color: '#5B7564';
// background-color: "red";
background-color: ${(props) =>
  props.darkMode
    ? darkModeStyles.mainScreen.backgroundColor
    : lightModeStyles.backgroundColor};
color: ${(props) =>
  props.darkMode ? darkModeStyles.mainScreen.color : lightModeStyles.color};
`;

export const ScreenStyle = styled.div`
display: flex
width: 100%;
height: 100%;
left: 10px;
//color: #232323;
color: '#5B7564';
//background-color: #CC2936;
background-color: ${(props) =>
  props.darkMode
    ? darkModeStyles.mainScreen.backgroundColor
    : lightModeStyles.backgroundColor};
color: ${(props) =>
  props.darkMode ? darkModeStyles.mainScreen.color : lightModeStyles.color};
`;

export const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
`;

export const DayCell = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 2px;
  padding-top: 5px;
  min-width: 13%;
  min-width: 30px;
  font-size: 1vw;
  display: flex;
  flex-direction: column;
  border-color: ${(props) => (props.darkMode ? "#f1ba66" : "#5b7564")};
  color: ${(props) => (props.darkMode ? "#F8F0E3" : "#000000")};
  overflow-wrap: break-word;
`;

export const WorkoutList = styled.ul`
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
  padding-inline-start: 0;
`;

export const WorkoutItem = styled.li`
  margin-bottom: 5px;
`;

export const WorkoutItemUL = styled.ul`
  padding-inline-start: 0;
  list-style-type: none;
`;

export const SavedWorkoutScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const DateStyle = styled.div`
  font-size: 1.5vw;
  font-weight: bold;
`;

export const EmptyCell = styled.div`
  font-size: 1vw;
`;

export const DatePickerStyle = styled.div`
  margin-bottom: 10px;
  width: 50%;
  height: 10%;
  align-self: center;
  color: ${(props) => (props.darkMode ? "#f1ba66" : "#000000")};

  @media (max-width: 768px) {
    width: 50%; // Adjust the width for smaller screens
  }
`;

export const MyWorkoutsTitleStyle = styled.div`
  font-size: 100%;
  font-weight: bold;
  color: ${(props) => (props.darkMode ? "#ffffff" : "#32533D")};
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 15px;
  // display: flex;
  // justify-content: center;
  // align-content: center;
  // align-items: center;
`;
