import React from "react";
import {useHistory} from "react-router-dom";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faArrowLeft, faFolderGear} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import {adminToolsTrails} from "components/admin/adminTools.trails";

export default function OrganizationSettingsManagementSubNavigationBar({activeTab}) {
  const history = useHistory();

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();

    switch (tabSelection) {
      case "adminTools":
        history.push(`/admin`);
        return;
      case adminToolsTrails.ldapOrganizationSettingsManagement.name:
        history.push(`/admin/organization-settings`);
        return;
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
        icon={faFolderGear}
        tabName={adminToolsTrails.ldapOrganizationSettingsManagement.name}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Organization Settings Manager"}
      />
      <NavigationTab
        icon={faFolderGear}
        tabName={"ldapOrganizationSettingsViewer"}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        tabText={"Organization Settings Viewer"}
        visible={activeTab === "ldapOrganizationSettingsViewer"}
      />
    </NavigationTabContainer>
  );
}

OrganizationSettingsManagementSubNavigationBar.propTypes = {
  activeTab: PropTypes.string,
};
