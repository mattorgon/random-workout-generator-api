// styles.js
const colors = {
  yellow: "#f1ba66",
  green: "#32533D",
  opaqueGreen: "#5b7564",
  offWhite: "#F8F0E3",
};
export const lightModeStyles = {
  backgroundColor: "white",
  color: "black",
  header: {
    backgroundColor: colors.green,
    color: colors.offWhite,
  },
  mainScreen: {
    backgroundColor: "white",
    color: "white",
  },
  toggleButton: {
    checked_backgroundColor: colors.opaqueGreen,
    checked_color: "white",
    hover_backgroundColor: colors.yellow,
    backgroundColor: "white",
    color: colors.opaqueGreen,
    border: "1px solid #5b7564",
    border_radius: "6px",
  },
  lockButton: {
    backgroundColor: colors.opaqueGreen,
    color: colors.offWhite,
    border: "none",
    border_radius: "6px;",
  },
  exerciseGif: {
    border_radius: "10px",
    border: "solid",
  },
  slider: {
    backgroundColor: colors.green,
    thumb: {
      backgroundColor: colors.yellow,
      border: colors.green,
    },
    hashMark: {
      color: colors.green,
    },
  },
  titleText: {
    color: colors.green,
  },
  slidingPane: {
    header: {
      backgroundColor: colors.green,
      color: colors.offWhite,
    },
    close: {
      color: colors.offWhite,
    },
    backgroundColor: "white",
  },
  pieChart: {
    title: {
      color: "black",
    },
    legend: {
      color: "black",
    },
  },
};

export const darkModeStyles = {
  header: {
    backgroundColor: "#1C1C1C",
    color: colors.offWhite,
  },

  backgroundColor: "black",
  color: "white",

  mainScreen: {
    backgroundColor: "#484848",
    color: colors.offWhite,
  },
  toggleButton: {
    checked_backgroundColor: colors.opaqueGreen,
    checked_color: "white",
    hover_backgroundColor: "#1C1C1C",
    backgroundColor: "#696969",
    color: "rgba(241, 186, 102, 0.80)",
    border: "2px solid #F1BA66",
    border_radius: "6px;",
  },
  lockButton: {
    backgroundColor: "#696969",
    color: colors.offWhite,
    border: "2px solid #F1BA66",
    border_radius: "6px;",
  },
  exerciseGif: {
    border_radius: "10px",
    border: "2px solid #F1BA66",
  },
  slider: {
    backgroundColor: colors.offWhite,
    thumb: {
      backgroundColor: colors.yellow,
      border: colors.offWhite,
    },
    hashMark: {
      color: colors.offWhite,
    },
  },
  titleText: {
    color: colors.offWhite,
  },
  slidingPane: {
    header: {
      backgroundColor: "black",
      color: colors.offWhite,
    },
    close: {
      color: colors.yellow,
    },
    backgroundColor: "#484848",
  },
  pieChart: {
    title: {
      color: colors.offWhite,
    },
    legend: {
      color: colors.offWhite,
    },
  },
};
