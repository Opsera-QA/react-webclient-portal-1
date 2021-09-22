import React, { useState } from "react";

import PropTypes from "prop-types";
import TaskEditorPanel from "components/tasks/git_task_details/TaskEditorPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faTable, faKey} from "@fortawesome/pro-light-svg-icons";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import CertManagementPanel from "./configuration_forms/sfdx-cert-gen/CertManagementPanel";
import TaskSummaryPanel
  from "components/tasks/git_task_details/TaskSummaryPanel";
import TaskActivityPanel from "components/tasks/activity_logs/TaskActivityPanel";
import {TASK_TYPES} from "components/tasks/task.types";

function TaskDetailPanel({ gitTasksData, setGitTasksData, loadData, accessRoleData, runTask }) {
  const [activeTab, setActiveTab] = useState(runTask ? "settings" : "summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
    loadData();
  };

  const getDynamicTabs = () => {
    switch (gitTasksData?.getData("type")) {
      case TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION:
      return (
        <CustomTab
          icon={faKey}
          tabName={"cert"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Certificate Management"}
        />
      );
      default: return <></>;
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryToggleTab handleTabClick={handleTabClick} activeTab={activeTab} />
        {getDynamicTabs()}
        <CustomTab icon={faTable} tabName={"logs"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Activity Logs"}/>
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <TaskSummaryPanel
            gitTasksData={gitTasksData}
            setActiveTab={setActiveTab}
            accessRoleData={accessRoleData}
            setGitTasksData={setGitTasksData}
            loadData={loadData}
          />
        );
      case "settings":
        return (
          <TaskEditorPanel
            handleClose={toggleSummaryPanel}
            gitTasksData={gitTasksData}
            setGitTasksData={setGitTasksData}
            loadData={loadData}
            runTask={runTask}
          />
        );
      case "logs":
        return (
          <TaskActivityPanel taskName={gitTasksData?.name} />
        );
      case "cert":
        return (
          <CertManagementPanel
            gitTasksData={gitTasksData}
            setGitTasksData={setGitTasksData}
            loadData={loadData}
          />
        );  
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

TaskDetailPanel.propTypes = {
  gitTasksData: PropTypes.object,
  setGitTasksData: PropTypes.func,
  loadData: PropTypes.func,
  accessRoleData: PropTypes.object,
  runTask: PropTypes.bool,
};

export default TaskDetailPanel;


