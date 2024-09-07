import {generateRoomCode} from "@/helpers/generateRoomCode";
import {socket} from "@/socket";
import {useStore} from "@/store";
import {Alert, Box, Button, Stack, Typography} from "@mui/material";
import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import {Item, ITEMS} from "./Item";

export const CreateRoomButton = () => {
  const {roomCode} = useStore()
  const { replace } = useRouter();
  const { setRoomCode } = useStore()
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    socket.on("socketCreateRoom", ({roomCode, hostId}: {roomCode: string, hostId: string}) => {
      setRoomCode?.(roomCode)
      if (!error) replace(`${hostId}`)
    });

    socket.on("roomExists", () => {
      setError("Room already exists, try again");
    });

    return () => {
      socket.off("socketCreateRoom");
      socket.off("roomExists");
    };
  }, []);

  const createRoom = () => {
    if(!roomCode) {
      const roomCode = generateRoomCode();
      socket.emit("createRoom", roomCode);
    } else setError("Looks like you’re already in the room! Check the top left corner for the code, and feel free to share it with a friend to join the fun!");
  };

  return (
    <Stack spacing={10}>
      <Box>
        <Typography variant="h3">ROCK-PAPER-SCISSORS</Typography>
        <Typography variant='h6'>Handle your issues like an adult</Typography>
      </Box>
      <Stack spacing={2}>
        {error && <Alert severity="error" variant='outlined'>{error}</Alert>}
        <Button fullWidth variant="contained" onClick={createRoom}>create room</Button>
      </Stack>
    </Stack>
  );
};
