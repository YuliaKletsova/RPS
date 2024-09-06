import {GameCards} from "@/components/GameCard";
import {PageLayout} from "@/components/PageLayout";

const PlayerPage = (props: any) => {
  return (
    <PageLayout theme={props.theme} toggleTheme={props.toggleTheme}>
        <GameCards />
    </PageLayout>
  );
};

export default PlayerPage;
