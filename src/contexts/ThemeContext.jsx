import React, { useEffect, useState } from "react";
import { ThemeContext } from "./theme";

// Function to get initial theme
const getInitialTheme = () => {
  try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }

    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return systemPrefersDark ? "dark" : "light";
  } catch (error) {
    console.error("Error accessing localStorage or matchMedia:", error);
    return "light";
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme class to document element and save to localStorage
  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.error("Error setting theme:", error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
