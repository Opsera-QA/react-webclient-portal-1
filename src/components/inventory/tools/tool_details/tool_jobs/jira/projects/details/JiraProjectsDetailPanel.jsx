import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import JiraToolProjectEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/JiraToolProjectEditorPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import JiraProjectSummaryPanel
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/JiraProjectSummaryPanel";
import modelHelpers from "components/common/model/modelHelpers";
import jiraConfigurationMetadata
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/configuration/jiraConfigurationMetadata";

function JiraProjectsDetailPanel({ toolData, setToolData, jiraProjectData, setJiraProjectData }) {
  const [activeTab, setTabSelection] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setTabSelection(activeTab);
  };

  const getJiraConfigurationData = () => {
    return modelHelpers.getToolConfigurationModel(jiraProjectData.getData("configuration"), jiraConfigurationMetadata);
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <JiraProjectSummaryPanel
            jiraProjectData={jiraProjectData}
            jiraConfigurationData={getJiraConfigurationData()}
            setActiveTab={handleTabClick}
          />
        );
      case "settings":
        return (
          <JiraToolProjectEditorPanel
            toolData={toolData}
            activeTab={activeTab}
            setJiraProjectData={setJiraProjectData}
            jiraProjectData={jiraProjectData}
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

  return (
    <DetailTabPanelContainer
      detailView={getCurrentView()}
      tabContainer={getTabContainer()}
    />
    );
}

JiraProjectsDetailPanel.propTypes = {
  toolData: PropTypes.object,
  setToolData: PropTypes.func,
  jiraProjectData: PropTypes.object,
  setJiraProjectData: PropTypes.func,
};

export default JiraProjectsDetailPanel;


