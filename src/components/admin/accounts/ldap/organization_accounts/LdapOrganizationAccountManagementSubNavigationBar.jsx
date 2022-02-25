import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft, faSitemap, faUsers} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";

function LdapOrganizationAccountManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "adminTools":
        history.push(`/admin`);
        return;
      case "organizations":
        history.push(`/admin/organizations`);
        return;
    }
  };

  const getActiveViewerTab = () => {
    switch (activeTab) {
      case "organizationAccountViewer":
        return (
          <NavigationTab
            icon={faUsers}
            tabName={"organizationAccountViewer"}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
            tabText={"Organization Account Viewer"}
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
        icon={faSitemap}
        tabName={"organizations"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Organizations"}
      />
      {getActiveViewerTab()}
    </NavigationTabContainer>
  );
}

LdapOrganizationAccountManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};

export default LdapOrganizationAccountManagementSubNavigationBar;
