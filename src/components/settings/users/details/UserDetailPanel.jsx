import React, { useState } from "react";
import PropTypes from "prop-types";
import UserEditorPanel from "components/settings/users/details/UserEditorPanel";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";
import SummaryTab from "../../../common/tabs/detail_view/SummaryTab";
import UserSummaryPanel from "components/settings/users/details/UserSummaryPanel";
import DetailTabPanelContainer from "../../../common/panels/detail_view/DetailTabPanelContainer";
import UserAssignedRolesPanel from "components/settings/users/details/assigned_roles/UserAssignedRolesPanel";
import {faIdCard, faTable} from "@fortawesome/pro-light-svg-icons";
import CustomTab from "components/common/tabs/CustomTab";
import UserAccessTokenActivityLogPanel from "components/settings/users/details/UserAccessTokenActivityLogPanel";
import useComponentStateReference from "hooks/useComponentStateReference";

function UserDetailPanel({ ldapUserData, setLdapUserData, orgDomain, hideSettings }) {
  const [activeTab, setActiveTab] = useState("summary");
  const {
    isSiteAdministrator,
    userData,
  } = useComponentStateReference();

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
        {/*<SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} disabled={hideSettings} />*/}
        <CustomTab
          icon={faIdCard}
          tabName={"assigned-roles"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Assigned Role Access"}
        />
        <CustomTab
          icon={faTable}
          tabName={"access-token-activity-logs"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Access Token Activity Logs"}
          visible={isSiteAdministrator === true || userData?._id === ldapUserData?.getData("_id")}
        />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <UserSummaryPanel
            ldapUserData={ldapUserData}
          />
        );
      case "settings":
        return (
          <UserEditorPanel
            // organization={}
            userData={ldapUserData}
            orgDomain={orgDomain}
            handleClose={toggleSummaryPanel}
          />
        );
      case "assigned-roles":
        return (
          <UserAssignedRolesPanel
            userEmailAddress={ldapUserData?.getData("emailAddress")}
          />
        );
      case "access-token-activity-logs":
        return (
          <UserAccessTokenActivityLogPanel
            userId={ldapUserData?.getData("_id")}
            className={"mt-2"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DetailTabPanelContainer
      detailView={getCurrentView()}
      tabContainer={getTabContainer()}
    />
  );
}

UserDetailPanel.propTypes = {
  ldapUserData: PropTypes.object,
  setLdapUserData: PropTypes.func,
  hideSettings: PropTypes.bool,
  orgDomain: PropTypes.string,
};

export default UserDetailPanel;


