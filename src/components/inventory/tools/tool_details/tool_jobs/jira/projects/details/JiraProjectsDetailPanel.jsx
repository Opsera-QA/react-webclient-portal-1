import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import JiraProjectEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/JiraProjectEditorPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import JiraProjectSummaryPanel
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/JiraProjectSummaryPanel";

function JiraProjectsDetailPanel({ toolData, setToolData, jiraProjectData, setJiraProjectData }) {
  const [activeTab, setTabSelection] = useState("settings");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setTabSelection(activeTab);
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <JiraProjectSummaryPanel jiraProjectData={jiraProjectData} setActiveTab={handleTabClick} />
      case "settings":
        return <JiraProjectEditorPanel toolData={toolData} activeTab={activeTab} setJiraProjectData={setJiraProjectData} jiraProjectData={jiraProjectData} />;
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

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

JiraProjectsDetailPanel.propTypes = {
  toolData: PropTypes.object,
  jiraProjectData: PropTypes.object,
  setJiraProjectData: PropTypes.func,
};

export default JiraProjectsDetailPanel;


