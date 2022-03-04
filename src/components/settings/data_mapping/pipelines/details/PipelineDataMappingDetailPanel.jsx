import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import PipelineDataMappingSummaryPanel
  from "components/settings/data_mapping/pipelines/details/PipelineDataMappingSummaryPanel";
import PipelineDataMappingEditorPanel
  from "components/settings/data_mapping/pipelines/details/PipelineDataMappingEditorPanel";

function PipelineDataMappingDetailPanel(
  {
    pipelineDataMappingModel,
    setPipelineDataMappingModel,
  }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => (e) => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <PipelineDataMappingSummaryPanel
            pipelineDataMappingModel={pipelineDataMappingModel}
            setActiveTab={setActiveTab}
          />
        );
      case "settings":
        return (
          <PipelineDataMappingEditorPanel
            pipelineDataMappingModel={pipelineDataMappingModel}
            setPipelineDataMappingModel={setPipelineDataMappingModel}
            handleClose={toggleSummaryPanel}
          />
        );
      default:
        return null;
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  };

  return <DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />;
}

PipelineDataMappingDetailPanel.propTypes = {
  pipelineDataMappingModel: PropTypes.object,
  setPipelineDataMappingModel: PropTypes.func,
};

export default PipelineDataMappingDetailPanel;
