import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft, faStream} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

export default function FreeTrialWorkspaceManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "adminTools":
        history.push(`/admin`);
        return;
      case "freeTrialCustomerWorkspaceManagement":
        history.push(`/admin/customer/workspaces`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "freeTrialCustomerWorkspaceViewer":
        return (
          <NavigationTab
            icon={faStream}
            tabName={"freeTrialCustomerWorkspaceViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Free Trial Customer Workspace Viewer"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <NavigationTabContainer>
      <NavigationTab
        icon={faArrowLeft}
        tabName={"adminTools"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Back to Admin Tools"}
      />
      <NavigationTab
        icon={faStream}
        tabName={"freeTrialCustomerWorkspaceManagement"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Free Trial Customer Workspace Manager"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

FreeTrialWorkspaceManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};
