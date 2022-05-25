import React, {useContext} from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {AuthContext} from "contexts/AuthContext";
import FrequentlyAskedQuestionsVerticalTabContainer
  from "components/about/faq/FrequentlyAskedQuestionsVerticalTabContainer";
import FaqSubNavigationBar from "components/about/faq/FaqSubNavigationBar";

const Faq = () => {
  const { featureFlagHideItemInProd } = useContext(AuthContext);

  if (featureFlagHideItemInProd() !== false) {
    return null;
  }

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