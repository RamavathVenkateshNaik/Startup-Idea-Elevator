import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

// simple color sets
const lightColors = {
  bg: "#fff",
  text: "#111",
  text2: "#555",
  primary: "#4f46e5",
  card: "#f8f8f8",
  border: "#ddd"
};

const darkColors = {
  bg: "#111",
  text: "#fff",
  text2: "#ccc",
  primary: "#6366f1",
  card: "#1f1f1f",
  border: "#444"
};

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const sys = useColorScheme();
  const [dark, setDark] = useState(sys === "dark");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const t = await AsyncStorage.getItem("theme");
      if (t) setDark(t === "dark");
    } catch (e) {
      console.log("error loading theme", e);
    }
  };

  const toggle = async () => {
    const newDark = !dark;
    setDark(newDark);
    try {
      await AsyncStorage.setItem("theme", newDark ? "dark" : "light");
    } catch (e) {
      console.log("error saving theme", e);
    }
  };

  const theme = dark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
