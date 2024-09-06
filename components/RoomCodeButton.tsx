import {useStore} from "@/store"
import {Box, Button, Snackbar} from "@mui/material"
import {useState} from "react";

export const RoomCodeButton = () => {
    const {roomCode} = useStore()
    const [open, setOpen] = useState(false);

    if(!roomCode) return null;

    const copy = () => {
        navigator?.clipboard?.writeText(roomCode);
        setOpen(!open)
    }

    return (
        <Box
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
            }}
          >
            <Box>
              <Button size="small" variant="outlined" onClick={copy}>{roomCode}</Button>
              <Snackbar
                open={open}
                autoHideDuration={700}
                onClose={() => setOpen(!open)}
                message='✓ Copied'
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                ContentProps={{
                    sx: {
                        textAlign: "center",
                        "@media (min-width: 600px)": {
                          minWidth: "100px",
                          maxWidth: "150px",
                          width: "inherit",
                        },
                        "@media (min-width: 300px)": {
                            minWidth: "50px",
                            maxWidth: "95px",
                            width: "inherit",
                          },
                      },
                   }}
              />
            </Box>
          </Box>
    )
}