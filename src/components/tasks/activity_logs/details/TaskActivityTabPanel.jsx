import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import JsonTab from "components/common/tabs/detail_view/JsonTab";
import ModalTabPanelContainer from "components/common/panels/detail_view/ModalTabPanelContainer";
import ConsoleLogTab from "components/common/tabs/detail_view/ConsoleLogTab";
import TaskActivitySummaryPanel from "components/tasks/activity_logs/details/TaskActivitySummaryPanel";
import TaskActivityConsoleLogPanel from "components/tasks/activity_logs/details/TaskConsoleLogPanel";
import TaskActivityJsonPanel from "components/tasks/activity_logs/details/TaskActivityJsonPanel";

function TaskActivityTabPanel({ taskActivityLogModel }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getActionSpecificTab = () => {
    // TODO: Make switch statement if a handful are added
    if (taskActivityLogModel?.getData("log_type") === "console log") {
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
          <TaskActivitySummaryPanel
            taskActivityLogModel={taskActivityLogModel}
          />
        );
      case "log":
        return (
          <TaskActivityConsoleLogPanel
            logRecord={taskActivityLogModel?.getPersistData()}
          />
        );
      case "json":
        return (
          <TaskActivityJsonPanel
            gitTaskActivityData={taskActivityLogModel?.getPersistData()}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ModalTabPanelContainer
      detailView={getCurrentView()}
      tabContainer={getTabContainer()}
    />
  );
}

TaskActivityTabPanel.propTypes = {
  taskActivityLogModel: PropTypes.object,
};

export default TaskActivityTabPanel;


