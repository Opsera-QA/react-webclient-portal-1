import React, { useState } from "react";
import PropTypes from "prop-types";
import PipelineStepConfigurationSummary from "./PipelineStepConfigurationSummary";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import JsonTab from "components/common/tabs/detail_view/JsonTab";
import PipelineStepJsonPanel from "./PipelineStepJsonPanel";
import ModalTabPanelContainer from "components/common/panels/detail_view/ModalTabPanelContainer";


function PipelineStepTabPanel({ pipelineStepData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getActionSpecificTab = () => {
    // TODO: Make switch statement if a handful are added
    // if (pipelineStepData.action === "console output") {
    //   return (<ConsoleLogTab activeTab={activeTab} handleTabClick={handleTabClick} />);
    // }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        {/*{getActionSpecificTab()}*/}
        <JsonTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <PipelineStepConfigurationSummary pipelineData={pipelineStepData} />;
      case "json":
        return <PipelineStepJsonPanel pipelineStepData={pipelineStepData} />;
      default:
        return null;
    }
  };

  return (<ModalTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

PipelineStepTabPanel.propTypes = {
  pipelineStepData: PropTypes.object,
};

export default PipelineStepTabPanel;


