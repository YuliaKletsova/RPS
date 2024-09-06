
import type { AppProps } from "next/app";
import { ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from "react";
import {getActiveTheme} from "@/helpers/getActiveTheme";
import {CssBaseline} from "@mui/material";
import StoreProvider from "@/store";


export default function App({ Component, pageProps }: AppProps) {
  const lightTheme = getActiveTheme('light')
  const darkTheme = getActiveTheme('dark')

  const [currentTheme, setCurrentTheme] = useState(lightTheme)
  const [isLightTheme, setIsLightTheme] = useState<boolean>(false)

  useEffect(() => {
      const prefersDarkScheme = window?.matchMedia("(prefers-color-scheme: dark)");
      setIsLightTheme(prefersDarkScheme.matches ? false : true)
  }, [])
  
  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme)
  }

  useEffect(() => {
    setCurrentTheme(isLightTheme ?lightTheme : darkTheme)
  }, [isLightTheme])

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <StoreProvider>
        <Component {...pageProps} toggleTheme={toggleTheme} />
      </StoreProvider>
    </ThemeProvider>
  );
}
