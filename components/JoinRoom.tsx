import {socket} from "@/socket";
import {useStore} from "@/store";
import { Button, Stack, TextField} from "@mui/material";
import {useRouter} from "next/router";
import { ChangeEventHandler, useEffect, useState } from "react";

export const JoinRoom = () => {
  const { replace } = useRouter();
  const { setRoomCode } = useStore()
  
  const [inputRoom, setInputRoom] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    socket.on("joinedRoom", ({roomCode, playerId}: {roomCode: string, playerId: string}) => {
      setError(null);
      setRoomCode?.(roomCode)
      replace(`/${playerId}`)
    });

    socket.on("playerJoined", () => {
    });

    socket.on("roomNotFound", () => {
      setError("Room not found. Please check the room code.");
    });

    socket.on("roomBusy", () => {
      setError("Room is busy, please create new room");
    });

    return () => {
      socket.off("joinedRoom");
      socket.off("playerJoined");
      socket.off("roomNotFound");
      socket.off("roomBusy");
    };
  }, []);

  const joinRoom = () => {
    if (inputRoom) {
      socket.emit("joinRoom", inputRoom);
    }
  };

  const changeText: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = 
    (e) => {
        setError(null)
        setInputRoom(e.target.value)
    }

  return (
    <Stack direction='column' spacing={2}>
        <TextField
            fullWidth
            error={!!error}
            variant="outlined"
            value={inputRoom}
            placeholder="Room code"
            onChange={changeText} 
            helperText={error}
        />
        <Button fullWidth variant="contained" onClick={joinRoom}>join</Button>
    </Stack>
  );
};
