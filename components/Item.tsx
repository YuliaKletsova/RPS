import { Box, Card, Stack, SxProps, Theme, Typography, useTheme} from "@mui/material";
import Image from "next/image";
import { Scissors } from "../media/Scissors";
import { Paper } from "../media/Paper";
import {Unknown} from "../media/Unknown";
import {useResponsive} from "@/helpers/useResponsive";

export const ITEMS = ['rock', 'paper', 'scissors' ]

export const Item = ({ itemName, onChooseItem, customSizes }:{ itemName: string | null, onChooseItem?: () => void, customSizes?: SxProps<Theme> }) => {
  let content = null;
  const theme = useTheme();
  const {isMobile} = useResponsive()

  const rockLink = `/rock-${theme.palette.mode}.png`
  const paperLink = `/paper-${theme.palette.mode}.png`
  const scissorsLink = `/scissors-${theme.palette.mode}.png`

  const cardSize = isMobile ? {
    width: 300,
    height: 150,
  } : {
    width: 200,
    height: 200,
}

  switch (itemName) {
    case 'rock':
      content = <Image src={rockLink} alt={itemName.toUpperCase()} width={100} height={100} />
      break;
    case 'scissors':
      content = <Image src={scissorsLink} alt={itemName.toUpperCase()} width={100} height={100} />
      break;
    case 'paper':
      content = <Image src={paperLink} alt={itemName.toUpperCase()} width={100} height={100} />
      break;
    default:
      content = <Box p={2}><Unknown /></Box>
      break;
  }

  return (
    <Card 
        variant="outlined"
        sx={customSizes || cardSize}
        onClick={onChooseItem}
      >
        <Stack 
          sx={{height: '100%'}}
          justifyContent='center'
          alignItems='center'
          textAlign='center'
          >
            {content}
            <Typography>{!!itemName ? itemName.toUpperCase() : 'UNKNOWN'}</Typography>
        </Stack>
    </Card>
)}