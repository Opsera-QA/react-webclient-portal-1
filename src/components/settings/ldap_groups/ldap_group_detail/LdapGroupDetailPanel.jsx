import React, {useState} from "react";

import PropTypes from "prop-types";
import LdapGroupEditorPanel from "./LdapGroupEditorPanel";
import LdapGroupManagePanel from "./LdapGroupManagePanel";
import LdapUsersTable from "../../ldap_users/LdapUsersTable";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../common/tabs/CustomTab";
import {faIdCard, faUsers} from "@fortawesome/pro-light-svg-icons";
import SummaryTab from "../../../common/tabs/detail_view/SummaryTab";
import DetailTabPanelContainer from "../../../common/panels/detail_view/DetailTabPanelContainer";
import LdapGroupSummaryPanel from "./LdapGroupSummaryPanel";
import SettingsTab from "../../../common/tabs/detail_view/SettingsTab";

function LdapGroupDetailPanel(
  {
    currentUserEmail,
    ldapGroupData,
    setLdapGroupData,
    ldapOrganizationData,
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
        return (<LdapGroupManagePanel ldapGroupData={ldapGroupData.data} authorizedActions={authorizedActions} ldapOrganizationData={ldapOrganizationData} loadData={loadData}/>);
      case "settings":
        return <LdapGroupEditorPanel currentUserEmail={currentUserEmail} authorizedActions={authorizedActions} setLdapGroupData={setLdapGroupData} ldapGroupData={ldapGroupData} ldapOrganizationData={ldapOrganizationData} />;
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

LdapGroupDetailPanel.propTypes = {
  ldapGroupData: PropTypes.object,
  setLdapGroupData: PropTypes.func,
  ldapOrganizationData: PropTypes.object,
  orgDomain: PropTypes.string,
  currentUserEmail: PropTypes.string,
  loadData: PropTypes.func,
  authorizedActions: PropTypes.array,
};

export default LdapGroupDetailPanel;


