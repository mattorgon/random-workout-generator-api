import React, { useState, useEffect } from "react";
import ExerciseCard from "./Exercise";
import {
  ExerciseListStyle,
  ExerciseCardWrapper,
  fadeIn,
} from "../styles/ComponentStyles";

let lockedExercises = [];

export const getLockedExercises = () => {
  return lockedExercises;
};

export const setLockedExercises = (locked) => {
  lockedExercises = locked;
};

const SelectedExerciseList = ({ selectedExercises, lockedList }) => {
  const [toggledLock, setToggledLock] = useState(lockedList);
  const [displayedExercises, setDisplayedExercises] = useState([]);

  const handleButtonLock = (buttonText) => {
    setToggledLock((prevLock) => {
      let newLock;
      if (prevLock.some((lock) => lock.name === buttonText)) {
        newLock = prevLock.filter((lock) => lock.name !== buttonText);
      } else {
        const index = selectedExercises.findIndex(
          (exercise) => exercise.name === buttonText
        );
        if (index !== -1) {
          const selectedExercise = selectedExercises[index];
          newLock = [
            ...prevLock,
            {
              name: selectedExercise.name,
              segment: selectedExercise.segment,
              image: selectedExercise.image,
              index: index,
            },
          ];
        } else {
          console.warn(`Exercise ${buttonText} not found in selectedExercises`);
          newLock = [...prevLock];
        }
      }
      setLockedExercises(newLock);
      return newLock;
    });
  };

  useEffect(() => {
    setToggledLock(getLockedExercises());
  }, []);

  useEffect(() => {
    setDisplayedExercises([]);
    if (selectedExercises.length > 0) {
      let delay = 0;
      selectedExercises.forEach((exercise) => {
        setTimeout(() => {
          setDisplayedExercises((prevExercises) => {
            if (!prevExercises.includes(exercise)) {
              return [...prevExercises, exercise];
            }
            return prevExercises;
          });
        }, delay);
        delay += 250;
      });
    }
  }, [selectedExercises]);

  if (!Array.isArray(selectedExercises)) {
    console.error("Selected exercises is not an array:", selectedExercises);
    return null;
  }

  return (
    <>
      <style>{fadeIn}</style>
      <ExerciseListStyle>
        {displayedExercises.map((exercise, index) => (
          <ExerciseCardWrapper key={index} delay={index * 0.25}>
            <ExerciseCard
              exerciseName={exercise.name}
              exerciseImage={exercise.image}
              onButtonLock={handleButtonLock}
              checked={toggledLock.some((lock) => lock.name === exercise.name)}
            />
          </ExerciseCardWrapper>
        ))}
      </ExerciseListStyle>
    </>
  );
};

export default SelectedExerciseList;
