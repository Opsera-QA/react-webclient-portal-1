import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";
import LdapOrganizationAccountEditorPanel from "./LdapOrganizationAccountEditorPanel";
import Model from "../../../../../../core/data_model/model";
import {ldapIdpAccountsMetaData} from "../../idp_accounts/ldap-idp-account-metadata";
import LdapUsersTable from "../../../../../settings/ldap_users/LdapUsersTable";
import LdapGroupsTable from "../../../../../settings/ldap_groups/LdapGroupsTable";
import LdapIdpAccountEditorPanel from "../../idp_accounts/LdapIdpAccountEditorPanel";
import LdapIdpAccountSummaryPanel from "../../idp_accounts/LdapIdpAccountSummaryPanel";
import CustomTabContainer from "../../../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../../../common/tabs/CustomTab";
import {faUsers, faUsersClass, faBuilding, faCubes} from "@fortawesome/pro-light-svg-icons";
import LdapDepartmentsTable from "../../ldap_departments/LdapDepartmentsTable";
import LdapOrganizationAccountSummaryPanel from "./LdapOrganizationAccountSummaryPanel";
import DetailTabPanelContainer from "../../../../../common/panels/detail_view/DetailTabPanelContainer";
import SettingsTab from "../../../../../common/tabs/detail_view/SettingsTab";
import SummaryTab from "../../../../../common/tabs/detail_view/SummaryTab";

const INITIAL_IDP_ACCOUNT_DATA = {
  name: "",
  domain: "",
  idpRedirectURI: "https://portal.opsera.io/implicit/callback",
  clientID: "0oaou6bztkPJFnxaL0h7",
  issuer: "https://dev-842100.oktapreview.com/oauth2/default",
  baseUrl: "https://dev-842100.oktapreview.com",
  idpVendor: "OKTA",
  configEntryType: "IDP",
  idpNameIDMapping: "idmap"
};

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
      setLdapIdpAccountData(new Model(INITIAL_IDP_ACCOUNT_DATA, ldapIdpAccountsMetaData, true));
    }
  };

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    if (tabSelection) {
      setActiveTab(tabSelection);
    }
  };

  const getIdpAccountPanel = () => {
    if (showIdpEditPanel || ldapIdpAccountData.isNew()) {
      return (
        <LdapIdpAccountEditorPanel
          setLdapIdpAccountData={setLdapIdpAccountData}
          setShowIdpEditPanel={setShowIdpEditPanel}
          ldapOrganizationAccountData={ldapOrganizationAccountData}
          ldapIdpAccountData={ldapIdpAccountData}
          authorizedActions={authorizedIdpActions}
        />
      );
    }

    return (
      <LdapIdpAccountSummaryPanel
        ldapIdpAccountData={ldapIdpAccountData}
        setShowIdpEditPanel={setShowIdpEditPanel}
        authorizedActions={authorizedIdpActions}
      />
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <LdapOrganizationAccountSummaryPanel ldapOrganizationAccountData={ldapOrganizationAccountData} setActiveTab={setActiveTab}/>;
      case "users":
        return <div className="p-3"><LdapUsersTable orgDomain={ldapOrganizationAccountData["orgDomain"]} userData={ldapOrganizationAccountData.getData("users")} /></div>
      case "groups":
        return <div className="p-3"><LdapGroupsTable orgDomain={ldapOrganizationAccountData["orgDomain"]} groupData={ldapOrganizationAccountData.getData("groups")} /></div>
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
        return <LdapOrganizationAccountEditorPanel
          ldapOrganizationAccountData={ldapOrganizationAccountData}
          setLdapOrganizationAccountData={setLdapOrganizationAccountData}
          loadData={loadData}
          authorizedActions={authorizedActions}
        />;
      default:
        return null;
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <CustomTab icon={faUsers} tabName={"users"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Users"}/>
        <CustomTab icon={faUsersClass} tabName={"groups"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Groups"}/>
        <CustomTab icon={faBuilding} tabName={"departments"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"Departments"}/>
        <CustomTab icon={faCubes} tabName={"idpAccounts"} handleTabClick={handleTabClick} activeTab={activeTab}
                   tabText={"IDP Account"}/>
        <SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} />
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


