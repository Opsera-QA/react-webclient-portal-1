import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faClipboardList, faTasks} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function TasksSubNavigationBar({currentTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "tasks":
        history.push(`/task`);
        return;
      case "activity":
        history.push(`/task/activity`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (currentTab) {
      case "taskViewer":
        return (
          <NavigationTab
            icon={faTasks}
            tabName={currentTab}
            handleTabClick={handleTabClick}
            activeTab={"taskViewer"}
            tabText={"Task Viewer"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <NavigationTabContainer>
      <NavigationTab tabName={"tasks"} icon={faTasks} tabText={"Opsera Tasks"} handleTabClick={handleTabClick} activeTab={currentTab} />
      <NavigationTab tabName={"activity"} icon={faClipboardList} tabText={"Activity Logs"} handleTabClick={handleTabClick} activeTab={currentTab} />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

TasksSubNavigationBar.propTypes = {
  currentTab: PropTypes.string,
};

export default TasksSubNavigationBar;
