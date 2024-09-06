import {Box, Stack} from "@mui/material";
import {ModeSwitch} from "./ModeSwitch";
import {RoomCodeButton} from "./RoomCodeButton";

export const PageLayout = ({theme, toggleTheme, children}: any) => {
    return (
        <Stack alignItems='center' justifyContent='center'
          sx={{
            height: "100vh",
            width: "100vw",
            position: "relative",
          }}
        >
          <RoomCodeButton />
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