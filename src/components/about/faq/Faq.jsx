import React, {useContext} from "react";
import faq from 'markdown/faq/faq.md';
import pipelineFaq from 'markdown/faq/pipelines/pipelines.faq.md';
import ReactMarkdownWrapper from "components/common/markdown/ReactMarkdownWrapper";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {AuthContext} from "contexts/AuthContext";
import FrequentlyAskedQuestionsVerticalTabContainer
  from "components/about/faq/FrequentlyAskedQuestionsVerticalTabContainer";

const Faq = () => {
  const { featureFlagHideItemInProd } = useContext(AuthContext);

  if (featureFlagHideItemInProd() !== false) {
    return null;
  }

  return (
    <ScreenContainer
      // navigationTabContainer={<ReportsSubNavigationBar currentTab={"all"} />}
      breadcrumbDestination={"frequentlyAskedQuestions"}
    >
      {/*<div className={"m-3"}>*/}
      {/*  <FrequentlyAskedQuestionsVerticalTabContainer*/}

      {/*  />*/}
      {/*</div>*/}
      <ReactMarkdownWrapper
        markdownFile={faq}
        className={"m-4"}
      />
      {/*<ReactMarkdownWrapper*/}
      {/*  markdownFile={pipelineFaq}*/}
      {/*  className={"m-4"}*/}
      {/*/>*/}
    </ScreenContainer>
  );
};


export default Faq;