import React, { useState } from "react";
import PropTypes from "prop-types";

import ProjectDataMappingEditorPanel from "components/settings/data_mapping/projects/details/ProjectDataMappingEditorPanel";
import ProjectMappingSummaryPanel from "components/settings/data_mapping/projects/details/ProjectDataMappingSummaryPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";

function ProjectDataMappingDetailPanel(
  {
    projectDataMappingModel,
    setProjectDataMappingModel,
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
          <ProjectMappingSummaryPanel
            projectDataMappingModel={projectDataMappingModel}
            setActiveTab={setActiveTab}
          />
        );
      case "settings":
        return (
          <ProjectDataMappingEditorPanel
            projectDataMappingModel={projectDataMappingModel}
            setProjectDataMappingModel={setProjectDataMappingModel}
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

ProjectDataMappingDetailPanel.propTypes = {
  projectDataMappingModel: PropTypes.object,
  setProjectDataMappingModel: PropTypes.func,
};

export default ProjectDataMappingDetailPanel;
