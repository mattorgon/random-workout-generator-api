import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import { useDarkMode } from "../context/DarkModeProvider";
import getTheme from "../styles/theme"; // Import the theme
import BodySegmentsPieChart from "../components/SegmentPieChart";
import {
  CalendarContainer,
  DayCell,
  WorkoutList,
  WorkoutItem,
  WorkoutItemUL,
  SavedWorkoutScreen,
  DateStyle,
  EmptyCell,
  DatePickerStyle,
  MyWorkoutsTitleStyle,
  ChartContainer,
} from "../styles/ComponentStyles";

const API_URL = process.env.REACT_APP_API_URL;

const CustomTextField = (props) => {
  return (
    <TextField
      {...props}
      variant="standard" // Keep the desired variant
      fullWidth // Maintain full width styling
      // Add any additional styles or props here
    />
  );
};

const SavedWorkoutsPage = () => {
  const [savedWorkouts, setSavedWorkouts] = useState({});
  const [value, setValue] = useState(dayjs());
  const { userToken } = useAuth();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedDate = value.toDate();
        const dateRange = calculateDateRange(selectedDate);

        const workoutsData = {};

        for (const date of dateRange) {
          const response = await fetch(
            `${API_URL}/workouts/savedWorkouts?date=${date.toISOString()}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                authorization: userToken,
              },
            }
          );
          workoutsData[date.toLocaleDateString()] = await response.json();
        }

        setSavedWorkouts(workoutsData);
      } catch (error) {
        console.error("Error fetching saved workouts:", error);
      }
    };

    fetchData();
  }, [value, userToken]);

  const calculateDateRange = (selectedDate) => {
    const dateRange = [];
    for (let i = -3; i <= 3; i++) {
      const date = new Date(selectedDate);
      date.setDate(selectedDate.getDate() + i);
      dateRange.push(date);
    }
    return dateRange;
  };

  return (
    <ThemeProvider theme={getTheme(darkMode)}>
      <SavedWorkoutScreen>
        <MyWorkoutsTitleStyle darkMode={darkMode}>
          Your Saved Workouts
        </MyWorkoutsTitleStyle>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePickerStyle darkMode={darkMode}>
            <DatePicker
              value={value}
              onChange={(newValue) => setValue(newValue)}
              textField={(params) => <CustomTextField {...params} />} // Use custom TextField
            />
          </DatePickerStyle>
        </LocalizationProvider>
        <ChartContainer>
          <BodySegmentsPieChart darkMode={darkMode} />
        </ChartContainer>
        <CalendarContainer>
          {Object.keys(savedWorkouts).map((formattedDate) => {
            const workoutsForDay = savedWorkouts[formattedDate];

            return (
              <DayCell key={formattedDate} darkMode={darkMode}>
                <DateStyle>{formattedDate}</DateStyle>
                {workoutsForDay.length > 0 ? (
                  <WorkoutList>
                    {workoutsForDay.map((workout, index) => (
                      <WorkoutItem key={index}>
                        <p>{new Date(workout.date).toLocaleTimeString()}</p>
                        <p>{workout.name}</p>
                        {workout.exercises && workout.exercises.length > 0 ? (
                          <WorkoutItemUL>
                            {workout.exercises.map((exercise, index) => (
                              <li key={index}>{exercise.name}</li>
                            ))}
                          </WorkoutItemUL>
                        ) : (
                          <p>No saved exercises</p>
                        )}
                      </WorkoutItem>
                    ))}
                  </WorkoutList>
                ) : (
                  <EmptyCell>No saved exercises</EmptyCell>
                )}
              </DayCell>
            );
          })}
        </CalendarContainer>
      </SavedWorkoutScreen>
    </ThemeProvider>
  );
};

export default SavedWorkoutsPage;
