import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import TaskEditorPanel from "components/tasks/details/TaskEditorPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faTable, faKey, faComputerClassic} from "@fortawesome/pro-light-svg-icons";
import TaskSummaryPanel
  from "components/tasks/details/TaskSummaryPanel";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import TaskActivityPanel from "components/tasks/activity_logs/TaskActivityPanel";
import { AuthContext } from "contexts/AuthContext";
import {useParams} from "react-router-dom";

const getActiveTab = (runTask, tab) => {
  if (tab === "logs") {
    return "logs";
  }

  if (runTask) {
    return "settings";
  }

  return "summary";
};

function TaskDetailPanel(
  {
    gitTasksData,
    setGitTasksData,
    loadData,
    accessRoleData,
    runTask,
    status,
    runCount,
    taskStartTime,
  }) {
  const {featureFlagHideItemInProd} = useContext(AuthContext);
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState(getActiveTab(runTask, tab));

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
    loadData();
  };

  const getFeatureFlaggedTab = () => {
    if (featureFlagHideItemInProd() === false) {
      return (
        <CustomTab
          icon={faComputerClassic}
          tabName={"audit-logs"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Audit Logs"}
        />
      );
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryToggleTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
        <CustomTab
          icon={faTable}
          tabName={"logs"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Activity Logs"}
        />
        {/*{getFeatureFlaggedTab()}*/}
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
            status={status}
            runCount={runCount}
            taskStartTime={taskStartTime}
          />
        );
      case "settings":
        return (
          <TaskEditorPanel
            handleClose={toggleSummaryPanel}
            taskData={gitTasksData}
            setGitTasksData={setGitTasksData}
            loadData={loadData}
            runTask={runTask}
          />
        );
      case "logs":
        return (
          <TaskActivityPanel
            taskModel={gitTasksData}
            taskId={gitTasksData?.getMongoDbId()}
            taskRunCount={runCount}
            status={status}
          />
        );
      // case "audit-logs":
      //   return (
      //     <TaskAuditLogPanel
      //       taskId={gitTasksData?.getMongoDbId()}
      //     />
      //   );
      default:
        return null;
    }
  };

  return (
    <DetailTabPanelContainer
      detailView={getCurrentView()}
      tabContainer={getTabContainer()}
    />
  );
}

TaskDetailPanel.propTypes = {
  gitTasksData: PropTypes.object,
  setGitTasksData: PropTypes.func,
  loadData: PropTypes.func,
  accessRoleData: PropTypes.object,
  runTask: PropTypes.bool,
  status: PropTypes.string,
  runCount: PropTypes.number,
  taskStartTime: PropTypes.string,
};

export default TaskDetailPanel;


