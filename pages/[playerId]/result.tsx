import {PageLayout} from "@/components/PageLayout";
import {ResultContent} from "@/components/ResultContent";

const Result = (props: any) => {

  return (
    <PageLayout theme={props.theme} toggleTheme={props.toggleTheme}>
        <ResultContent />
    </PageLayout>
  );
};

export default Result;
