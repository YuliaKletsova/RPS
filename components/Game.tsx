import { socket } from '@/socket';
import { useStore } from '@/store';
import {
  Button,
  DialogContent,
  Stack,
  Typography,
  Dialog,
  TextField,
  DialogTitle,
} from '@mui/material';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Item, ITEMS } from './Item';

export const Game = () => {
  const { roomCode } = useStore();
  const { replace, query } = useRouter();
  const { playerId } = query as { playerId: string };

  const [modalStatus, setModalStatus] = useState(true);
  const [choice, setChoice] = useState<string | null>(null);
  const [reason, setReason] = useState<string>('');

  useEffect(() => {
    if (!roomCode) replace('/');
  }, [roomCode]);

  const toggleDialog = () => setModalStatus(!modalStatus);

  const onConfirm = () => {
    if (choice) {
      socket.emit('play', roomCode, playerId, choice);
      replace(`${playerId}/result`);
    } else {
      // save reasno to socket
    }
  };

  const chooseItem = (item: string) => {
    setChoice(item);
    toggleDialog();
  };

  const changeText: ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (e) => {
      setReason(e.target.value);
    };

  return (
    <Stack spacing={2}>
      {ITEMS.map((item) => {
        return (
          <Item
            itemName={item}
            key={item}
            onChooseItem={() => chooseItem(item)}
          />
        );
      })}

      <Dialog open={modalStatus} onClose={toggleDialog}>
        <DialogTitle>
          <Typography align="center" variant="h4" fontWeight={700}>
            {choice
              ? "You've chosen"
              : 'Whats the penalty for the loser?'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {choice ? (
            <Stack alignItems="center" p={2}>
              <Item itemName={choice} />
            </Stack>
          ) : (
            <TextField
              fullWidth
              variant="outlined"
              value={reason}
              placeholder="e.g. Loser washes the dishes"
              onChange={changeText}
            />
          )}
        </DialogContent>
        <Stack direction="row" spacing={2} p={2}>
          <Button
            fullWidth
            variant="outlined"
            autoFocus
            onClick={toggleDialog}
          >
            {' '}
                        cancel{' '}
          </Button>
          <Button fullWidth variant="contained" onClick={onConfirm}>
            {choice ? 'confirm' : 'ok'}
          </Button>
        </Stack>
      </Dialog>
    </Stack>
  );
};
