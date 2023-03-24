import React, { useState } from "react";
import PropTypes from "prop-types";
import UserEditorPanel from "components/settings/users/details/UserEditorPanel";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";
import SummaryTab from "../../../common/tabs/detail_view/SummaryTab";
import UserSummaryPanel from "components/settings/users/details/UserSummaryPanel";
import DetailTabPanelContainer from "../../../common/panels/detail_view/DetailTabPanelContainer";
import SettingsTab from "../../../common/tabs/detail_view/SettingsTab";
import UserAssignedRolesPanel from "components/settings/users/details/assigned_roles/UserAssignedRolesPanel";
import {faIdCard} from "@fortawesome/pro-light-svg-icons";
import CustomTab from "components/common/tabs/CustomTab";

function UserDetailPanel({ ldapUserData, setLdapUserData, orgDomain, authorizedActions, hideSettings }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} disabled={hideSettings} />
        <CustomTab
          icon={faIdCard}
          tabName={"assigned-roles"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Assigned Role Access"}
        />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <UserSummaryPanel ldapUserData={ldapUserData} setActiveTab={!hideSettings ? setActiveTab : null} />;
      case "settings":
        return <UserEditorPanel setLdapUserData={setLdapUserData} authorizedActions={authorizedActions} ldapUserData={ldapUserData} orgDomain={orgDomain} handleClose={toggleSummaryPanel} />;
      case "assigned-roles":
        return (
          <UserAssignedRolesPanel
            userModel={ldapUserData}
          />
        );
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

UserDetailPanel.propTypes = {
  ldapUserData: PropTypes.object,
  setLdapUserData: PropTypes.func,
  hideSettings: PropTypes.bool,
  orgDomain: PropTypes.string,
  authorizedActions: PropTypes.array
};

export default UserDetailPanel;


