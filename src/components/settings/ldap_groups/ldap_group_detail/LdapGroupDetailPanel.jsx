import React, {useState} from "react";

import PropTypes from "prop-types";
import LdapGroupEditorPanel from "./LdapGroupEditorPanel";
import LdapGroupMembershipManagementPanel from "./LdapGroupMembershipManagementPanel";
import {faIdCard, faUsers} from "@fortawesome/pro-light-svg-icons";
import LdapGroupSummaryPanel from "./LdapGroupSummaryPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import CustomTab from "components/common/tabs/CustomTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import LdapUsersTable from "components/settings/ldap_users/LdapUsersTable";

function LdapGroupDetailPanel(
  {
    currentUserEmail,
    ldapGroupData,
    setLdapGroupData,
    ldapUsers,
    orgDomain,
    loadData,
    authorizedActions,
  }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    if (activeTab) {
      setActiveTab(activeTab);
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab icon={faUsers} tabName={"membership"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Current Members"} />
        <CustomTab icon={faIdCard} tabName={"manage"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Manage Members"} />
        <SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <LdapGroupSummaryPanel ldapGroupData={ldapGroupData} domain={orgDomain} setActiveTab={setActiveTab} />;
      case "membership":
        return (<div className="px-3 pt-2 pb-3"><LdapUsersTable orgDomain={orgDomain} userData={ldapGroupData.members} /></div>);
      case "manage":
        return (<LdapGroupMembershipManagementPanel orgDomain={orgDomain} setActiveTab={setActiveTab} ldapGroupData={ldapGroupData.data} authorizedActions={authorizedActions} ldapUsers={ldapUsers} loadData={loadData}/>);
      case "settings":
        return <LdapGroupEditorPanel currentUserEmail={currentUserEmail} authorizedActions={authorizedActions} setLdapGroupData={setLdapGroupData} ldapGroupData={ldapGroupData} orgDomain={orgDomain} />;
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
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


