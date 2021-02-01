import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";
import LdapOrganizationAccountEditorPanel from "./LdapOrganizationAccountEditorPanel";
import Model from "core/data_model/model";
import {faUsers, faUsersClass, faBuilding, faCubes} from "@fortawesome/pro-light-svg-icons";
import {ldapIdpAccountsMetaData} from "components/admin/accounts/ldap/idp_accounts/ldap-idp-account-metadata";
import LdapIdpAccountEditorPanel from "components/admin/accounts/ldap/idp_accounts/LdapIdpAccountEditorPanel";
import LdapIdpAccountSummaryPanel from "components/admin/accounts/ldap/idp_accounts/LdapIdpAccountSummaryPanel";
import LdapOrganizationAccountSummaryPanel
  from "components/admin/accounts/ldap/organization_accounts/organization_accounts_detail_view/LdapOrganizationAccountSummaryPanel";
import LdapUsersTable from "components/settings/ldap_users/LdapUsersTable";
import LdapGroupsTable from "components/settings/ldap_groups/LdapGroupsTable";
import LdapDepartmentsTable from "components/admin/accounts/ldap/ldap_departments/LdapDepartmentsTable";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";

function LdapOrganizationAccountDetailPanel(
  {
    ldapOrganizationAccountData,
    setLdapOrganizationAccountData,
    authorizedDepartmentActions,
    ldapDepartmentData,
    loadData,
    authorizedActions,
    authorizedIdpActions,
    organizationDomain,
  }) {
  const [showIdpEditPanel, setShowIdpEditPanel] = useState(false);
  const [ldapIdpAccountData, setLdapIdpAccountData] = useState({});
  const [activeTab, setActiveTab] = useState("summary");

  useEffect(() => {
    loadIdpAccount();
  }, []);

  const loadIdpAccount = () => {
    let idpAccounts = ldapOrganizationAccountData.getData("idpAccounts");
    if (idpAccounts != null && idpAccounts.length > 0) {
      setLdapIdpAccountData(new Model(idpAccounts[0], ldapIdpAccountsMetaData, false));
    }
    else {
      setLdapIdpAccountData(new Model({...ldapIdpAccountsMetaData.newObjectFields}, ldapIdpAccountsMetaData, true));
    }
  };

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    if (tabSelection) {
      setActiveTab(tabSelection);
    }
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
  };

  // TODO: Enable or remove
  const getIdpAccountPanel = () => {
    return <></>;

    // if (showIdpEditPanel || ldapIdpAccountData.isNew()) {
    //   return (
    //     <LdapIdpAccountEditorPanel
    //       setLdapIdpAccountData={setLdapIdpAccountData}
    //       setShowIdpEditPanel={setShowIdpEditPanel}
    //       ldapOrganizationAccountData={ldapOrganizationAccountData}
    //       ldapIdpAccountData={ldapIdpAccountData}
    //       authorizedActions={authorizedIdpActions}
    //     />
    //   );
    // }
    //
    // return (
    //   <LdapIdpAccountSummaryPanel
    //     ldapIdpAccountData={ldapIdpAccountData}
    //     setShowIdpEditPanel={setShowIdpEditPanel}
    //     authorizedActions={authorizedIdpActions}
    //   />
    // );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <LdapOrganizationAccountSummaryPanel ldapOrganizationAccountData={ldapOrganizationAccountData} setActiveTab={setActiveTab}/>;
      case "users":
        return (
          <div className="p-3">
            <LdapUsersTable orgDomain={ldapOrganizationAccountData["orgDomain"]} userData={ldapOrganizationAccountData.getData("users")} loadData={loadData} />
          </div>
        );
      case "groups":
        return (
          <div className="p-3">
            <LdapGroupsTable orgDomain={ldapOrganizationAccountData["orgDomain"]} groupData={ldapOrganizationAccountData.getData("groups")} useMembers={true} loadData={loadData} />
          </div>
        );
      case "idpAccounts":
        return(getIdpAccountPanel());
      case "departments":
        return (
          <div className="p-3">
            <LdapDepartmentsTable
              loadData={loadData}
              departmentData={ldapDepartmentData}
              authorizedActions={authorizedDepartmentActions}
              domain={organizationDomain}
            />
          </div>
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
        <CustomTab icon={faBuilding} tabName={"departments"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Departments"}/>
        {/*<CustomTab icon={faCubes} tabName={"idpAccounts"} handleTabClick={handleTabClick} activeTab={activeTab}*/}
        {/*           tabText={"IDP Account"}/>*/}
      </CustomTabContainer>
    )
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

LdapOrganizationAccountDetailPanel.propTypes = {
  ldapOrganizationAccountData: PropTypes.object,
  setLdapOrganizationAccountData: PropTypes.func,
  ldapDepartmentData: PropTypes.array,
  organizationDomain: PropTypes.string,
  loadData: PropTypes.func,
  authorizedActions: PropTypes.array,
  authorizedIdpActions: PropTypes.array,
  authorizedDepartmentActions: PropTypes.array
};

export default LdapOrganizationAccountDetailPanel;


