import { Game } from '@/components/Game';
import { PageLayout } from '@/components/PageLayout';

const PlayerPage = (props: any) => {
  return (
    <PageLayout theme={props.theme} toggleTheme={props.toggleTheme}>
      <Game />
    </PageLayout>
  );
};

export default PlayerPage;
