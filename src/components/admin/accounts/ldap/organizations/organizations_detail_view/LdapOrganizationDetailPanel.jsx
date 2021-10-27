import React, {useState} from "react";
import PropTypes from "prop-types";
import {faUsers} from "@fortawesome/pro-light-svg-icons";
import LdapOrganizationSummaryPanel
  from "components/admin/accounts/ldap/organizations/organizations_detail_view/LdapOrganizationSummaryPanel";
import LdapOrganizationAccountsTable
  from "components/admin/accounts/ldap/organization_accounts/LdapOrganizationAccountsTable";
import LdapOrganizationEditorPanel
  from "components/admin/accounts/ldap/organizations/organizations_detail_view/LdapOrganizationEditorPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import CustomTab from "components/common/tabs/CustomTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";

function LdapOrganizationDetailPanel({ organizationAccounts, ldapOrganizationData, loadData}) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    if (tabSelection) {
      setActiveTab(tabSelection);
    }
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <LdapOrganizationSummaryPanel
            ldapOrganizationData={ldapOrganizationData}
            setActiveTab={setActiveTab}
          />
        );
      case "accounts":
        return (
          <LdapOrganizationAccountsTable
            className={"mt-2"}
            ldapOrganizationAccounts={organizationAccounts}
            ldapOrganizationData={ldapOrganizationData}
            loadData={loadData}
          />
        );
      case "settings":
        return (
          <LdapOrganizationEditorPanel
            handleClose={toggleSummaryPanel}
            ldapOrganizationData={ldapOrganizationData}
          />
        );
      default:
        return null;
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryToggleTab
          activeTab={activeTab}
          handleTabClick={handleTabClick}
        />
        <CustomTab
          icon={faUsers}
          tabName={"accounts"}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Accounts"}
        />
      </CustomTabContainer>
    );
  };

  return (
    <DetailTabPanelContainer
      detailView={getCurrentView()}
      tabContainer={getTabContainer()}
    />
  );
}

LdapOrganizationDetailPanel.propTypes = {
  organizationAccounts: PropTypes.array,
  loadData: PropTypes.func,
  ldapOrganizationData: PropTypes.object,
  authorizedOrganizationAccountActions: PropTypes.array
};

export default LdapOrganizationDetailPanel;


