import "./App.css";
import MainScreen from "./screens/MainScreen";
import MyWorkouts from "./screens/MyWorkouts";
import Header from "./components/Header";
import { useDarkMode } from "./context/DarkModeProvider";
import React from "react";
import BackgroundColorProvider from "./context/BackgroundColorProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const { darkMode } = useDarkMode();
  return (
    <div className="App">
      <BackgroundColorProvider>
        <Router>
          <Header darkMode={darkMode} />
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/savedWorkouts" element={<MyWorkouts />} />
          </Routes>
        </Router>
      </BackgroundColorProvider>
    </div>
  );
}

export default App;
