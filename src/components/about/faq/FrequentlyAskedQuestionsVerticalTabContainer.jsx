import React, {useState} from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import { faChartNetwork, faClipboardList, faDraftingCompass, faQuestion } from "@fortawesome/pro-light-svg-icons";
import PipelinesFrequentlyAskedQuestions from "components/about/faq/PipelinesFrequentlyAskedQuestions";
import InsightsFrequentlyAskedQuestions from "./InsightsFrequentlyAskedQuestions";
import ToolRegistryFrequentlyAskedQuestions from "./ToolRegistryFrequentlyAskedQuestions";
import GeneralFrequentlyAskedQuestions from "./GeneralFrequentlyAskedQuestions";
import TabAndViewContainer from "components/common/tabs/tree/TabAndViewContainer";
import { screenContainerHeights } from "components/common/panels/general/screenContainer.heights";

const FAQ_HEIGHT = `calc(${screenContainerHeights.SCREEN_CONTAINER_HEIGHT} - 72px)`;

function FrequentlyAskedQuestionsVerticalTabContainer() {
  const [activeTab, setActiveTab] = useState("general");

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer>
        <div className={"tab-tree"}>
          <VanitySetVerticalTab
            tabText={"General"}
            tabName={"general"}
            icon={faQuestion}
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
            tabText={"Insights"}
            tabName={"insights"}
            icon={faChartNetwork}
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
          <VanitySetVerticalTab
            tabText={"General FAQs"}
            tabName={"general"}
            icon={faQuestion}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
          />
        </div>
      </VanitySetVerticalTabContainer>
    );
  };

  const getCurrentScreen = () => {
    switch (activeTab) {
      case "general":
        return (
          <GeneralFrequentlyAskedQuestions />
        );
      case "insights":
        return (
          <InsightsFrequentlyAskedQuestions />
        );
      case "toolRegistry":
        return (
          <ToolRegistryFrequentlyAskedQuestions />
        );
      case "pipelines":
        return (
          <PipelinesFrequentlyAskedQuestions />
        );
    }
  };

  const getCurrentView = () => {
    return (
      <div>
        <div className={"mt-3 ml-4"}>
          <div><>This page provides help with our most frequently asked questions. To view questions, expand a topic below. For more information, visit <b><a href="https://docs.opsera.io/" target="_blank" rel="noreferrer">Opsera&rsquo;s Help Documentation</a>.</b></></div>
          <div><>Have a question? Contact <b><a id="mailto" href="mailto:support@opsera.io" target="_blank" rel="noreferrer">Opsera Support</a></b>.</></div>
        </div>
        {getCurrentScreen()}
      </div>
    );
  };

  return (
    <TabAndViewContainer
      minimumHeight={FAQ_HEIGHT}
      verticalTabContainer={getVerticalTabContainer()}
      currentView={getCurrentView()}
    />
  );
}

FrequentlyAskedQuestionsVerticalTabContainer.propTypes = {};

export default FrequentlyAskedQuestionsVerticalTabContainer;