import React, { useState, useEffect } from "react";
import { SaveButtonStyle } from "../styles/ComponentStyles";
import { useAuth } from "../context/AuthContext";

const SaveButton = ({ buttonText, exercises, isWorkoutGenerated }) => {
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isWorkoutGenerated) {
      setIsSaved(false);
      // console.log("exercises generated: ", exercises);
    }
  }, [isWorkoutGenerated]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3001/workouts/saveWorkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId, // Replace with the actual user ID. username for now
            savedExercises: exercises,
          }),
        }
      );

      if (response.ok) {
        console.log("Workout saved successfully!");
        setIsSaved(true);
      } else {
        console.error("Failed to save workout");
      }
    } catch (error) {
      console.error("Error saving workout:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <SaveButtonStyle
      onClick={handleSave}
      disabled={isSaved && !isLoading}
      className={isLoading ? "loading" : ""}
    >
      {isSaved && !isLoading ? "Saved" : buttonText}
    </SaveButtonStyle>
  );
};

export default SaveButton;
