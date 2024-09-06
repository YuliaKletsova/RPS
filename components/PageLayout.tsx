import {Box, Button, Stack, useTheme} from "@mui/material";
import {ModeSwitch} from "./ModeSwitch";
import {useStore} from "@/store";

export const PageLayout = ({theme, toggleTheme, children}: any) => {
  const {roomCode} = useStore()

    return (
        <Stack alignItems='center' justifyContent='center'
          sx={{
            height: "100vh",
            width: "100vw",
            position: "relative",
          }}
        >
          {roomCode && <Box
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
            }}
          >
            <Box>
              <Button size="small" variant="outlined" onClick={() => navigator?.clipboard?.writeText(roomCode)}>{roomCode}</Button>
            </Box>
          </Box>}
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
            }}
          >
            <ModeSwitch theme={theme} onChange={toggleTheme}/>
          </Box>
          {children}
        </Stack>
      );
}