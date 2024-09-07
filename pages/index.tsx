import { CreateRoomButton } from '@/components/CreateRoomButton';
import { JoinRoom } from '@/components/JoinRoom';
import { PageLayout } from '@/components/PageLayout';
import { Box, Stack } from '@mui/material';

const Home = (props: any) => {
  return (
    <PageLayout theme={props.theme} toggleTheme={props.toggleTheme}>
      <Stack width="90%" textAlign="center">
        <CreateRoomButton />
        <Box my={6}>OR</Box>
        <JoinRoom />
      </Stack>
    </PageLayout>
  );
};

export default Home;
