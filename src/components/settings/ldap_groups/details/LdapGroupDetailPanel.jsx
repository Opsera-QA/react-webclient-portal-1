import React, {useState} from "react";

import PropTypes from "prop-types";
import LdapGroupEditorPanel from "./LdapGroupEditorPanel";
import { faIdCard, faIdCardAlt } from "@fortawesome/pro-light-svg-icons";
import LdapGroupSummaryPanel from "./LdapGroupSummaryPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import LdapGroupMembershipManagementPanel
  from "components/common/inputs/user/membership/manager/LdapGroupMembershipManagementPanel";
import LdapGroupAssignedRolesPanel from "components/settings/ldap_groups/details/roles/LdapGroupAssignedRolesPanel";

function LdapGroupDetailPanel(
  {
    currentUserEmail,
    ldapGroupData,
    setLdapGroupData,
    orgDomain,
    loadData,
    authorizedActions,
    isLoading,
  }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    if (activeTab) {
      setActiveTab(activeTab);
    }
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryToggleTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
        <CustomTab
          icon={faIdCardAlt}
          tabName={"manage"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Manage Members"}
        />
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
        return (
          <LdapGroupSummaryPanel
            ldapGroupData={ldapGroupData}
            domain={orgDomain}
            loadData={loadData}
            isLoading={isLoading}
          />
        );
      case "manage":
        return (
          <LdapGroupMembershipManagementPanel
            orgDomain={orgDomain}
            setActiveTab={setActiveTab}
            ldapGroupData={ldapGroupData}
            authorizedActions={authorizedActions}
            loadData={loadData}
          />
          );
      case "settings":
        return (
          <LdapGroupEditorPanel
            handleClose={toggleSummaryPanel}
            currentUserEmail={currentUserEmail}
            authorizedActions={authorizedActions}
            setLdapGroupData={setLdapGroupData}
            ldapGroupData={ldapGroupData}
            orgDomain={orgDomain}
          />
        );
      case "assigned-roles":
        return (
          <LdapGroupAssignedRolesPanel
            groupModel={ldapGroupData}
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

LdapGroupDetailPanel.propTypes = {
  ldapGroupData: PropTypes.object,
  setLdapGroupData: PropTypes.func,
  orgDomain: PropTypes.string,
  currentUserEmail: PropTypes.string,
  loadData: PropTypes.func,
  authorizedActions: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default LdapGroupDetailPanel;


