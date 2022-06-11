import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import FrequentlyAskedQuestionsVerticalTabContainer
  from "components/about/faq/FrequentlyAskedQuestionsVerticalTabContainer";
import FaqSubNavigationBar from "components/about/faq/FaqSubNavigationBar";

const Faq = () => {
  return (
    <ScreenContainer
      navigationTabContainer={<FaqSubNavigationBar currentTab={"all"} />}
      breadcrumbDestination={"frequentlyAskedQuestions"}
      bodyClassName={"mt-0"}
    >
      <FrequentlyAskedQuestionsVerticalTabContainer/>
    </ScreenContainer>
  );
};


export default Faq;