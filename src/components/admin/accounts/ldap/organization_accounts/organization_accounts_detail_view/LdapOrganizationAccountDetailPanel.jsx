import React, {useState} from "react";

import PropTypes from "prop-types";
import LdapOrganizationAccountEditorPanel from "./LdapOrganizationAccountEditorPanel";
import {faUsers, faUsersClass, faBuilding, faServer} from "@fortawesome/pro-light-svg-icons";
import LdapOrganizationAccountSummaryPanel
  from "components/admin/accounts/ldap/organization_accounts/organization_accounts_detail_view/LdapOrganizationAccountSummaryPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import LdapOrganizationAccountUsersPanel
  from "components/admin/accounts/ldap/organization_accounts/organization_accounts_detail_view/LdapOrganizationAccountUsersPanel";
import LdapOrganizationAccountGroupsPanel
  from "components/admin/accounts/ldap/organization_accounts/organization_accounts_detail_view/LdapOrganizationAccountGroupsPanel";
import LdapOrganizationAccountIdpPanel
  from "components/admin/accounts/ldap/organization_accounts/organization_accounts_detail_view/LdapOrganizationAccountIdpPanel";
import LdapOrganizationAccountDepartmentsPanel
  from "components/admin/accounts/ldap/organization_accounts/organization_accounts_detail_view/LdapOrganizationAccountDepartmentsPanel";
import LdapOrganizationAccountSiteRolesPanel
  from "components/admin/accounts/ldap/organization_accounts/organization_accounts_detail_view/LdapOrganizationAccountSiteRolesPanel";

function LdapOrganizationAccountDetailPanel(
  {
    ldapOrganizationAccountData,
    setLdapOrganizationAccountData,
    cancelTokenSource,
    loadData,
    authorizedActions,
    isMounted,
    organizationDomain,
    currentUser
  }) {
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
        return <LdapOrganizationAccountSummaryPanel ldapOrganizationAccountData={ldapOrganizationAccountData} setActiveTab={setActiveTab}/>;
      case "users":
        return (
          <LdapOrganizationAccountUsersPanel
            authorizedActions={authorizedActions}
            loadData={loadData}
            ldapOrganizationAccountData={ldapOrganizationAccountData}
          />
        );
      case "groups":
        return (
          <LdapOrganizationAccountGroupsPanel
            authorizedActions={authorizedActions}
            loadData={loadData}
            ldapOrganizationAccountData={ldapOrganizationAccountData}
            currentUser={currentUser}
          />
        );
      case "site-roles":
        return (
          <LdapOrganizationAccountSiteRolesPanel
            loadData={loadData}
            ldapOrganizationAccountData={ldapOrganizationAccountData}
            currentUser={currentUser}
          />
        );
      case "idpAccounts":
        return(
          <LdapOrganizationAccountIdpPanel
            ldapOrganizationAccountData={ldapOrganizationAccountData}
            authorizedActions={authorizedActions}
            loadData={loadData}
            isMounted={isMounted}
            currentUser={currentUser}
          />
        );
      case "departments":
        return (
          <LdapOrganizationAccountDepartmentsPanel
            loadData={loadData}
            isMounted={isMounted}
            ldapOrganizationAccountData={ldapOrganizationAccountData}
            cancelTokenSource={cancelTokenSource}
            organizationDomain={organizationDomain}
          />
        );
      case "settings":
        return (
          <LdapOrganizationAccountEditorPanel
            ldapOrganizationAccountData={ldapOrganizationAccountData}
            setLdapOrganizationAccountData={setLdapOrganizationAccountData}
            loadData={loadData}
            authorizedActions={authorizedActions}
            handleClose={toggleSummaryPanel}
          />
      );
      default:
        return null;
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryToggleTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab icon={faUsers} tabName={"users"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Users"}/>
        <CustomTab icon={faUsersClass} tabName={"groups"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Groups"}/>
        <CustomTab icon={faServer} tabName={"site-roles"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Site Roles"}/>
        <CustomTab icon={faBuilding} tabName={"departments"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Departments"}/>
        {/*<CustomTab icon={faCubes} tabName={"idpAccounts"} handleTabClick={handleTabClick} activeTab={activeTab}*/}
        {/*           tabText={"IDP Account"}/>*/}
      </CustomTabContainer>
    );
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

LdapOrganizationAccountDetailPanel.propTypes = {
  ldapOrganizationAccountData: PropTypes.object,
  setLdapOrganizationAccountData: PropTypes.func,
  organizationDomain: PropTypes.string,
  loadData: PropTypes.func,
  authorizedActions: PropTypes.array,
  isMounted: PropTypes.object,
  cancelTokenSource: PropTypes.object,
  currentUser: PropTypes.object
};

export default LdapOrganizationAccountDetailPanel;


