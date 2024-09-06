import {socket} from "@/socket";
import {useStore} from "@/store";
import {Box, Button, Stack, Typography, useTheme} from "@mui/material";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {Item} from "./Item";
import {VS} from "./VS";

enum RESULTS {
    WIN='WIN',
    LOSE='LOSE',
    DRAW='DRAW'
}

const RESULT_TEXT = {
    WIN: 'YOU WON',
    LOSE: 'YOU LOST',
    DRAW: 'DRAW'
}

export const ResultContent = () => {
    const theme = useTheme();
    const themeMode = theme.palette.mode;
    const {roomCode} = useStore()
    const { push, query } = useRouter();
    const { playerId } = query as { playerId: string }


    const [choices, setChoices] = useState<any>({});
    const [opponent, setOpponent] = useState<string>('');
    const [gameStatus, setGameStatus] = useState<RESULTS | undefined>();
    

    useEffect(() =>{
      if (!roomCode || !playerId) push('/') 
    }, [])

    useEffect(() => {
        socket.on("gameState", ( choice: string ) => {
            setChoices({[playerId]: choice});
        });

        socket.on("gameResult", ({ result, choices }: { result: {winner: string; draw: boolean}; choices: Record<string, string> }) => {
            const opponent = Object.keys(choices).filter(player => player !== playerId)?.[0]
            setOpponent(opponent)
            setChoices({[playerId]:choices[playerId], [opponent]: choices[opponent]})

            if (result.draw) {
                setGameStatus(RESULTS.DRAW)
            } else {
                setGameStatus(playerId === result.winner ? RESULTS.WIN : RESULTS.LOSE)
            }
          });
    
        socket.on("replay", (player: string) => {
            push(`/${player}`)
        })

        return () => {
          socket.off("gameState");
          socket.off("gameResult");
          socket.off("replay");
        };
      }, []);

    const playAgain = () => {
        socket.emit("playAgain", roomCode);
    }
      return (
        <Stack textAlign='center' spacing={8}>
            <Stack direction='row' spacing={4} alignItems='center'>
                <Box>
                    You
                    <Item itemName={choices[playerId]} />
                </Box>
                <VS />
                <Box>
                    Opponent
                    <Item itemName={choices[opponent]} />
                </Box>
            </Stack>

            {gameStatus && (
                <>
                    <Typography variant="h4">
                        <span>{RESULT_TEXT[gameStatus]}</span>
                    </Typography>
                    <Button variant="outlined" autoFocus onClick={playAgain}>rematch</Button>
                </>
            )}

            {!choices[opponent] && (
                <Stack spacing={2} alignItems='center'>
                    <Typography variant="h4">
                        <span>Waiting for you opponent </span>
                    </Typography>
                    <span className="loading"></span>
                </Stack>
            )}

            <style jsx>{`
                .loading {
                    width: 15px;
                    aspect-ratio: 1;
                    border-radius: 50%;
                    animation: ${themeMode} 1s infinite linear alternate;
                }
                @keyframes light {
                    0%  {box-shadow: 20px 0 #000, -20px 0 #0002;background: #000 }
                    33% {box-shadow: 20px 0 #000, -20px 0 #0002;background: #0002}
                    66% {box-shadow: 20px 0 #0002,-20px 0 #000; background: #0002}
                    100%{box-shadow: 20px 0 #0002,-20px 0 #000; background: #000 }
                }
                @keyframes dark {
                    0%  {box-shadow: 20px 0 #fff, -20px 0 #fff2;background: #fff }
                    33% {box-shadow: 20px 0 #fff, -20px 0 #fff2;background: #fff2}
                    66% {box-shadow: 20px 0 #fff2,-20px 0 #fff; background: #fff2}
                    100%{box-shadow: 20px 0 #fff2,-20px 0 #fff; background: #fff }
                }
            `}
            </style>
        </Stack>
      )
}