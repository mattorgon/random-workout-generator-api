import React, { useState, useEffect, useRef } from "react";
import lockedImage from "../assets/illustration-of-lock-icon-vector.jpg";
import unlockedImage from "../assets/21-213657_padlock-146537-unlock-clipart-png-download.png";
import { useDarkMode } from "../context/DarkModeProvider";
import {
  LockButton,
  ExerciseGif,
  LockImg,
  CardContainer,
} from "../styles/ComponentStyles";

let locked = [];

export const getLockedExercises = (lockExercises) => {
  locked = lockExercises;
};

const ExerciseCard = ({
  exerciseName,
  exerciseImage,
  onButtonLock,
  checked,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const [fontSize, setFontSize] = useState(12);

  const buttonRef = useRef();

  const { darkMode } = useDarkMode();

  const handleLockButtonClick = () => {
    onButtonLock(exerciseName);
    // console.log("Effect triggered. Current value of isPressed:", isPressed);
    setIsPressed(!isPressed);
  };

  // useEffect(() => {
  //   console.log("After setIsPressed:", isPressed);
  // }, [isPressed]); // Log values when isPressed or toggledLock change

  useEffect(() => {
    const textLength = buttonRef.current.scrollWidth; //exerciseName.length;//
    const textHeight = buttonRef.current.scrollHeight;
    const maxWidth = 90; // You can adjust this value based on your requirements
    const maxHeight = 25;
    const scaleFactor = maxWidth / textLength;
    const heightScale = maxHeight / textHeight;
    const adjustedFontSize = Math.floor(12 * scaleFactor);
    // setFontSize(
    //   Math.min(12, Math.min(adjustedFontSize, fontSize * heightScale))
    // );
    setFontSize((prevFontSize) =>
      Math.min(12, Math.min(adjustedFontSize, prevFontSize * heightScale))
    );
  }, [exerciseName]);

  return (
    <CardContainer>
      <ExerciseGif src={exerciseImage} alt={exerciseName} darkMode={darkMode} />
      <LockButton
        onClick={handleLockButtonClick}
        checked={checked}
        fontSize={fontSize}
        ref={buttonRef}
        darkMode={darkMode}
      >
        {exerciseName}
        <LockImg
          src={checked ? lockedImage : unlockedImage}
          alt={checked ? "unlocked" : "locked"}
          checked={checked}
        />
      </LockButton>
    </CardContainer>
  );
};

export default ExerciseCard;
