import React, {useState} from "react";

import PropTypes from "prop-types";
import LdapGroupEditorPanel from "./LdapGroupEditorPanel";
import {faIdCard} from "@fortawesome/pro-light-svg-icons";
import LdapGroupSummaryPanel from "./LdapGroupSummaryPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import LdapGroupMembershipManagementPanel
  from "components/settings/ldap_groups/details/membership_manager/LdapGroupMembershipManagementPanel";

function LdapGroupDetailPanel({currentUserEmail, ldapGroupData, setLdapGroupData, ldapUsers, orgDomain, loadData, authorizedActions }) {
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
        <SummaryToggleTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab
          icon={faIdCard}
          tabName={"manage"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Manage Members"}
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
            setActiveTab={setActiveTab}
            loadData={loadData}
          />
        );
      case "manage":
        return (
          <LdapGroupMembershipManagementPanel
            orgDomain={orgDomain}
            setActiveTab={setActiveTab}
            ldapGroupData={ldapGroupData}
            authorizedActions={authorizedActions}
            ldapUsers={ldapUsers}
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
  ldapUsers: PropTypes.array,
  orgDomain: PropTypes.string,
  currentUserEmail: PropTypes.string,
  loadData: PropTypes.func,
  authorizedActions: PropTypes.array,
};

export default LdapGroupDetailPanel;


