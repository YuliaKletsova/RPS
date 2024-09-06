
import type { AppProps } from "next/app";
import { ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from "react";
import {getActiveTheme} from "@/helpers/getActiveTheme";
import {CssBaseline} from "@mui/material";
import StoreProvider from "@/store";


export default function App({ Component, pageProps }: AppProps) {
  const initialTheme = getActiveTheme('light')
  const [currentTheme, setCurrentTheme] = useState(initialTheme)
  const [selectedTheme, setSelectedTheme] = useState<'light'|'dark'>('light')
  
  const toggleTheme = () => {
    const theme = selectedTheme === 'light'? 'dark' : 'light';
    setSelectedTheme(theme)
  }

  useEffect(() => {
    setCurrentTheme(getActiveTheme(selectedTheme))
  }, [selectedTheme])

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <StoreProvider>
        <Component {...pageProps} toggleTheme={toggleTheme} />
      </StoreProvider>
    </ThemeProvider>
  );
}
