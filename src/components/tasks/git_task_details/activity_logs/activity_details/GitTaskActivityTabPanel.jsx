import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTabContainer from "../../../../common/tabs/CustomTabContainer";
import SummaryTab from "../../../../common/tabs/detail_view/SummaryTab";
import JsonTab from "../../../../common/tabs/detail_view/JsonTab";
import Model from "core/data_model/model";
import ModalTabPanelContainer from "../../../../common/panels/detail_view/ModalTabPanelContainer";
import ConsoleLogTab from "../../../../common/tabs/detail_view/ConsoleLogTab";
import GitTaskActivitySummaryPanel from "./GitTaskActivitySummaryPanel";
import gitTasksActivityLogMetadata
  from "components/tasks/git_task_details/activity_logs/git-tasks-activity-log-metadata";
import GitTaskActivityConsoleLogPanel from "./GitTaskConsoleLogPanel";
import GitTaskActivityJsonPanel from "./GitTaskActivityJsonPanel";


function GitTaskTaskActivityTabPanel({ gitTaskActivityData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const wrapObject = (metaData) => {
    return new Model(gitTaskActivityData, metaData, false);
  };

  const getActionSpecificTab = () => {
    // TODO: Make switch statement if a handful are added
    if (gitTaskActivityData.log_type === "console log") {
      return (<ConsoleLogTab activeTab={activeTab} handleTabClick={handleTabClick} />);
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
        return <GitTaskActivitySummaryPanel gitTaskActivityData={wrapObject(gitTasksActivityLogMetadata)} />;
      case "log":
        return <GitTaskActivityConsoleLogPanel gitTaskActivityData={gitTaskActivityData} />;
      case "json":
        return <GitTaskActivityJsonPanel gitTaskActivityData={gitTaskActivityData} />;
      default:
        return null;
    }
  };

  return (<ModalTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

GitTaskTaskActivityTabPanel.propTypes = {
  gitTaskActivityData: PropTypes.object,
};

export default GitTaskTaskActivityTabPanel;


