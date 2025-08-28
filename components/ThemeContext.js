"use client";
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);

  // প্রথমবার লোডের সময় localStorage থেকে theme পড়বে
  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem("theme"));
    if (savedTheme !== null) setDarkTheme(savedTheme);
  }, []);

  // যখনই theme বদলাবে, localStorage এ সেভ হবে
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkTheme));
  }, [darkTheme]);

  const toggleTheme = () => setDarkTheme(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
