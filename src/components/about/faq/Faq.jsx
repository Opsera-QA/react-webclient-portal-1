import React, {useContext} from "react";
import faq from 'markdown/faq/faq.md';
import ReactMarkdownWrapper from "components/common/markdown/ReactMarkdownWrapper";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {AuthContext} from "contexts/AuthContext";

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
      <ReactMarkdownWrapper
        markdownFile={faq}
        className={"m-4"}
      />
    </ScreenContainer>
  );
};


export default Faq;