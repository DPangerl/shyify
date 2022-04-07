import { createTheme } from "@mui/material/styles";

export type ThemeType = typeof theme;
export { GlobalStyle } from "./GlobalStyle";

const colors = {
  primary: "#5555dd",
  secondary: "#dd5555",
};

export const theme = createTheme({
  typography: {
    fontFamily: "sans-serif",
  },
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
  },
});
