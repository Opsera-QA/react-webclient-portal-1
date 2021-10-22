import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft, faBuilding} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function LdapDepartmentManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "accountSettings":
        history.push(`/settings`);
        return;
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
      <NavigationTab
        icon={faArrowLeft}
        tabName={"accountSettings"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Back to Account Settings"}
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
