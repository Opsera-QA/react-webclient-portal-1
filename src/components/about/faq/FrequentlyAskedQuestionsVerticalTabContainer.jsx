import React, {useState} from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import {faClipboardList, faDraftingCompass, faQuestion} from "@fortawesome/pro-light-svg-icons";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import PipelinesFrequentlyAskedQuestions from "components/about/faq/PipelinesFrequentlyAskedQuestions";

function FrequentlyAskedQuestionsVerticalTabContainer() {
  const [activeTab, setActiveTab] = useState("pipelines");

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer
        className={"h-100 w-100"}
      >
        <div className={"tab-tree"}>
          <VanitySetVerticalTab
            tabText={"Welcome"}
            tabName={"welcome"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          <VanitySetVerticalTab
            tabText={"Pipelines"}
            tabName={"pipelines"}
            icon={faDraftingCompass}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
          <VanitySetVerticalTab
            tabText={"Tool Registry"}
            tabName={"toolRegistry"}
            icon={faClipboardList}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
        </div>
      </VanitySetVerticalTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "pipelines":
        return (
          <PipelinesFrequentlyAskedQuestions />
        );
    }
  };

  return (
    <VanitySetTabAndViewContainer
      icon={faQuestion}
      title={`Frequently Asked Questions`}
      verticalTabContainer={getVerticalTabContainer()}
      bodyClassName={"mx-0"}
      currentView={getCurrentView()}
    />
  );
}

FrequentlyAskedQuestionsVerticalTabContainer.propTypes = {};

export default FrequentlyAskedQuestionsVerticalTabContainer;