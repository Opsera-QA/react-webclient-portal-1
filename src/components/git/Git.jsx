import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { faTable, faCodeBranch } from "@fortawesome/pro-light-svg-icons";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import GitTasksView from "./GitTasksView";
import GitTasksActivityLogsTable from "./git_task_details/activity_logs/GitTasksActivityLogsTable";

function GitLanding() {
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState(tab ? tab : "gitTasks");
  
  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab tabName={"gitTasks"} icon={faCodeBranch} tabText={"Git Tasks"} handleTabClick={handleTabClick} activeTab={activeTab} />
        <NavigationTab tabName={"activity"} icon={faTable} tabText={"Activity Logs"} handleTabClick={handleTabClick} activeTab={activeTab} />
      </NavigationTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "gitTasks":
        return <GitTasksView />;
      case "activity":
        return <GitTasksActivityLogsTable allLogs={true} />;
      default:
        return null;
    }
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"gitTasksManagement"}
      pageDescription={`
        Create and Manage Git Related Tasks.
      `}
      navigationTabContainer={getNavigationTabContainer()}
    >
      {getCurrentView()}
    </ScreenContainer>
  );

}

export default GitLanding;