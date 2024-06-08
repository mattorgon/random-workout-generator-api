import React from "react";
import SelectedExerciseList from "./SelectedExerciseList";
import SaveButton from "./SaveButton";

const GeneratedContent = ({
  selectedExercises,
  lockedProp,
  isSignedIn,
  bottomRef,
}) => (
  <>
    <SelectedExerciseList
      selectedExercises={selectedExercises}
      lockedList={lockedProp}
    />
    {selectedExercises.length > 0 ? (
      isSignedIn ? (
        <SaveButton
          buttonText="Save Workout"
          exercises={selectedExercises}
          isWorkoutGenerated={selectedExercises.length > 0}
        />
      ) : (
        <p>Sign in to save workout!</p>
      )
    ) : (
      <p>Select a body segment!</p>
    )}
  </>
);

export default GeneratedContent;
