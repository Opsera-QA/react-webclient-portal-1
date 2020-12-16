import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "../../../../common/tabs/CustomTabContainer";
import SummaryTab from "../../../../common/tabs/detail_view/SummaryTab";
import JsonTab from "../../../../common/tabs/detail_view/JsonTab";
import PipelineTaskJsonPanel from "./PipelineTaskJsonPanel";
import PipelineTaskSummaryPanel from "./PipelineTaskSummaryPanel";
import ModalTabPanelContainer from "../../../../common/panels/detail_view/ModalTabPanelContainer";
import PipelineTaskConsoleLogPanel from "./PipelineTaskConsoleLogPanel";
import ConsoleLogTab from "../../../../common/tabs/detail_view/ConsoleLogTab";


function PipelineTaskTabPanel({ pipelineTaskData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getActionSpecificTab = () => {
    // TODO: Make switch statement if a handful are added
    if (pipelineTaskData.action === "console output") {
      return (<ConsoleLogTab activeTab={activeTab} handleTabClick={handleTabClick} />);
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        {getActionSpecificTab()}
        <JsonTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <PipelineTaskSummaryPanel pipelineTaskData={pipelineTaskData} />;
      case "log":
        return <PipelineTaskConsoleLogPanel pipelineTaskData={pipelineTaskData} />;
      case "json":
        return <PipelineTaskJsonPanel pipelineTaskData={pipelineTaskData} />;
      default:
        return null;
    }
  };

  return (<ModalTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

PipelineTaskTabPanel.propTypes = {
  pipelineData: PropTypes.object,
  pipelineTaskData: PropTypes.object,
};

export default PipelineTaskTabPanel;


