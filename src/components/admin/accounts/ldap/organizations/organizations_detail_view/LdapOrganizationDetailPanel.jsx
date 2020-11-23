import React, {useState} from "react";
import PropTypes from "prop-types";

import LdapOrganizationEditorPanel from "./LdapOrganizationEditorPanel";
import LdapOrganizationAccountsTable from "../../organization_accounts/LdapOrganizationAccountsTable";
import CustomTabContainer from "../../../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../../../common/tabs/CustomTab";
import {faUsers} from "@fortawesome/pro-light-svg-icons";
import DetailTabPanelContainer from "../../../../../common/panels/detail_view/DetailTabPanelContainer";
import LdapOrganizationSummaryPanel from "./LdapOrganizationSummaryPanel";
import SummaryTab from "../../../../../common/tabs/detail_view/SummaryTab";
import SettingsTab from "../../../../../common/tabs/detail_view/SettingsTab";

function LdapOrganizationDetailPanel({ organizationAccounts, ldapOrganizationData, setLdapOrganizationData, loadData, authorizedActions, authorizedOrganizationAccountActions}) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    if (tabSelection) {
      setActiveTab(tabSelection);
    }
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <LdapOrganizationSummaryPanel ldapOrganizationData={ldapOrganizationData} setActiveTab={setActiveTab} />;
      case "accounts":
        return <div className="p-3"><LdapOrganizationAccountsTable ldapOrganizationAccounts={organizationAccounts} authorizedActions={authorizedOrganizationAccountActions} ldapOrganizationData={ldapOrganizationData} loadData={loadData} /></div>
      case "settings":
        return <LdapOrganizationEditorPanel setLdapOrganizationData={setLdapOrganizationData} ldapOrganizationData={ldapOrganizationData} authorizedActions={authorizedActions} />;
      default:
        return null;
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab activeTab={activeTab} handleTabClick={handleTabClick} />
        <CustomTab icon={faUsers} tabName={"accounts"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Accounts"}/>
        <SettingsTab activeTab={activeTab} handleTabClick={handleTabClick} />
      </CustomTabContainer>
    )
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

LdapOrganizationDetailPanel.propTypes = {
  setCurrentAccount: PropTypes.func,
  currentAccount: PropTypes.object,
  organizationAccounts: PropTypes.array,
  loadData: PropTypes.func,
  ldapOrganizationData: PropTypes.object,
  setLdapOrganizationData: PropTypes.func,
  authorizedActions: PropTypes.array,
  authorizedOrganizationAccountActions: PropTypes.array
};

export default LdapOrganizationDetailPanel;


