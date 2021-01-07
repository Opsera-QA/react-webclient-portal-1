import React, { useState } from "react";
import PropTypes from "prop-types";

import ProjectMappingEditorPanel from "./ProjectMappingEditorPanel";
import CustomTabContainer from "../../../../common/tabs/CustomTabContainer";
import ProjectMappingSummaryPanel from "./ProjectMappingSummaryPanel";
import DetailTabPanelContainer from "../../../../common/panels/detail_view/DetailTabPanelContainer";
import SummaryTab from "../../../../common/tabs/detail_view/SummaryTab";
import SettingsTab from "../../../../common/tabs/detail_view/SettingsTab";

function ProjectMappingDetailPanel({ projectMappingData, setProjectMappingData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => (e) => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <ProjectMappingSummaryPanel
            projectMappingDto={projectMappingData}
            setProjectMappingData={setProjectMappingData}
            setActiveTab={setActiveTab}
          />
        );
      case "settings":
        return <ProjectMappingEditorPanel toolTypeData={projectMappingData} setToolTypeData={setProjectMappingData} />;
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

ProjectMappingDetailPanel.propTypes = {
  projectMappingData: PropTypes.object,
  setProjectMappingData: PropTypes.func,
};

export default ProjectMappingDetailPanel;
