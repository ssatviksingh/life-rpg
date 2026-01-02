import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { useThemeStore } from "../store/themeStore";
import { getPalette } from "../utils/ui";

interface ThemeContextType {
  isDark: boolean;
  palette: ReturnType<typeof getPalette>;
  toggleTheme: () => void;
  setThemeMode: (mode: "light" | "dark" | "system") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isDark, toggleDarkMode, setThemeMode, mode } = useThemeStore();
  const [systemTheme, setSystemTheme] = useState(false);

  // Listen for system theme changes
  useEffect(() => {
    if (mode === "system") {
      // Get initial system theme
      const systemColorScheme = Appearance.getColorScheme();
      setSystemTheme(systemColorScheme === "dark");

      // Listen for system theme changes
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setSystemTheme(colorScheme === "dark");
      });

      return () => subscription?.remove();
    }
  }, [mode]);

  const currentIsDark = mode === "system" ? systemTheme : isDark;
  const currentPalette = getPalette(currentIsDark);

  const value: ThemeContextType = {
    isDark: currentIsDark,
    palette: currentPalette,
    toggleTheme: toggleDarkMode,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
