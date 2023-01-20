import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faBuilding } from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import AccountSettingsSubNavigationBarBase from "components/settings/AccountSettingsSubNavigationBarBase";

function LdapDepartmentManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    if (activeTab === tabSelection) {
      return;
    }

    switch (tabSelection) {
      case "departments":
        history.push(`/settings/departments`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "departmentViewer":
        return (
          <NavigationTab
            icon={faBuilding}
            tabName={"departmentViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Department Viewer"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <NavigationTabContainer>
      <AccountSettingsSubNavigationBarBase
        activeTab={activeTab}
      />
      <NavigationTab
        icon={faBuilding}
        tabName={"departments"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Departments"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

LdapDepartmentManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default LdapDepartmentManagementSubNavigationBar;
