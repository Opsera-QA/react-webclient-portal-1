import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import JsonTab from "components/common/tabs/detail_view/JsonTab";
import PipelineTaskJsonPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskJsonPanel";
import PipelineTaskSummaryPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskSummaryPanel";
import ModalTabPanelContainer from "components/common/panels/detail_view/ModalTabPanelContainer";
import PipelineTaskConsoleLogPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskConsoleLogPanel";
import ConsoleLogTab from "components/common/tabs/detail_view/ConsoleLogTab";

function PipelineTaskTabPanel({ pipelineTaskData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getActionSpecificTab = () => {
    switch (pipelineTaskData?.action) {
      case ("console output"):
        return (
          <ConsoleLogTab
            activeTab={activeTab}
            handleTabClick={handleTabClick}
          />
        );
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
        return (
          <PipelineTaskSummaryPanel
            pipelineTaskData={pipelineTaskData}
          />
        );
      case "log":
        return (
          <PipelineTaskConsoleLogPanel
            pipelineTaskData={pipelineTaskData}
          />
        );
      case "json":
        return (
          <PipelineTaskJsonPanel
            pipelineTaskData={pipelineTaskData}
          />
        );
      default:
        return null;
    }
  };

  if (pipelineTaskData == null) {
    return null;
  }

  return (<ModalTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

PipelineTaskTabPanel.propTypes = {
  pipelineData: PropTypes.object,
  pipelineTaskData: PropTypes.object,
};

export default PipelineTaskTabPanel;


