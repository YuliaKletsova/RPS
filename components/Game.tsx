import {socket} from "@/socket";
import {useStore} from "@/store";
import { Button, Card, DialogContent, Stack, Typography, Dialog} from "@mui/material";
import {useEffect, useState} from "react";
import { useRouter } from "next/router";
import {Item, ITEMS} from "./Item";
import {useResponsive} from "@/helpers/useResponsive";

export const Game = () => {
    const {roomCode} = useStore()
    const { push, query } = useRouter();
    const { playerId } = query as { playerId: string }

    const [modalStatus, setModalStatus] = useState(false);
    const [choice, setChoice] = useState<string | null>(null);

    useEffect(() =>{
      if (!roomCode) push('/') 
    }, [roomCode])

  const toggleDialog = () => setModalStatus(!modalStatus);

  const play = () => {
      socket.emit("play", roomCode, playerId, choice);
      push(`${playerId}/result`)
  };

  const chooseItem = (item: string) => {
    setChoice(item)
    toggleDialog()
  }

    return (
       <Stack spacing={2}>
        {ITEMS.map(item => {
          return (
            <Item itemName={item} key={item} onChooseItem={() => chooseItem(item)} />
        )
        })}

        <Dialog open={modalStatus} onClose={toggleDialog}>
          <Typography align="center" variant="h4" fontWeight={700}>You've chosen</Typography>
          <DialogContent>
            <Stack alignItems='center' p={2}>
              <Item itemName={choice} />
            </Stack>
          </DialogContent>
          <Stack direction='row' spacing={2} p={2}>
                <Button fullWidth variant="outlined" autoFocus onClick={toggleDialog}> cancel </Button>
                <Button fullWidth variant="contained" onClick={play}>confirm</Button>
            </Stack>
        </Dialog>
       </Stack>
    )
}