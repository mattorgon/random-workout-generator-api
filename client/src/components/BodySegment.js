import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  TitleWrapper,
  TitleStyle,
  Underline,
  SubtitleStyle,
} from "../styles/ComponentStyles";
import SubmitButton from "./SubmitButton";
import { getLockedExercises } from "./SelectedExerciseList";
import { getRandomExercises } from "./SelectedExercises";
import WorkoutCount from "./WorkoutCount";
import { useDarkMode } from "../context/DarkModeProvider";
import { useAuth } from "../context/AuthContext";
import ButtonRows from "./ButtonRows";
import LoadingComponent from "./LoadingComponent";
import GeneratedContent from "./GeneratedContent";

const TITLE_TEXT = "Body Segment";
const SUBTITLE_TEXT = "What are we hitting today?";
const INITIAL_SLIDER_VALUE = 5;
let lockedProp;

const BodySeg = () => {
  const { isSignedIn } = useAuth();
  const { darkMode } = useDarkMode();

  const [sliderValue, setSliderValue] = useState(INITIAL_SLIDER_VALUE);
  const [toggledButtons, setToggledButtons] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const bottomRef = useRef(null);

  const handleButtonClick = useCallback((buttonText) => {
    setToggledButtons((prevButtons) =>
      prevButtons.includes(buttonText)
        ? prevButtons.filter((button) => button !== buttonText)
        : [...prevButtons, buttonText]
    );
  }, []);

  const handleFormSubmit = useCallback(() => {
    const locked = getLockedExercises();
    const { selectedExercises: exercises, lockedList: pleaseLock } =
      getRandomExercises(toggledButtons, sliderValue, locked);
    lockedProp = pleaseLock;

    setIsLoading(true);
    setSelectedExercises(exercises);
    setSubmitButtonClicked(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [sliderValue, toggledButtons]);

  const scrollToBottom = useCallback(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (submitButtonClicked) {
      scrollToBottom();
    }
  }, [submitButtonClicked, isLoading, selectedExercises, scrollToBottom]);

  return (
    <>
      <TitleWrapper>
        <TitleStyle darkMode={darkMode}>{TITLE_TEXT}</TitleStyle>
        <Underline />
      </TitleWrapper>

      <SubtitleStyle darkMode={darkMode}>{SUBTITLE_TEXT}</SubtitleStyle>

      <ButtonRows
        darkMode={darkMode}
        handleButtonClick={handleButtonClick}
        toggledButtons={toggledButtons}
      />

      <WorkoutCount
        onSliderChange={setSliderValue}
        maxSliderValue={INITIAL_SLIDER_VALUE * 2}
      />

      <SubmitButton buttonText="Generate" onButtonClick={handleFormSubmit} />

      {submitButtonClicked && (
        <div>
          {isLoading ? (
            <LoadingComponent bottomRef={bottomRef} />
          ) : (
            <GeneratedContent
              selectedExercises={selectedExercises}
              lockedProp={lockedProp}
              isSignedIn={isSignedIn}
              bottomRef={bottomRef}
            />
          )}
        </div>
      )}
    </>
  );
};

export default BodySeg;
