import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "../../../../common/tabs/CustomTabContainer";
import SummaryTab from "../../../../common/tabs/detail_view/SummaryTab";
import JsonTab from "../../../../common/tabs/detail_view/JsonTab";
import PipelineTaskJsonPanel from "./PipelineTaskJsonPanel";
import PipelineTaskSummaryPanel from "./PipelineTaskSummaryPanel";
import ModalTabPanelContainer from "../../../../common/panels/detail_view/ModalTabPanelContainer";


function PipelineTaskTabPanel({ pipelineTaskData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <JsonTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <PipelineTaskSummaryPanel pipelineTaskData={pipelineTaskData} />;
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


