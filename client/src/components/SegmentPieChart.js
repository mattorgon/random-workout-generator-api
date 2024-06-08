import React, { useEffect, useState, useRef } from "react";
import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { useAuth } from "../context/AuthContext";
import { useDarkMode } from "../context/DarkModeProvider";
import { darkModeStyles, lightModeStyles } from "../styles";

const API_URL = process.env.REACT_APP_API_URL;

Chart.register(PieController, ArcElement, Tooltip, Legend, Title);

const BodySegmentsPieChart = () => {
  const { userId, userToken } = useAuth();
  const [segmentData, setSegmentData] = useState({});
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const { darkMode } = useDarkMode();
  useEffect(() => {
    const fetchSegmentData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/workouts/users/${userId}/bodySegments`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: userToken,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setSegmentData(data);
      } catch (error) {
        console.error("Error fetching segment data:", error);
      }
    };

    fetchSegmentData();
  }, [userId, userToken]);

  const pieData = {
    labels: Object.keys(segmentData),
    datasets: [
      {
        data: Object.values(segmentData),
        backgroundColor: [
          "#FF6384", // Red
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4BC0C0", // Green
          "#B22222", // Dark Red
          "#FF9F40", // Orange
          "#8A2BE2", // BlueViolet
          "#7FFF00", // Chartreuse
        ],
        hoverBackgroundColor: [
          "#FF6384", // Red
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4BC0C0", // Green
          "#B22222", // Dark Red
          "#FF9F40", // Orange
          "#8A2BE2", // BlueViolet
          "#7FFF00", // Chartreuse
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top", // 'top', 'left', 'bottom', 'right'
        labels: {
          font: {
            size: 10,
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            style: "italic",
          },
          color: darkMode
            ? darkModeStyles.pieChart.legend.color
            : lightModeStyles.pieChart.legend.color,
          // boxWidth: 10, // Width of the color box
          // boxHeight: 10, // Height of the color box
          padding: 10, // Padding around the label
          usePointStyle: true, // Use point style (circles)
          pointStyle: "circle", // Style of the point (circle)
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#333",
        titleFont: {
          size: 16,
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        },
        bodyFont: {
          size: 14,
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        },
        footerFont: {
          size: 12,
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        },
      },
      title: {
        display: true,
        text: "Body Segments Distribution",
        font: {
          size: 18,
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          weight: "bold",
          style: "normal",
        },
        color: darkMode
          ? darkModeStyles.pieChart.title.color
          : lightModeStyles.pieChart.title.color,
      },
    },
  };

  useEffect(() => {
    if (canvasRef.current) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(canvasRef.current, {
        type: "pie",
        data: pieData,
        options: options,
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [pieData]);

  return <canvas ref={canvasRef} />;
};

export default BodySegmentsPieChart;
