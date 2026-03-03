import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: "light", // 'light', 'dark', or 'system'
    preference: "system", // user's preference: 'light', 'dark', or 'system'
  },
  reducers: {
    setTheme: (state, action) => {
      state.preference = action.payload;
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("themePreference", action.payload);
        
        // Calculate actual mode based on preference
        if (action.payload === "system") {
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          state.mode = prefersDark ? "dark" : "light";
        } else {
          state.mode = action.payload;
        }
      }
    },
    toggleTheme: (state) => {
      // Toggle between light and dark only
      const newMode = state.mode === "light" ? "dark" : "light";
      state.mode = newMode;
      state.preference = newMode;
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("themePreference", newMode);
      }
    },
    initializeTheme: (state) => {
      if (typeof window !== "undefined") {
        const savedPreference = localStorage.getItem("themePreference");
        
        if (savedPreference) {
          state.preference = savedPreference;
          if (savedPreference === "system") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            state.mode = prefersDark ? "dark" : "light";
          } else {
            state.mode = savedPreference;
          }
        } else {
          // Default to system
          state.preference = "system";
          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          state.mode = prefersDark ? "dark" : "light";
        }
      }
    },
    updateSystemTheme: (state) => {
      // Update mode based on system preference (only if preference is 'system')
      if (state.preference === "system" && typeof window !== "undefined") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        state.mode = prefersDark ? "dark" : "light";
      }
    },
  },
});

export const { setTheme, toggleTheme, initializeTheme, updateSystemTheme } = themeSlice.actions;
export default themeSlice.reducer;
