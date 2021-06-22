import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { faTable, faTasks } from "@fortawesome/pro-light-svg-icons";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import GitTasksView from "./GitTasksView";
import TaskAllActivityPanel from "components/git/git_task_details/activity_logs/TaskAllActivityPanel";

function GitLanding() {
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState(tab ? tab : "tasks");
  
  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab tabName={"tasks"} icon={faTasks} tabText={"Tasks"} handleTabClick={handleTabClick} activeTab={activeTab} />
        <NavigationTab tabName={"activity"} icon={faTable} tabText={"Activity Logs"} handleTabClick={handleTabClick} activeTab={activeTab} />
      </NavigationTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "tasks":
        return <GitTasksView />;
      case "activity":
        return <TaskAllActivityPanel/>;
      default:
        return null;
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"gitTasksManagement"}
      pageDescription={`
        Create and Manage Opsera Related Tasks.
      `}
      navigationTabContainer={getNavigationTabContainer()}
    >
      {getCurrentView()}
    </ScreenContainer>
  );

}

export default GitLanding;