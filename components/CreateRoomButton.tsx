import {generateRoomCode} from "@/helpers/generateRoomCode";
import {socket} from "@/socket";
import {useStore} from "@/store";
import {Alert, Button, Stack} from "@mui/material";
import {useRouter} from "next/router";
import { useEffect, useState } from "react";

export const CreateRoomButton = () => {
  const { push } = useRouter();
  const { setRoomCode } = useStore()
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    socket.on("socketCreateRoom", ({roomCode, hostId}: {roomCode: string, hostId: string}) => {
      setRoomCode?.(roomCode)
      push(`${hostId}`)
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
    const roomCode = generateRoomCode();
    socket.emit("createRoom", roomCode);
  };

  return (
    <Stack spacing={2}>
      {error && <Alert severity="error" variant='outlined'>{error}</Alert>}
      <Button fullWidth variant="contained" onClick={createRoom}>create room</Button>
    </Stack>
  );
};
