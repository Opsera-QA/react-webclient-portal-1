import React, { useState } from "react";

import PropTypes from "prop-types";
import GitTaskEditorPanel from "./GitTaskEditorPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faTable} from "@fortawesome/pro-light-svg-icons";
import GitTaskSummaryPanel
  from "components/git/git_task_details/GitTaskSummaryPanel";
import GitTasksActivityLogsTable
  from "components/git/git_task_details/activity_logs/GitTasksActivityLogsTable";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";

function GitTaskDetailPanel({ gitTasksData, setGitTasksData, loadData, isLoading, runTask }) {
  const [activeTab, setActiveTab] = useState(runTask ? "settings" : "summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryToggleTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab icon={faTable} tabName={"logs"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Activity Logs"}/>
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <GitTaskSummaryPanel
            gitTasksData={gitTasksData}
            setActiveTab={setActiveTab}
            setGitTasksData={setGitTasksData}
            loadData={loadData}
          />
        );
      case "settings":
        return (
          <GitTaskEditorPanel
            handleClose={toggleSummaryPanel}
            gitTasksData={gitTasksData}
            setGitTasksData={setGitTasksData}
            loadData={loadData}
            runTask={runTask}
          />
        );
      case "logs":
        return (
          <DetailPanelContainer>
            <GitTasksActivityLogsTable
              gitTasksData={gitTasksData}
              setGitTasksData={setGitTasksData}
              loadData={loadData}
              allLogs={false}
            />
          </DetailPanelContainer>
        );
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

GitTaskDetailPanel.propTypes = {
  gitTasksData: PropTypes.object,
  setGitTasksData: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  runTask: PropTypes.bool,
};

export default GitTaskDetailPanel;


